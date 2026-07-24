/**
 * Point d'accès unique au contenu du site.
 *
 * Le contenu ÉDITABLE (coordonnées, textes, services, horaires…) vit dans
 * `content.json` — c'est ce fichier que le back-office (Sveltia CMS, page
 * /admin) modifie. Ici, on se contente de le typer, d'en dériver quelques
 * valeurs techniques (lien tel:, adresse complète, cartes Google Maps) et de
 * le ré-exporter pour les composants. Les composants n'importent que d'ici.
 */
import content from './content.json';

export interface Service {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

export interface CreneauHoraire {
  jour: string;
  heures: string;
  ferme?: boolean;
}

export interface LienNav {
  libelle: string;
  href: string;
}

/** Convertit un numéro français « 04 95 … » en lien international « +33495… ». */
function versLienTel(affichage: string): string {
  const chiffres = affichage.replace(/[^0-9]/g, '');
  return chiffres.startsWith('0') ? `+33${chiffres.slice(1)}` : `+${chiffres}`;
}

const a = content.pharmacie.adresse;

/** Coordonnées et identité de la pharmacie. */
export const pharmacie = {
  nom: content.pharmacie.nom,
  baseline: content.pharmacie.baseline,
  adresse: {
    rue: a.rue,
    complementRue: a.complementRue,
    codePostal: a.codePostal,
    ville: a.ville,
    complete: `${a.rue}, ${a.complementRue}, ${a.codePostal} ${a.ville}`,
  },
  telephone: {
    affichage: content.pharmacie.telephone,
    lien: versLienTel(content.pharmacie.telephone),
  },
  email: content.pharmacie.email,
  garde: content.pharmacie.garde,
  pharmacien: content.pharmacie.pharmacien,
  pharmacienTitre: content.pharmacie.pharmacienTitre,
};

/** Logo officiel (fichier dans /public) — non éditable via le CMS. */
export const logo = {
  src: '/logo-pharmacie-cargese.webp',
  /** Version détourée (fond transparent), rognée au plus près du dessin
   *  (pour le médaillon du hero) — dimensions et ratio différents de `src`. */
  srcTransparent: '/logo-pharmacie-cargese-transparent.webp',
  largeur: 680,
  hauteur: 453,
  largeurTransparent: 386,
  hauteurTransparent: 327,
} as const;

/** Contenu du hero. */
export const hero = {
  badge: content.hero.badge,
  titre: content.hero.titre,
  texte: content.hero.texte,
  ouverture: content.hero.ouverture,
};

/** Services (un `id` stable est dérivé de la position pour les clés de liste). */
export const services: Service[] = content.services.map((s, i) => ({
  id: `service-${i + 1}`,
  ...s,
}));

/** Section « Pourquoi nous ». */
export const apropos: {
  surtitre: string;
  titre: string;
  paragraphes: string[];
} = content.apropos;

/** Marques du ruban. */
export const marques: string[] = content.marques;

/** Horaires jour par jour. */
export const horaires: CreneauHoraire[] = content.horaires;

/** Note sous les horaires. */
export const horairesNote: string = content.horairesNote;

/** SEO de la page d'accueil. */
export const seo = content.seo;

/** Navigation principale (ancres) — structure du site, non éditable via le CMS. */
export const navigation: LienNav[] = [
  { libelle: 'Accueil', href: '#accueil' },
  { libelle: 'Nos services', href: '#services' },
  { libelle: 'Horaires & accès', href: '#horaires' },
];

/** Lien Google Maps (itinéraire), dérivé de l'adresse. */
export const lienItineraire = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}`;

/** URL de l'iframe Google Maps (embed sans clé API), dérivée de l'adresse. */
export const lienCarteEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${pharmacie.nom}, ${pharmacie.adresse.complete}`
)}&z=14&output=embed`;
