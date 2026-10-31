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

Les conteneurs `ad-slot` identifiés par `id` et `data-ad-placement` sont prévus sur la liste du blog et à deux endroits de l’article. Vides, ils sont masqués et n’ajoutent aucun espace à la page. Aucun script AdSense ni identifiant publicitaire n’est présent. Les identifiants de placement servent uniquement à repérer les emplacements dans le HTML ; ils ne sont pas des `data-ad-slot` Google.

Avant toute activation :

1. Obtenez l’approbation du site et les vrais identifiants éditeur (`ca-pub-…`) et de chaque bloc AdSense. Ne mettez aucune valeur fictive dans le dépôt.
2. Choisissez et configurez une CMP conforme aux exigences applicables, notamment la prise en charge du consentement requis pour les visiteurs concernés. Publiez les informations de confidentialité et les choix de consentement nécessaires.
3. Ajoutez le script AdSense et le balisage officiel des blocs uniquement après avoir les identifiants réels. Chargez et initialisez les annonces seulement après le signal de consentement approprié de la CMP ; respectez aussi le retrait du consentement et les règles de Google. La CMP doit gérer le consentement, pas une bannière maison.
4. Vérifiez que chaque bloc est associé au bon emplacement (`blog-after-intro`, `article-after-intro`, `article-mid-content`), qu’il reste fluide sur mobile et qu’aucun espace vide ne subsiste si aucune annonce n’est servie. N’initialisez pas un bloc avant consentement.
5. Contrôlez en production le chargement réseau, l’affichage mobile et ordinateur, ainsi que les parcours d’accord et de refus/retrait avant d’activer les annonces pour les visiteurs.

## Vérifier avant publication

Vérifiez les URL et ancres de navigation, les chemins et textes alternatifs des images, les canonical/metadata/JSON-LD, puis validez le XML de `sitemap.xml`. Consultez la page sur mobile et ordinateur. Une fois les changements poussés sur `main`, vérifiez les pages sur `https://72heures.eu/`.
