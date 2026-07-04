# Pharmacie de Cargèse — site vitrine

Site vitrine statique de la **Pharmacie de Cargèse**, construit avec [Astro](https://astro.build).
Bleu/blanc épuré, responsive, accessible, zéro JavaScript superflu.

## Stack

- **Astro** (site 100 % statique, déployable sur Vercel sans configuration)
- **CSS moderne** avec design tokens (variables) — aucune couleur codée en dur
- **Inter** auto-hébergée via `@fontsource-variable/inter`
- **@astrojs/sitemap** pour le `sitemap.xml`

## Structure

```
src/
  layouts/BaseLayout.astro     # <head>, SEO, Open Graph, header, footer
  components/                  # un fichier par composant réutilisable
    Header, BoutonAppeler, Hero, BlocStats, CarteService,
    RubanMarques, HorairesAcces, Footer, Logo, Icone, ...
  pages/                       # index.astro, services.astro, horaires.astro
  styles/                      # tokens.css (variables), global.css
  data/site.ts                 # SOURCE UNIQUE : coordonnées, services, marques, horaires, SEO
public/                        # favicon.svg, og-image.svg, robots.txt
```

> Tout le contenu (textes, coordonnées, listes) vient de `src/data/site.ts`.
> Pour modifier une info (téléphone, horaires, service…), on édite **ce seul fichier**.

## Lancer en local

```bash
npm install      # installe les dépendances
npm run dev      # serveur de dev sur http://localhost:4321
```

Autres commandes :

```bash
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise le build de production en local
```

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub (déjà fait).
2. Sur [vercel.com](https://vercel.com) → **Add New… › Project**, importer ce dépôt GitHub.
   Vercel détecte Astro automatiquement (build `astro build`, sortie `dist/`) — **aucune config**.
3. Cliquer **Deploy**. Une fois l'URL de production connue, mettre à jour
   `SITE_URL` dans `astro.config.mjs` et l'URL du `Sitemap` dans `public/robots.txt`,
   puis recommiter pour des URLs canoniques / OG / sitemap exactes.

## Accessibilité & SEO

- HTML sémantique, hiérarchie de titres correcte, `lang="fr"`.
- Focus visible au clavier, lien d'évitement, `prefers-reduced-motion` respecté
  (ruban de marques mis en pause).
- `<title>` + meta description par page, Open Graph, données structurées
  Schema.org `Pharmacy`, `sitemap.xml`, `robots.txt`, favicon.
