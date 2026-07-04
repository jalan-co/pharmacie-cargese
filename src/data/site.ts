/**
 * Source UNIQUE de vérité du site.
 * Tout le contenu éditorial (coordonnées, services, marques, horaires, SEO)
 * est défini ici et consommé par les composants — jamais codé en dur ailleurs.
 */

export interface Service {
  /** Identifiant court (slug), utile pour les ancres et les clés de liste. */
  id: string;
  titre: string;
  description: string;
  /** Nom de l'icône SVG (voir le composant Icone). */
  icone: string;
}

export interface CreneauHoraire {
  jours: string;
  heures: string;
}

export interface LienNav {
  libelle: string;
  href: string;
}

/** Coordonnées et identité de la pharmacie. */
export const pharmacie = {
  nom: 'Pharmacie de Cargèse',
  /** Le nom scindé pour le traitement typographique du logo. */
  nomLigne1: 'Pharmacie',
  nomLigne2: 'de Cargèse',
  baseline: 'Votre pharmacie de proximité au cœur de Cargèse',
  adresse: {
    rue: 'Quartier Saint-Jean, route de Piana',
    codePostal: '20130',
    ville: 'Cargèse',
    /** Adresse complète sur une ligne, pour les liens et le SEO. */
    complete: 'Quartier Saint-Jean, route de Piana, 20130 Cargèse',
  },
  telephone: {
    affichage: '04 95 26 40 30',
    /** Format international pour l'attribut href="tel:". */
    lien: '+33495264030',
  },
  email: 'pharmaciedecargese@gmail.com',
  /** Numéro national des pharmacies de garde. */
  garde: '3237',
} as const;

/** Logo officiel de la pharmacie (fichier dans /public). */
export const logo = {
  src: '/logo-pharmacie-cargese.webp',
  largeur: 680,
  hauteur: 453,
} as const;

/** Statistiques rassurantes affichées sur l'accueil. */
export const stats: { valeur: string; libelle: string }[] = [
  { valeur: '3237', libelle: 'Pharmacie de garde, 24h/24' },
  { valeur: '9', libelle: 'Grandes marques de soin' },
  { valeur: '6j/7', libelle: 'Ouvert du lundi au samedi' },
  { valeur: '100 %', libelle: 'Conseil pharmaceutique personnalisé' },
];

/** Les 4 services détaillés du site. */
export const services: Service[] = [
  {
    id: 'bilan-medication',
    titre: 'Bilan de médication',
    description:
      "Un entretien confidentiel avec votre pharmacien pour faire le point sur l'ensemble de vos traitements, vérifier leur bonne association et sécuriser votre prise au quotidien.",
    icone: 'clipboard',
  },
  {
    id: 'tests-depistage',
    titre: 'Tests de dépistage',
    description:
      'Tests rapides et fiables réalisés à l’officine pour l’angine, la grippe et la Covid-19, avec un résultat en quelques minutes et une orientation adaptée.',
    icone: 'test',
  },
  {
    id: 'micronutrition',
    titre: 'Conseil en micronutrition',
    description:
      'Un accompagnement personnalisé pour équilibrer vos apports en vitamines, minéraux et oligo-éléments, au service de votre énergie et de votre bien-être durable.',
    icone: 'leaf',
  },
  {
    id: 'phytotherapie',
    titre: 'Phytothérapie',
    description:
      'Des solutions naturelles à base de plantes, sélectionnées et conseillées par nos pharmaciens pour accompagner en douceur les petits maux du quotidien.',
    icone: 'plant',
  },
];

/** Marques présentées dans le ruban défilant (texte uniquement). */
export const marques: string[] = [
  'Avène',
  'La Rosée',
  'Nuxe',
  'Caudalie',
  'Klorane',
  'CeraVe',
  'Respire',
  'Rogé Cavaillès',
  'Isdin',
];

/** Horaires d'ouverture. */
export const horaires: CreneauHoraire[] = [
  { jours: 'Lundi – Vendredi', heures: '9h00 – 12h30 · 14h30 – 19h30' },
  { jours: 'Samedi', heures: '9h00 – 12h30 · 15h00 – 19h00' },
  { jours: 'Dimanche', heures: 'Fermé — voir pharmacie de garde' },
];

/** Navigation principale (réutilisée dans le header et le footer). */
export const navigation: LienNav[] = [
  { libelle: 'Accueil', href: '/' },
  { libelle: 'Nos services', href: '/services' },
  { libelle: 'Horaires & accès', href: '/horaires' },
];

/**
 * Métadonnées SEO par page.
 * La clé correspond au chemin de la page.
 */
export const seo: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Pharmacie de Cargèse — Votre pharmacie de proximité',
    description:
      'Pharmacie de Cargèse : conseil pharmaceutique, bilan de médication, tests de dépistage, micronutrition et phytothérapie. Quartier Saint-Jean, route de Piana, 20130 Cargèse.',
  },
  '/services': {
    title: 'Nos services — Pharmacie de Cargèse',
    description:
      'Découvrez les services de la Pharmacie de Cargèse : bilan de médication, tests de dépistage (angine, grippe, Covid), conseil en micronutrition et phytothérapie.',
  },
  '/horaires': {
    title: 'Horaires & accès — Pharmacie de Cargèse',
    description:
      'Horaires d’ouverture, adresse et accès à la Pharmacie de Cargèse, Quartier Saint-Jean, route de Piana, 20130 Cargèse. Pharmacie de garde : 3237.',
  },
};

/** Lien Google Maps (itinéraire) construit à partir de l'adresse. */
export const lienItineraire = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}`;

/** URL de l'iframe Google Maps centrée sur l'adresse (mode embed sans clé API). */
export const lienCarteEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}&z=14&output=embed`;
