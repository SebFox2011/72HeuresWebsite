(() => {
  'use strict';

  const measurementId = 'G-2GK0VWEGLK';
  const storageKey = '72heures.analyticsConsent.v1';
  const disableKey = `ga-disable-${measurementId}`;
  let analyticsEnabled = false;
  let analyticsInitialized = false;

  // Fail closed until the visitor has explicitly opted in.
  window[disableKey] = true;

  const readChoice = () => {
    try {
      const choice = window.localStorage.getItem(storageKey);
      return choice === 'granted' || choice === 'denied' ? choice : null;
    } catch (_) {
      return null;
    }
  };

  const writeChoice = (choice) => {
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch (_) {
      // The choice still applies for this page view if storage is unavailable.
    }
  };

  const safePageUrl = (value) => {
    try {
      const url = new URL(value, window.location.href);
      return `${url.origin}${url.pathname}`;
    } catch (_) {
      return `${window.location.origin}${window.location.pathname}`;
    }
  };

  const getGtag = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    return window.gtag;
  };

  const track = (eventName) => {
    if (!analyticsEnabled || !analyticsInitialized) return;
    getGtag()('event', eventName, {
      page_title: document.title,
      page_location: safePageUrl(window.location.href),
      page_referrer: document.referrer ? safePageUrl(document.referrer) : ''
    });
  };

  const enableAnalytics = () => {
    if (analyticsInitialized) {
      if (analyticsEnabled) return;
      analyticsEnabled = true;
      window[disableKey] = false;
      getGtag()('consent', 'update', { analytics_storage: 'granted' });
      track('page_view');
      if (window.location.pathname.replace(/\/+$/, '') === '/calculateur-autonomie') track('calculator_view');
      return;
    }

    analyticsEnabled = true;
    window[disableKey] = false;
    const gtag = getGtag();
    gtag('js', new Date());
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.onerror = () => {
      analyticsInitialized = false;
      analyticsEnabled = false;
      window[disableKey] = true;
    };
    document.head.appendChild(script);
    analyticsInitialized = true;
    track('page_view');
    if (window.location.pathname.replace(/\/+$/, '') === '/calculateur-autonomie') track('calculator_view');
  };

  const disableAnalytics = () => {
    analyticsEnabled = false;
    window[disableKey] = true;
  };

  const mountControls = () => {
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'analytics-consent-launcher';
    launcher.textContent = 'Statistiques';
    launcher.setAttribute('aria-controls', 'analytics-consent-panel');
    launcher.setAttribute('aria-expanded', 'false');

    const panel = document.createElement('section');
    panel.id = 'analytics-consent-panel';
    panel.className = 'analytics-consent-panel';
    panel.setAttribute('aria-label', 'Choix des statistiques');
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = '<h2>Statistiques de visite</h2><p>Autorisez-vous Google Analytics à mesurer la fréquentation et l’utilisation du site ? Aucun choix n’est précoché. Votre décision est indépendante des choix publicitaires Google. <a href="/confidentialite/">En savoir plus</a></p><div class="analytics-consent-actions"><button type="button" data-analytics-choice="granted">Accepter les statistiques</button><button type="button" data-analytics-choice="denied">Refuser</button></div>';

    const setOpen = (open) => {
      panel.hidden = !open;
      launcher.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('[data-analytics-choice]')?.focus();
    };

    launcher.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('click', (event) => {
      const settingsLink = event.target.closest('[data-open-analytics-settings]');
      if (!settingsLink) return;
      event.preventDefault();
      setOpen(true);
    });
    panel.addEventListener('click', (event) => {
      const choiceButton = event.target.closest('[data-analytics-choice]');
      if (!choiceButton) return;
      const choice = choiceButton.dataset.analyticsChoice;
      writeChoice(choice);
      if (choice === 'granted') enableAnalytics();
      else disableAnalytics();
      setOpen(false);
      launcher.focus();
    });

    document.body.append(launcher, panel);
    const choice = readChoice();
    setOpen(choice === null);
    if (choice === 'granted') enableAnalytics();
    else if (choice === 'denied') disableAnalytics();
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !analyticsEnabled) return;
    let destination;
    try { destination = new URL(link.href, window.location.href); } catch (_) { return; }
    if (destination.hostname === 'apps.apple.com') track('app_store_click');
    else if (destination.hostname === 'play.google.com') track('google_play_click');
  });

  if (window.location.pathname.replace(/\/+$/, '') === '/calculateur-autonomie') {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('#calculate')) return;
      const results = document.getElementById('results');
      if (results && !results.hidden) track('calculator_calculate');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountControls, { once: true });
  else mountControls();
})();
