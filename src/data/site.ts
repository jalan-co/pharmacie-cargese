/**
 * Source UNIQUE de vérité du site.
 * Tout le contenu éditorial (coordonnées, services, marques, horaires, SEO)
 * est défini ici et consommé par les composants — jamais codé en dur ailleurs.
 *
 * Les textes reprennent la maquette validée. Les chiffres marketing
 * (« 45 ans », « 8 000+ patients », « 40+ marques ») sont à confirmer par la
 * pharmacie : ils se modifient uniquement ici.
 */

export interface Service {
  id: string;
  titre: string;
  description: string;
  /** Nom de l'icône SVG (voir le composant Icone). */
  icone: string;
}

export interface Atout {
  titre: string;
  description: string;
  icone: string;
}

export interface CreneauHoraire {
  jour: string;
  heures: string;
  /** Vrai si la pharmacie est fermée ce jour (mise en forme atténuée). */
  ferme?: boolean;
}

export interface LienNav {
  libelle: string;
  href: string;
}

/** Coordonnées et identité de la pharmacie. */
export const pharmacie = {
  nom: 'Pharmacie de Cargèse',
  baseline: 'Votre santé, accompagnée avec soin',
  adresse: {
    rue: 'Quartier Saint-Jean',
    complementRue: 'Route de Piana',
    codePostal: '20130',
    ville: 'Cargèse',
    complete: 'Quartier Saint-Jean, Route de Piana, 20130 Cargèse',
  },
  telephone: {
    affichage: '04 95 26 40 30',
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

/** Contenu du hero (accueil). */
export const hero = {
  badge: 'Pharmacie de proximité à Cargèse',
  titre: 'Votre santé, accompagnée avec soin',
  texte:
    "Conseil, prévention et suivi personnalisé au cœur du village. Une équipe de pharmaciens à votre écoute, six jours sur sept, à deux pas du port.",
  ouverture: "Ouvert aujourd'hui · ferme à 19h00",
  /** Légende de l'emplacement photo (façade / conseil). */
  photoLegende:
    "Façade de l'officine ou pharmacien en conseil — image libre de droit",
  /** Carte flottante « conseil ». */
  carteFlottante: {
    titre: 'Conseil personnalisé',
    texte: '6 jours sur 7, sans rendez-vous',
  },
  /** Badge flottant « ancienneté ». */
  badgeFlottant: {
    valeur: '45',
    unite: 'ans',
    texte: 'au service du village',
  },
} as const;

/** Statistiques rassurantes (bandeau bleu). */
export const stats: { valeur: string; libelle: string }[] = [
  { valeur: '45+', libelle: 'Années au service du village' },
  { valeur: '8 000+', libelle: 'Patients accompagnés chaque année' },
  { valeur: '40+', libelle: 'Marques sélectionnées' },
  { valeur: '6j/7', libelle: 'Ouvert et à votre écoute' },
];

/** Les 4 services détaillés. */
export const services: Service[] = [
  {
    id: 'bilan-medication',
    titre: 'Bilan de médication',
    description:
      'Un entretien dédié pour revoir vos traitements, éviter les interactions et sécuriser votre suivi.',
    icone: 'clipboard',
  },
  {
    id: 'tests-depistage',
    titre: 'Tests de dépistage',
    description:
      'Angine, grippe et Covid : résultat rapide en officine pour une prise en charge sans attendre.',
    icone: 'test',
  },
  {
    id: 'micronutrition',
    titre: 'Conseil en micronutrition',
    description:
      'Fatigue, sommeil, immunité : des recommandations adaptées à votre terrain et à vos besoins.',
    icone: 'leaf',
  },
  {
    id: 'phytotherapie',
    titre: 'Phytothérapie',
    description:
      'Le bienfait des plantes, conseillé par des pharmaciens formés, en complément de votre parcours de soin.',
    icone: 'plant',
  },
];

/** Section « Pourquoi nous » : atouts de la pharmacie. */
export const pourquoiNous = {
  surtitre: 'Pourquoi nous',
  titre: 'Une pharmacie humaine, au plus près des habitants',
  photoLegende:
    "Équipe de la pharmacie ou intérieur de l'officine — image libre de droit",
  atouts: [
    {
      titre: 'Un suivi qui vous connaît',
      description:
        'Vos traitements, vos habitudes, votre historique : un conseil qui tient compte de qui vous êtes.',
      icone: 'heart',
    },
    {
      titre: 'Disponible 6 jours sur 7',
      description:
        'Sans rendez-vous, du lundi au samedi, avec une pharmacie de garde joignable au 3237.',
      icone: 'clock',
    },
    {
      titre: 'Des marques de confiance',
      description:
        'Une sélection dermo-cosmétique et de santé naturelle rigoureuse, testée et recommandée.',
      icone: 'shield',
    },
  ] as Atout[],
};

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

/** Horaires d'ouverture, jour par jour. */
export const horaires: CreneauHoraire[] = [
  { jour: 'Lundi', heures: '08:30 – 19:30' },
  { jour: 'Mardi', heures: '08:30 – 19:30' },
  { jour: 'Mercredi', heures: '08:30 – 19:30' },
  { jour: 'Jeudi', heures: '08:30 – 19:30' },
  { jour: 'Vendredi', heures: '08:30 – 19:30' },
  { jour: 'Samedi', heures: '09:00 – 19:00' },
  { jour: 'Dimanche', heures: 'Fermé', ferme: true },
];

/** Note complémentaire sous les horaires. */
export const horairesNote = 'Fermé les jours fériés';

/** Navigation principale : ancres vers les sections de la page unique. */
export const navigation: LienNav[] = [
  { libelle: 'Accueil', href: '#accueil' },
  { libelle: 'Nos services', href: '#services' },
  { libelle: 'Horaires & accès', href: '#horaires' },
];

/** Métadonnées SEO de la page d'accueil. */
export const seo = {
  title: 'Pharmacie de Cargèse — Votre santé, accompagnée avec soin',
  description:
    'Pharmacie de Cargèse : conseil, prévention et suivi personnalisé. Bilan de médication, tests de dépistage, micronutrition, phytothérapie. Quartier Saint-Jean, Route de Piana, 20130 Cargèse.',
};

/** Lien Google Maps (itinéraire) construit à partir de l'adresse. */
export const lienItineraire = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}`;

/** URL de l'iframe Google Maps centrée sur l'adresse (embed sans clé API). */
export const lienCarteEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}&z=14&output=embed`;
