# Lila Nantara

Portfolio photo minimaliste construit avec Jekyll.

## À propos

Ce site présente une sélection d'images orientées lumière, mer, ville et instants calmes. Le design reste sobre pour laisser les photos prendre toute la place.

## Organisation des images

- Les originaux à redimensionner vont dans `images/` à la racine du projet.
- `gulp resize` génère automatiquement les versions finales dans `images/fulls` et les miniatures dans `images/thumbs`.
- Les fichiers doivent garder le même nom dans les deux dossiers.
- Les noms sont en format triable: `01`, `02`, `03`, etc.

## Lancer le site en local

1. Installe les dépendances Ruby avec `bundle install`.
2. Mets `baseurl` à une valeur vide dans [_config.yml](_config.yml) pour le test local.
3. Lance `bundle exec jekyll serve`.

## Mettre à jour les photos

1. Ajoute les nouveaux originaux dans `images/`.
2. Lance `npm install` si nécessaire, puis `gulp resize`.
3. Si tu modifies aussi le style ou le JavaScript, lance `gulp`.

## Réseaux

Le lien principal du portfolio pointe vers Instagram, défini dans [_config.yml](_config.yml).

## Crédit

Base issue du template Jekyll Photography, adaptée pour mon portfolio personnel.
