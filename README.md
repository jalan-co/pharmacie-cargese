# Pharmacie de Cargèse — site vitrine

Site vitrine statique de la **Pharmacie de Cargèse**, construit avec [Astro](https://astro.build).
Bleu/blanc épuré, responsive, accessible, zéro JavaScript superflu — avec un
**back-office** pour que la pharmacie modifie elle-même son contenu.

## Stack

- **Astro** (site 100 % statique, déployable sur Vercel sans configuration)
- **CSS moderne** avec design tokens (variables) — aucune couleur codée en dur
- **Inter** auto-hébergée via `@fontsource-variable/inter`
- **@astrojs/sitemap** pour le `sitemap.xml`
- **Decap CMS** (back-office `/admin`) + **DecapBridge** pour l'authentification par email

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
  admin/                       # back-office Decap CMS (index.html + config.yml)
  logo-pharmacie-cargese.webp, favicon.svg, og-image.svg, robots.txt
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
2. Cliquer **Deploy**. Une fois l'URL de production connue, mettre à jour
   `SITE_URL` dans `astro.config.mjs` et l'URL du `Sitemap` dans
   `public/robots.txt`, puis recommiter.

## Back-office — modifier le contenu (pour la pharmacie)

La pharmacie modifie le contenu depuis **`https://<votre-site>/admin`**, sans code
et **sans compte GitHub**. L'authentification est gérée par
[DecapBridge](https://decapbridge.com) (connexion par email / Google / Microsoft).
Chaque enregistrement écrit dans `content.json` sur GitHub et **redéploie le site
automatiquement** (~1 min). Pas de base de données : le contenu vit dans le dépôt Git.

### Mise en place (une seule fois, par le développeur)

1. Créer un compte sur **[decapbridge.com](https://decapbridge.com)**, puis
   **créer un « Site »** et le relier au dépôt GitHub `jalan-co/pharmacie-cargese`
   (DecapBridge demande un jeton d'accès GitHub).
2. DecapBridge génère alors les valeurs **`identity_url`** (avec l'identifiant du
   site) et **`gateway_url`**. Les recopier dans `public/admin/config.yml` (bloc
   `backend`), à la place de `<votre-site-id>`, puis recommiter.
3. **Inviter la pharmacie** : dans l'onglet *Collaborators* de DecapBridge, saisir
   son adresse email. Elle reçoit un lien d'invitation.

### Utilisation (par la pharmacie)

1. Ouvrir l'email d'invitation, définir un mot de passe (ou choisir *Se connecter
   avec Google / Microsoft*). À faire une seule fois.
2. Aller sur `https://<votre-site>/admin`, se connecter.
3. Modifier les champs (téléphone, horaires, services, marques, chiffres, textes…),
   puis **Enregistrer**. Le site se met à jour tout seul en une minute environ.

## Accessibilité & SEO

- HTML sémantique, hiérarchie de titres correcte, `lang="fr"`.
- Focus visible au clavier, lien d'évitement, `prefers-reduced-motion` respecté
  (ruban de marques mis en pause).
- `<title>` + meta description, Open Graph, données structurées Schema.org
  `Pharmacy`, `sitemap.xml`, `robots.txt` (avec `/admin` en `noindex`), favicon.
