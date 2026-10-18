import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import vm from "node:vm"

const html = await readFile(new URL("../reset-password/index.html", import.meta.url), "utf8")
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1]
assert.ok(inlineScript, "reset page must have its early inline token handler")

const makePage = (hash, fetch = async () => new Response(null, { status: 204 })) => {
  const listeners = {}
  const elements = Object.fromEntries(["reset-form", "password-fields", "message", "submit", "password", "confirmation"].map(id => [id, {
    id, hidden: false, disabled: false, textContent: "", value: "", className: "", handlers: {},
    addEventListener(type, handler) { this.handlers[type] = handler },
    focus() { this.focused = true }
  }]))
  const replacements = []
  const requests = []
  const window = {
    location: { hash, pathname: "/reset-password/", search: "" },
    history: { replaceState(...args) { replacements.push(args) } },
    addEventListener(type, handler) { listeners[type] = handler }
  }
  const context = {
    window,
    document: { getElementById: id => elements[id] },
    URLSearchParams,
    fetch: async (...args) => { requests.push(args); return fetch(...args) }
  }
  vm.runInNewContext(inlineScript, context)
  return { elements, listeners, replacements, requests }
}

const submit = async (page) => page.elements["reset-form"].handlers.submit({ preventDefault() {} })
const goodToken = "a".repeat(64)
const goodPassword = "correct horse battery"

test("removes token from URL synchronously and waits for explicit submission", async () => {
  const page = makePage(`#token=${goodToken}`)
  assert.deepEqual(page.replacements, [[null, "", "/reset-password/"]])
  assert.equal(page.requests.length, 0)
  page.listeners.DOMContentLoaded()
  assert.equal(page.elements["password-fields"].hidden, false)
  assert.equal(page.requests.length, 0)
})

test("missing or malformed token disables the form without a request", () => {
  for (const hash of ["", "#token=bad", "#other=value"]) {
    const page = makePage(hash)
    page.listeners.DOMContentLoaded()
    assert.equal(page.elements["password-fields"].hidden, true)
    assert.equal(page.elements.message.hidden, false)
    assert.equal(page.requests.length, 0)
  }
})

test("posts credentials only on submit, and displays success", async () => {
  const page = makePage(`#token=${goodToken}`, async () => new Response(JSON.stringify({ status: "password_reset" }), { status: 200 }))
  page.listeners.DOMContentLoaded()
  page.elements.password.value = goodPassword
  page.elements.confirmation.value = goodPassword
  assert.equal(page.requests.length, 0)
  await submit(page)
  assert.equal(page.requests.length, 1)
  assert.equal(page.requests[0][0], "https://seven2heuresbackend.onrender.com/auth/reset-password")
  assert.equal(page.requests[0][1].method, "POST")
  assert.deepEqual(JSON.parse(page.requests[0][1].body), {
    token: goodToken, password: goodPassword, passwordConfirmation: goodPassword
  })
  assert.equal(page.requests[0][1].credentials, "omit")
  assert.equal(page.requests[0][1].referrerPolicy, "no-referrer")
  assert.equal(page.elements["reset-form"].hidden, true)
  assert.match(page.elements.message.textContent, /réinitialisé/)
})

test("maps expired token and network failures to user-facing states", async t => {
  await t.test("expired", async () => {
    const page = makePage(`#token=${goodToken}`, async () => new Response(JSON.stringify({ code: "PASSWORD_RESET_TOKEN_INVALID" }), { status: 400 }))
    page.listeners.DOMContentLoaded()
    page.elements.password.value = goodPassword
    page.elements.confirmation.value = goodPassword
    await submit(page)
    assert.match(page.elements.message.textContent, /expiré/)
  })
  await t.test("network", async () => {
    const page = makePage(`#token=${goodToken}`, async () => { throw new TypeError("network failure") })
    page.listeners.DOMContentLoaded()
    page.elements.password.value = goodPassword
    page.elements.confirmation.value = goodPassword
    await submit(page)
    assert.match(page.elements.message.textContent, /Impossible de joindre/)
  })
})

test("enforces the backend password length and confirmation rules before sending", async () => {
  const page = makePage(`#token=${goodToken}`)
  page.listeners.DOMContentLoaded()
  page.elements.password.value = "too short"
  page.elements.confirmation.value = "too short"
  await submit(page)
  assert.equal(page.requests.length, 0)
  assert.match(page.elements.message.textContent, /15 et 128/)

  page.elements.password.value = goodPassword
  page.elements.confirmation.value = `${goodPassword}!`
  await submit(page)
  assert.equal(page.requests.length, 0)
  assert.match(page.elements.message.textContent, /ne correspondent pas/)
})

test("static output has no third-party resources and exposes the HTTPS route", () => {
  assert.match(html, /https:\/\/72heures\.eu\/reset-password\//)
  assert.doesNotMatch(html, /fonts\.googleapis|googletagmanager|google-analytics|<\/?iframe/i)
})
