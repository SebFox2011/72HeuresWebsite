# Publier un article sur le blog 72 Heures

Le site est statique : aucun build, Jekyll, Ruby ou dépendance n’est nécessaire. Pour publier, ajoutez vos fichiers HTML et poussez-les dans la branche `main`, à la racine du dépôt. GitHub Pages publie les changements selon la configuration actuelle du dépôt.

## Ajouter un article

1. Créez le dossier `blog/mon-slug/` et copiez-y `blog/preparer-kit-urgence-familial/index.html` comme modèle.
2. Changez le `<title>`, la meta description, la canonical, les propriétés Open Graph et Twitter, puis les champs du JSON-LD `BlogPosting` : titre, description, image, dates, auteur et URL canonique.
3. Remplacez le contenu. Gardez un seul `<h1>`, puis organisez les sections avec des `<h2>` et `<h3>`. Pour un article long, ajoutez un sommaire dont les liens correspondent aux `id` des sections.
4. Vérifiez les informations factuelles et liez les sources fiables. Ajoutez un lien contextuel vers l’application et des liens vers les autres articles pertinents disponibles.
5. Ajoutez les images dans `assets/blog/`. Préférez des images optimisées, avec dimensions connues, attributs `alt` descriptifs et URL absolue correcte dans Open Graph et JSON-LD.
6. Ajoutez une carte dans `blog/index.html` avec le titre, le résumé, la catégorie, la date et l’image.
7. Ajoutez l’URL canonique de l’article dans `sitemap.xml`.

## Publicité et consentement

Les conteneurs `ad-slot` sont des emplacements vides identifiés dans le HTML. Aucun script publicitaire n’est chargé. N’ajoutez AdSense qu’après validation du compte et branchez son chargement à un mécanisme de consentement conforme aux règles applicables. Ne chargez aucun traceur avant le consentement requis.

## Vérifier avant publication

Vérifiez les URL et ancres de navigation, les chemins et textes alternatifs des images, les canonical/metadata/JSON-LD, puis validez le XML de `sitemap.xml`. Consultez la page sur mobile et ordinateur. Une fois les changements poussés sur `main`, vérifiez les pages sur `https://72heures.eu/`.
