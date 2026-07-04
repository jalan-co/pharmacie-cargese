# Pharmacie de Cargèse — site vitrine

Site vitrine statique de la **Pharmacie de Cargèse**, construit avec [Astro](https://astro.build).
Bleu/blanc épuré, responsive, accessible, zéro JavaScript superflu — avec un
**back-office** pour que la pharmacie modifie elle-même son contenu.

## Stack

- **Astro** (site 100 % statique, déployable sur Vercel sans configuration)
- **CSS moderne** avec design tokens (variables) — aucune couleur codée en dur
- **Inter** auto-hébergée via `@fontsource-variable/inter`
- **@astrojs/sitemap** pour le `sitemap.xml`
- **Sveltia CMS** (back-office `/admin`) + 2 fonctions serverless pour l'auth GitHub

## Structure

```
src/
  layouts/BaseLayout.astro     # <head>, SEO, Open Graph, header, footer
  components/                  # un fichier par composant (Header, Hero, BlocStats,
                               #   CarteService, PourquoiNous, RubanMarques,
                               #   HorairesAcces, Footer, BoutonAppeler, Icone…)
  pages/index.astro            # page unique (toutes les sections)
  styles/                      # tokens.css (variables), global.css
  data/
    content.json               # CONTENU ÉDITABLE (modifié par le back-office)
    site.ts                    # lit content.json, le type et en dérive les valeurs
public/
  admin/                       # back-office Sveltia CMS (index.html + config.yml)
  logo-pharmacie-cargese.webp, favicon.svg, og-image.svg, robots.txt
api/                           # fonctions serverless d'authentification GitHub
  auth.js, callback.js
```

> **Tout le contenu éditorial vit dans `src/data/content.json`.** C'est ce fichier
> que le back-office modifie. Un développeur peut aussi l'éditer à la main ; les
> composants n'importent jamais le JSON directement, ils passent par `site.ts`.

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

1. Sur [vercel.com](https://vercel.com) → **Add New… › Project**, importer le dépôt GitHub.
   Vercel détecte Astro automatiquement (build `astro build`, sortie `dist/`).
2. Cliquer **Deploy**. Le dossier `api/` est déployé en fonctions serverless
   automatiquement (nécessaire au back-office).
3. Une fois l'URL de production connue, mettre à jour `SITE_URL` dans
   `astro.config.mjs`, l'URL du `Sitemap` dans `public/robots.txt`, et `base_url`
   dans `public/admin/config.yml`, puis recommiter.

## Back-office — modifier le contenu (pour la pharmacie)

La pharmacie modifie le contenu depuis **`https://<votre-site>/admin`**, sans code.
Chaque enregistrement écrit dans `content.json` sur GitHub et **redéploie le site
automatiquement** (~1 min). Pas de base de données, pas de service payant : le
contenu vit dans le dépôt Git.

### Mise en place (une seule fois, par le développeur)

1. **Créer une app OAuth GitHub** — [github.com/settings/developers](https://github.com/settings/developers)
   → *New OAuth App* :
   - *Homepage URL* : `https://<votre-site>`
   - *Authorization callback URL* : `https://<votre-site>/api/callback`
   - Générer un *Client secret*, puis noter le **Client ID** et le **Client secret**.
2. **Renseigner les variables d'environnement sur Vercel** (*Settings › Environment
   Variables*) :
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   Puis redéployer.
3. **Vérifier `base_url`** dans `public/admin/config.yml` : il doit correspondre à
   l'URL de production réelle du site.
4. **Donner accès à la pharmacie** : créer (ou utiliser) un compte GitHub pour la
   pharmacie et l'ajouter comme *collaborateur* du dépôt avec le droit **Write**
   (*Settings › Collaborators*).

### Utilisation (par la pharmacie)

1. Aller sur `https://<votre-site>/admin`.
2. Cliquer **Se connecter avec GitHub** (une fois autorisé, plus rien à refaire).
3. Modifier les champs (téléphone, horaires, services, marques, chiffres, textes…),
   puis **Enregistrer**. Le site se met à jour tout seul en une minute environ.

## Accessibilité & SEO

- HTML sémantique, hiérarchie de titres correcte, `lang="fr"`.
- Focus visible au clavier, lien d'évitement, `prefers-reduced-motion` respecté
  (ruban de marques mis en pause).
- `<title>` + meta description, Open Graph, données structurées Schema.org
  `Pharmacy`, `sitemap.xml`, `robots.txt` (avec `/admin` en `noindex`), favicon.
