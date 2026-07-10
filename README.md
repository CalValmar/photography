# Lila Nantara

Portfolio photo minimaliste construit avec Jekyll.

## À propos

J'expose ici une sélection de photos orientées lumière, mer, ville et instants calmes. Le site reste volontairement sobre pour laisser les images prendre toute la place.

## Organisation

- Les originaux à redimensionner vont dans `images/` à la racine du projet.
- `gulp resize` génère automatiquement les versions finales dans `images/fulls` et les miniatures dans `images/thumbs`.
- Les images affichées dans la galerie doivent garder le même nom dans les deux dossiers.

## Lancer le site

1. Installe les dépendances avec `bundle install`.
2. Passe `baseurl` à une valeur vide dans [_config.yml](_config.yml) pour tester en local.
3. Lance `bundle exec jekyll serve`.

## Mettre à jour les images

1. Ajoute les nouveaux originaux dans `images/`.
2. Lance `npm install` si besoin, puis `gulp resize`.
3. Si tu modifies aussi les styles ou les scripts, lance `gulp`.

## Crédit

Base issue du template Jekyll Photography, adaptée pour mon portfolio personnel.
