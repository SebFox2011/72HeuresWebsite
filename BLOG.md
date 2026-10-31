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

Les conteneurs `ad-slot` identifiés par `id` et `data-ad-placement` sont prévus sur la liste du blog et à deux endroits de l’article. Vides, ils sont masqués et n’ajoutent aucun espace à la page. Aucune unité publicitaire (`ins.adsbygoogle`) ni aucun appel `adsbygoogle.push()` n’est présent. Les identifiants de placement servent uniquement à repérer les emplacements dans le HTML ; ils ne sont pas des `data-ad-slot` Google.

Le tag AdSense officiel du compte (`adsbygoogle.js?client=ca-pub-5025472355802912`) est chargé dans le `<head>` de l’accueil et des deux pages du blog pour déployer le message CMP Google publié. Il est absent de la politique de confidentialité, conformément aux consignes Google sur les pages de politique. Aucun bloc publicitaire ni appel `adsbygoogle.push()` n’est ajouté ; les trois conteneurs vides restent masqués. Le lien « Gérer mes choix de confidentialité » utilise `googlefc.showRevocationMessage()` via `googlefc.callbackQueue` et n’apparaît que lorsque l’API CMP est prête. La politique renvoie vers l’accueil avec l’ancre qui déclenche la réouverture lorsque l’API est disponible.

Avant toute activation :

1. Le tag CMP est déployé, mais il charge la bibliothèque AdSense avant le choix de consentement pour pouvoir afficher le message. Cette requête peut traiter des données techniques de connexion auprès de Google. Dans AdSense, vérifiez immédiatement que les annonces automatiques (y compris les formats overlay et les formats d’intention) sont désactivées ; le code seul ne peut pas désactiver un réglage Auto ads côté compte.
2. Vérifiez dans Privacy & messaging que le message réglementaire cible `72heures.eu`, que son URL de politique de confidentialité est correcte et que les partenaires/finalités correspondent aux traitements réellement utilisés.
3. Gardez les blocs `ad-slot` vides tant que l’approbation n’est pas effective et que vous n’avez pas décidé de diffuser des annonces.
4. Après approbation, si vous activez des unités, créez-les dans AdSense et renseignez leurs vrais identifiants dans les emplacements (`blog-after-intro`, `article-after-intro`, `article-mid-content`). Ne mettez aucune valeur fictive dans le dépôt.
5. Conservez le lien officiel de révocation via `googlefc.showRevocationMessage()` ; n’ajoutez pas de bannière personnalisée ni de script de test en production.
6. Tests manuels navigateur : première visite d’un visiteur concerné et affichage du message (prévisualisation Google ponctuelle avec `?fc=alwaysshow&fctype=gdpr`) ; choix « accepter » et navigation entre les trois pages ; choix « refuser » et navigation ; réouverture via « Gérer mes choix de confidentialité » puis retrait/modification du consentement ; revisite pour vérifier que le choix persiste et que le message ne réapparaît pas à chaque page ; contrôle réseau et vérification qu’aucune annonce ne s’affiche tant que Auto ads et les unités restent désactivés/vides ; affichage responsive. Retirer le paramètre de prévisualisation après le test.

## Vérifier avant publication

Vérifiez les URL et ancres de navigation, les chemins et textes alternatifs des images, les canonical/metadata/JSON-LD, puis validez le XML de `sitemap.xml`. Consultez la page sur mobile et ordinateur. Une fois les changements poussés sur `main`, vérifiez les pages sur `https://72heures.eu/`.
