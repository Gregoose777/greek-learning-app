/**
 * Complete Greek alphabet data for the Alphabet Learning Module (US-006).
 * All 24 letters with uppercase, lowercase, name, pronunciation, transliteration,
 * and example words with translations in EN/ES/FR.
 */

import { LocalizedString } from './types';

export interface GreekLetter {
  id: string;
  uppercase: string;
  lowercase: string;
  name: string;
  nameGreek: string;
  pronunciation: string; // IPA-style guide
  transliteration: string;
  exampleWord: {
    greek: string;
    transliteration: string;
    translation: LocalizedString;
  };
}

export const GREEK_ALPHABET: GreekLetter[] = [
  {
    id: 'alpha',
    uppercase: 'Α',
    lowercase: 'α',
    name: 'Alpha',
    nameGreek: 'Άλφα',
    pronunciation: 'ah (as in "father")',
    transliteration: 'a',
    exampleWord: {
      greek: 'αγάπη',
      transliteration: 'agápi',
      translation: { en: 'love', es: 'amor', fr: 'amour' },
    },
  },
  {
    id: 'beta',
    uppercase: 'Β',
    lowercase: 'β',
    name: 'Beta',
    nameGreek: 'Βήτα',
    pronunciation: 'v (as in "vine")',
    transliteration: 'v',
    exampleWord: {
      greek: 'βιβλίο',
      transliteration: 'vivlío',
      translation: { en: 'book', es: 'libro', fr: 'livre' },
    },
  },
  {
    id: 'gamma',
    uppercase: 'Γ',
    lowercase: 'γ',
    name: 'Gamma',
    nameGreek: 'Γάμμα',
    pronunciation: 'gh (soft guttural, like gargling)',
    transliteration: 'g/gh',
    exampleWord: {
      greek: 'γάτα',
      transliteration: 'gáta',
      translation: { en: 'cat', es: 'gato', fr: 'chat' },
    },
  },
  {
    id: 'delta',
    uppercase: 'Δ',
    lowercase: 'δ',
    name: 'Delta',
    nameGreek: 'Δέλτα',
    pronunciation: 'dh (as "th" in "this")',
    transliteration: 'd/dh',
    exampleWord: {
      greek: 'δρόμος',
      transliteration: 'drómos',
      translation: { en: 'road', es: 'camino', fr: 'route' },
    },
  },
  {
    id: 'epsilon',
    uppercase: 'Ε',
    lowercase: 'ε',
    name: 'Epsilon',
    nameGreek: 'Έψιλον',
    pronunciation: 'eh (as in "pet")',
    transliteration: 'e',
    exampleWord: {
      greek: 'ελπίδα',
      transliteration: 'elpída',
      translation: { en: 'hope', es: 'esperanza', fr: 'espoir' },
    },
  },
  {
    id: 'zeta',
    uppercase: 'Ζ',
    lowercase: 'ζ',
    name: 'Zeta',
    nameGreek: 'Ζήτα',
    pronunciation: 'z (as in "zoo")',
    transliteration: 'z',
    exampleWord: {
      greek: 'ζωή',
      transliteration: 'zoí',
      translation: { en: 'life', es: 'vida', fr: 'vie' },
    },
  },
  {
    id: 'eta',
    uppercase: 'Η',
    lowercase: 'η',
    name: 'Eta',
    nameGreek: 'Ήτα',
    pronunciation: 'ee (as in "feet")',
    transliteration: 'i',
    exampleWord: {
      greek: 'ήλιος',
      transliteration: 'ílios',
      translation: { en: 'sun', es: 'sol', fr: 'soleil' },
    },
  },
  {
    id: 'theta',
    uppercase: 'Θ',
    lowercase: 'θ',
    name: 'Theta',
    nameGreek: 'Θήτα',
    pronunciation: 'th (as in "think")',
    transliteration: 'th',
    exampleWord: {
      greek: 'θάλασσα',
      transliteration: 'thálassa',
      translation: { en: 'sea', es: 'mar', fr: 'mer' },
    },
  },
  {
    id: 'iota',
    uppercase: 'Ι',
    lowercase: 'ι',
    name: 'Iota',
    nameGreek: 'Ιώτα',
    pronunciation: 'ee (as in "feet")',
    transliteration: 'i',
    exampleWord: {
      greek: 'ιστορία',
      transliteration: 'istoría',
      translation: { en: 'history', es: 'historia', fr: 'histoire' },
    },
  },
  {
    id: 'kappa',
    uppercase: 'Κ',
    lowercase: 'κ',
    name: 'Kappa',
    nameGreek: 'Κάππα',
    pronunciation: 'k (as in "kit")',
    transliteration: 'k',
    exampleWord: {
      greek: 'καρδιά',
      transliteration: 'kardiá',
      translation: { en: 'heart', es: 'corazón', fr: 'coeur' },
    },
  },
  {
    id: 'lambda',
    uppercase: 'Λ',
    lowercase: 'λ',
    name: 'Lambda',
    nameGreek: 'Λάμδα',
    pronunciation: 'l (as in "lamp")',
    transliteration: 'l',
    exampleWord: {
      greek: 'λόγος',
      transliteration: 'lógos',
      translation: { en: 'word/reason', es: 'palabra/razón', fr: 'mot/raison' },
    },
  },
  {
    id: 'mu',
    uppercase: 'Μ',
    lowercase: 'μ',
    name: 'Mu',
    nameGreek: 'Μι',
    pronunciation: 'm (as in "moon")',
    transliteration: 'm',
    exampleWord: {
      greek: 'μητέρα',
      transliteration: 'mitéra',
      translation: { en: 'mother', es: 'madre', fr: 'mère' },
    },
  },
  {
    id: 'nu',
    uppercase: 'Ν',
    lowercase: 'ν',
    name: 'Nu',
    nameGreek: 'Νι',
    pronunciation: 'n (as in "net")',
    transliteration: 'n',
    exampleWord: {
      greek: 'νερό',
      transliteration: 'neró',
      translation: { en: 'water', es: 'agua', fr: 'eau' },
    },
  },
  {
    id: 'xi',
    uppercase: 'Ξ',
    lowercase: 'ξ',
    name: 'Xi',
    nameGreek: 'Ξι',
    pronunciation: 'ks (as in "box")',
    transliteration: 'x/ks',
    exampleWord: {
      greek: 'ξένος',
      transliteration: 'xénos',
      translation: { en: 'stranger/foreign', es: 'extranjero', fr: 'étranger' },
    },
  },
  {
    id: 'omicron',
    uppercase: 'Ο',
    lowercase: 'ο',
    name: 'Omicron',
    nameGreek: 'Όμικρον',
    pronunciation: 'o (as in "go")',
    transliteration: 'o',
    exampleWord: {
      greek: 'όνομα',
      transliteration: 'ónoma',
      translation: { en: 'name', es: 'nombre', fr: 'nom' },
    },
  },
  {
    id: 'pi',
    uppercase: 'Π',
    lowercase: 'π',
    name: 'Pi',
    nameGreek: 'Πι',
    pronunciation: 'p (as in "pen")',
    transliteration: 'p',
    exampleWord: {
      greek: 'πατέρας',
      transliteration: 'patéras',
      translation: { en: 'father', es: 'padre', fr: 'père' },
    },
  },
  {
    id: 'rho',
    uppercase: 'Ρ',
    lowercase: 'ρ',
    name: 'Rho',
    nameGreek: 'Ρο',
    pronunciation: 'r (rolled, as in Spanish)',
    transliteration: 'r',
    exampleWord: {
      greek: 'ρόδο',
      transliteration: 'ródo',
      translation: { en: 'rose', es: 'rosa', fr: 'rose' },
    },
  },
  {
    id: 'sigma',
    uppercase: 'Σ',
    lowercase: 'σ/ς',
    name: 'Sigma',
    nameGreek: 'Σίγμα',
    pronunciation: 's (as in "sun")',
    transliteration: 's',
    exampleWord: {
      greek: 'σπίτι',
      transliteration: 'spíti',
      translation: { en: 'house', es: 'casa', fr: 'maison' },
    },
  },
  {
    id: 'tau',
    uppercase: 'Τ',
    lowercase: 'τ',
    name: 'Tau',
    nameGreek: 'Ταυ',
    pronunciation: 't (as in "top")',
    transliteration: 't',
    exampleWord: {
      greek: 'τραγούδι',
      transliteration: 'tragoúdi',
      translation: { en: 'song', es: 'canción', fr: 'chanson' },
    },
  },
  {
    id: 'upsilon',
    uppercase: 'Υ',
    lowercase: 'υ',
    name: 'Upsilon',
    nameGreek: 'Ύψιλον',
    pronunciation: 'ee (as in "feet")',
    transliteration: 'y/i',
    exampleWord: {
      greek: 'ύπνος',
      transliteration: 'ýpnos',
      translation: { en: 'sleep', es: 'sueño', fr: 'sommeil' },
    },
  },
  {
    id: 'phi',
    uppercase: 'Φ',
    lowercase: 'φ',
    name: 'Phi',
    nameGreek: 'Φι',
    pronunciation: 'f (as in "fun")',
    transliteration: 'f',
    exampleWord: {
      greek: 'φίλος',
      transliteration: 'fílos',
      translation: { en: 'friend', es: 'amigo', fr: 'ami' },
    },
  },
  {
    id: 'chi',
    uppercase: 'Χ',
    lowercase: 'χ',
    name: 'Chi',
    nameGreek: 'Χι',
    pronunciation: 'kh (as "ch" in Scottish "loch")',
    transliteration: 'ch/kh',
    exampleWord: {
      greek: 'χρόνος',
      transliteration: 'chrónos',
      translation: { en: 'time/year', es: 'tiempo/año', fr: 'temps/année' },
    },
  },
  {
    id: 'psi',
    uppercase: 'Ψ',
    lowercase: 'ψ',
    name: 'Psi',
    nameGreek: 'Ψι',
    pronunciation: 'ps (as in "tips")',
    transliteration: 'ps',
    exampleWord: {
      greek: 'ψωμί',
      transliteration: 'psomí',
      translation: { en: 'bread', es: 'pan', fr: 'pain' },
    },
  },
  {
    id: 'omega',
    uppercase: 'Ω',
    lowercase: 'ω',
    name: 'Omega',
    nameGreek: 'Ωμέγα',
    pronunciation: 'o (as in "go")',
    transliteration: 'o',
    exampleWord: {
      greek: 'ώρα',
      transliteration: 'óra',
      translation: { en: 'hour/time', es: 'hora', fr: 'heure' },
    },
  },
];

/** Generate quiz options for a letter - returns 4 pronunciation options, 1 correct + 3 distractors */
export function generateQuizOptions(
  correctLetter: GreekLetter,
  allLetters: GreekLetter[] = GREEK_ALPHABET
): { text: string; isCorrect: boolean }[] {
  const distractors = allLetters
    .filter((l) => l.id !== correctLetter.id && l.pronunciation !== correctLetter.pronunciation)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [
    { text: correctLetter.pronunciation, isCorrect: true },
    ...distractors.map((d) => ({ text: d.pronunciation, isCorrect: false })),
  ].sort(() => Math.random() - 0.5);

  return options;
}
