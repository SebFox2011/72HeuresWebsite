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

Les conteneurs `ad-slot` identifiés par `id` et `data-ad-placement` sont prévus sur la liste du blog et à deux endroits de l’article. Vides, ils sont masqués et n’ajoutent aucun espace à la page. Aucun script AdSense ni unité publicitaire n’est présent. Les identifiants de placement servent uniquement à repérer les emplacements dans le HTML ; ils ne sont pas des `data-ad-slot` Google.

Le message CMP Google est publié dans AdSense, mais il ne s’affichera pas sur le site tant que le tag officiel AdSense/Privacy & messaging ne sera pas intégré. Le lien « Gérer mes choix de confidentialité » est raccordé à l’API documentée `googlefc.showRevocationMessage()` via `googlefc.callbackQueue` sur l’accueil et les pages du blog ; il reste masqué tant que l’API CMP n’est pas disponible. La politique de confidentialité ne charge aucun tag CMP ni publicitaire et son lien redirige vers l’accueil, qui rouvrira le message si l’API est chargée.

Avant toute activation :

1. Attendez l’approbation du site AdSense. Dans AdSense, vérifiez que les annonces automatiques sont désactivées tant que vous ne souhaitez pas diffuser d’annonces.
2. Vérifiez dans Privacy & messaging que le message réglementaire cible `72heures.eu`, que son URL de politique de confidentialité est correcte et que les partenaires/finalités correspondent aux traitements réellement utilisés.
3. Après approbation seulement, ajoutez le code AdSense officiel fourni pour le compte réel (`ca-pub-5025472355802912`) dans le `<head>` des pages où la CMP doit apparaître. Ce tag permet le déploiement du message ; ne créez ni ne remplissez de bloc publicitaire avant d’avoir décidé d’activer les annonces.
4. Quand les annonces sont autorisées, créez les blocs dans AdSense et renseignez leurs vrais identifiants dans des unités adaptées aux emplacements (`blog-after-intro`, `article-after-intro`, `article-mid-content`). Ne mettez aucune valeur fictive dans le dépôt.
5. Chargez les annonces seulement lorsque l’approbation est effective et que les règles/choix CMP applicables sont respectés. Conservez le lien officiel de révocation via `googlefc.showRevocationMessage()` ; n’ajoutez pas de bannière personnalisée ni de script de test en production.
6. Testez dans un navigateur le message CMP (y compris avec les paramètres de prévisualisation officiels), son lien de réouverture, les choix et leur retrait, le réseau, les refus, l’absence d’annonce sans unité activée, et l’affichage responsive avant toute mise en service.

## Vérifier avant publication

Vérifiez les URL et ancres de navigation, les chemins et textes alternatifs des images, les canonical/metadata/JSON-LD, puis validez le XML de `sitemap.xml`. Consultez la page sur mobile et ordinateur. Une fois les changements poussés sur `main`, vérifiez les pages sur `https://72heures.eu/`.
