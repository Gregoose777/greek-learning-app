/**
 * Seed data for HellenicaGo.
 * Course: Modern Greek > Unit 1: Alphabet & Basics (5 lessons)
 */
import type { Course } from './types';

export const greekCourse: Course = {
  id: 'modern-greek',
  title: {
    en: 'Modern Greek',
    es: 'Griego Moderno',
    fr: 'Grec Moderne',
  },
  description: {
    en: 'Learn Modern Greek from beginner to advanced',
    es: 'Aprende griego moderno de principiante a avanzado',
    fr: 'Apprenez le grec moderne du débutant au avancé',
  },
  units: [
    {
      id: 'unit-1',
      courseId: 'modern-greek',
      order: 1,
      title: {
        en: 'Alphabet & Basics',
        es: 'Alfabeto y Conceptos Básicos',
        fr: 'Alphabet et Bases',
      },
      description: {
        en: 'Learn the Greek alphabet and basic greetings',
        es: 'Aprende el alfabeto griego y saludos básicos',
        fr: "Apprenez l'alphabet grec et les salutations de base",
      },
      lessons: [
        // Lesson 1: First Greek Letters (Α-Ε)
        {
          id: 'u1-l1',
          unitId: 'unit-1',
          order: 1,
          title: {
            en: 'First Greek Letters (Α-Ε)',
            es: 'Primeras Letras Griegas (Α-Ε)',
            fr: 'Premières Lettres Grecques (Α-Ε)',
          },
          description: {
            en: 'Learn the first five letters of the Greek alphabet',
            es: 'Aprende las cinco primeras letras del alfabeto griego',
            fr: "Apprenez les cinq premières lettres de l'alphabet grec",
          },
          vocabulary: [
            {
              greek: 'Α α',
              transliteration: 'alfa',
              translation: { en: 'Alpha', es: 'Alfa', fr: 'Alpha' },
              exampleSentence: { en: 'Alpha is the first letter', es: 'Alfa es la primera letra', fr: "Alpha est la première lettre" },
            },
            {
              greek: 'Β β',
              transliteration: 'víta',
              translation: { en: 'Beta', es: 'Beta', fr: 'Bêta' },
            },
            {
              greek: 'Γ γ',
              transliteration: 'gáma',
              translation: { en: 'Gamma', es: 'Gamma', fr: 'Gamma' },
            },
            {
              greek: 'Δ δ',
              transliteration: 'délta',
              translation: { en: 'Delta', es: 'Delta', fr: 'Delta' },
            },
            {
              greek: 'Ε ε',
              transliteration: 'épsilon',
              translation: { en: 'Epsilon', es: 'Épsilon', fr: 'Epsilon' },
            },
          ],
          exercises: [
            {
              id: 'u1-l1-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'Which letter is "Alpha"?',
                es: '¿Cuál letra es "Alfa"?',
                fr: 'Quelle lettre est "Alpha" ?',
              },
              options: [
                { en: 'Α α', es: 'Α α', fr: 'Α α' },
                { en: 'Β β', es: 'Β β', fr: 'Β β' },
                { en: 'Γ γ', es: 'Γ γ', fr: 'Γ γ' },
                { en: 'Δ δ', es: 'Δ δ', fr: 'Δ δ' },
              ],
              correctIndex: 0,
            },
            {
              id: 'u1-l1-ex2',
              type: 'multiple_choice',
              prompt: {
                en: 'What is the name of this letter: Γ γ?',
                es: '¿Cómo se llama esta letra: Γ γ?',
                fr: 'Comment s\'appelle cette lettre : Γ γ ?',
              },
              options: [
                { en: 'Beta', es: 'Beta', fr: 'Bêta' },
                { en: 'Delta', es: 'Delta', fr: 'Delta' },
                { en: 'Gamma', es: 'Gamma', fr: 'Gamma' },
                { en: 'Epsilon', es: 'Épsilon', fr: 'Epsilon' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u1-l1-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Α', translation: { en: 'Alpha', es: 'Alfa', fr: 'Alpha' } },
                { greek: 'Β', translation: { en: 'Beta', es: 'Beta', fr: 'Bêta' } },
                { greek: 'Γ', translation: { en: 'Gamma', es: 'Gamma', fr: 'Gamma' } },
                { greek: 'Δ', translation: { en: 'Delta', es: 'Delta', fr: 'Delta' } },
              ],
            },
            {
              id: 'u1-l1-ex4',
              type: 'listening',
              greekText: 'Β β',
              prompt: {
                en: 'What letter did you hear?',
                es: '¿Qué letra escuchaste?',
                fr: 'Quelle lettre avez-vous entendue ?',
              },
              options: [
                { en: 'Alpha (Α)', es: 'Alfa (Α)', fr: 'Alpha (Α)' },
                { en: 'Beta (Β)', es: 'Beta (Β)', fr: 'Bêta (Β)' },
                { en: 'Gamma (Γ)', es: 'Gamma (Γ)', fr: 'Gamma (Γ)' },
                { en: 'Delta (Δ)', es: 'Delta (Δ)', fr: 'Delta (Δ)' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 2: More Letters (Ζ-Κ)
        {
          id: 'u1-l2',
          unitId: 'unit-1',
          order: 2,
          title: {
            en: 'More Greek Letters (Ζ-Κ)',
            es: 'Más Letras Griegas (Ζ-Κ)',
            fr: 'Plus de Lettres Grecques (Ζ-Κ)',
          },
          description: {
            en: 'Learn the letters Zeta through Kappa',
            es: 'Aprende las letras Zeta a Kappa',
            fr: 'Apprenez les lettres Zêta à Kappa',
          },
          vocabulary: [
            {
              greek: 'Ζ ζ',
              transliteration: 'zíta',
              translation: { en: 'Zeta', es: 'Zeta', fr: 'Zêta' },
            },
            {
              greek: 'Η η',
              transliteration: 'íta',
              translation: { en: 'Eta', es: 'Eta', fr: 'Êta' },
            },
            {
              greek: 'Θ θ',
              transliteration: 'thíta',
              translation: { en: 'Theta', es: 'Zeta', fr: 'Thêta' },
            },
            {
              greek: 'Ι ι',
              transliteration: 'ióta',
              translation: { en: 'Iota', es: 'Iota', fr: 'Iota' },
            },
            {
              greek: 'Κ κ',
              transliteration: 'kápa',
              translation: { en: 'Kappa', es: 'Kappa', fr: 'Kappa' },
            },
          ],
          exercises: [
            {
              id: 'u1-l2-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'Which letter makes the "th" sound in Greek?',
                es: '¿Qué letra hace el sonido "z" en griego?',
                fr: 'Quelle lettre fait le son "th" en grec ?',
              },
              options: [
                { en: 'Ζ ζ (Zeta)', es: 'Ζ ζ (Zeta)', fr: 'Ζ ζ (Zêta)' },
                { en: 'Η η (Eta)', es: 'Η η (Eta)', fr: 'Η η (Êta)' },
                { en: 'Θ θ (Theta)', es: 'Θ θ (Zeta)', fr: 'Θ θ (Thêta)' },
                { en: 'Κ κ (Kappa)', es: 'Κ κ (Kappa)', fr: 'Κ κ (Kappa)' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u1-l2-ex2',
              type: 'multiple_choice',
              prompt: {
                en: 'What is the name of this letter: Η η?',
                es: '¿Cómo se llama esta letra: Η η?',
                fr: 'Comment s\'appelle cette lettre : Η η ?',
              },
              options: [
                { en: 'Eta', es: 'Eta', fr: 'Êta' },
                { en: 'Iota', es: 'Iota', fr: 'Iota' },
                { en: 'Zeta', es: 'Zeta', fr: 'Zêta' },
                { en: 'Theta', es: 'Zeta', fr: 'Thêta' },
              ],
              correctIndex: 0,
            },
            {
              id: 'u1-l2-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Ζ', translation: { en: 'Zeta', es: 'Zeta', fr: 'Zêta' } },
                { greek: 'Η', translation: { en: 'Eta', es: 'Eta', fr: 'Êta' } },
                { greek: 'Θ', translation: { en: 'Theta', es: 'Zeta', fr: 'Thêta' } },
                { greek: 'Ι', translation: { en: 'Iota', es: 'Iota', fr: 'Iota' } },
                { greek: 'Κ', translation: { en: 'Kappa', es: 'Kappa', fr: 'Kappa' } },
              ],
            },
            {
              id: 'u1-l2-ex4',
              type: 'listening',
              greekText: 'Θ θ',
              prompt: {
                en: 'What letter did you hear?',
                es: '¿Qué letra escuchaste?',
                fr: 'Quelle lettre avez-vous entendue ?',
              },
              options: [
                { en: 'Zeta (Ζ)', es: 'Zeta (Ζ)', fr: 'Zêta (Ζ)' },
                { en: 'Eta (Η)', es: 'Eta (Η)', fr: 'Êta (Η)' },
                { en: 'Theta (Θ)', es: 'Zeta (Θ)', fr: 'Thêta (Θ)' },
                { en: 'Kappa (Κ)', es: 'Kappa (Κ)', fr: 'Kappa (Κ)' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 3: Basic Greetings
        {
          id: 'u1-l3',
          unitId: 'unit-1',
          order: 3,
          title: {
            en: 'Basic Greetings',
            es: 'Saludos Básicos',
            fr: 'Salutations de Base',
          },
          description: {
            en: 'Learn to say hello, goodbye, and basic greetings in Greek',
            es: 'Aprende a decir hola, adiós y saludos básicos en griego',
            fr: 'Apprenez à dire bonjour, au revoir et les salutations de base en grec',
          },
          vocabulary: [
            {
              greek: 'Γεια σου',
              transliteration: 'ya su',
              translation: { en: 'Hello / Hi', es: 'Hola', fr: 'Bonjour / Salut' },
              exampleSentence: {
                en: 'Γεια σου! Τι κάνεις; - Hello! How are you?',
                es: 'Γεια σου! Τι κάνεις; - ¡Hola! ¿Cómo estás?',
                fr: 'Γεια σου! Τι κάνεις; - Bonjour ! Comment vas-tu ?',
              },
            },
            {
              greek: 'Καλημέρα',
              transliteration: 'kaliméra',
              translation: { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour (matin)' },
            },
            {
              greek: 'Καλησπέρα',
              transliteration: 'kalispéra',
              translation: { en: 'Good evening', es: 'Buenas tardes', fr: 'Bonsoir' },
            },
            {
              greek: 'Καληνύχτα',
              transliteration: 'kaliníhta',
              translation: { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit' },
            },
            {
              greek: 'Αντίο',
              transliteration: 'adío',
              translation: { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' },
            },
          ],
          exercises: [
            {
              id: 'u1-l3-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you say "Hello" in Greek?',
                es: '¿Cómo se dice "Hola" en griego?',
                fr: 'Comment dit-on "Bonjour" en grec ?',
              },
              options: [
                { en: 'Αντίο', es: 'Αντίο', fr: 'Αντίο' },
                { en: 'Γεια σου', es: 'Γεια σου', fr: 'Γεια σου' },
                { en: 'Καληνύχτα', es: 'Καληνύχτα', fr: 'Καληνύχτα' },
                { en: 'Καλημέρα', es: 'Καλημέρα', fr: 'Καλημέρα' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u1-l3-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "Good morning"',
                es: 'Traduce al griego: "Buenos días"',
                fr: 'Traduisez en grec : "Bonjour (matin)"',
              },
              greekText: 'Καλημέρα',
              direction: 'to_greek',
              acceptedAnswers: ['Καλημέρα', 'καλημέρα', 'kalimera', 'kaliméra'],
            },
            {
              id: 'u1-l3-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Γεια σου', translation: { en: 'Hello', es: 'Hola', fr: 'Bonjour' } },
                { greek: 'Καλημέρα', translation: { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour (matin)' } },
                { greek: 'Καληνύχτα', translation: { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit' } },
                { greek: 'Αντίο', translation: { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' } },
              ],
            },
            {
              id: 'u1-l3-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ means "Good evening"',
                es: 'Completa: ___ significa "Buenas tardes"',
                fr: 'Complétez : ___ signifie "Bonsoir"',
              },
              greekSentence: '___',
              answer: 'Καλησπέρα',
              wordBank: ['Καλημέρα', 'Καλησπέρα', 'Καληνύχτα', 'Αντίο'],
            },
            {
              id: 'u1-l3-ex5',
              type: 'listening',
              greekText: 'Καληνύχτα',
              prompt: {
                en: 'What does this greeting mean?',
                es: '¿Qué significa este saludo?',
                fr: 'Que signifie cette salutation ?',
              },
              options: [
                { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour (matin)' },
                { en: 'Good evening', es: 'Buenas tardes', fr: 'Bonsoir' },
                { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit' },
                { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 4: Introducing Yourself
        {
          id: 'u1-l4',
          unitId: 'unit-1',
          order: 4,
          title: {
            en: 'Introducing Yourself',
            es: 'Presentarte',
            fr: 'Se Présenter',
          },
          description: {
            en: 'Learn to introduce yourself and ask someone\'s name',
            es: 'Aprende a presentarte y preguntar el nombre de alguien',
            fr: 'Apprenez à vous présenter et à demander le nom de quelqu\'un',
          },
          vocabulary: [
            {
              greek: 'Με λένε',
              transliteration: 'me léne',
              translation: { en: 'My name is', es: 'Me llamo', fr: 'Je m\'appelle' },
              exampleSentence: {
                en: 'Με λένε Μαρία. - My name is Maria.',
                es: 'Με λένε Μαρία. - Me llamo María.',
                fr: 'Με λένε Μαρία. - Je m\'appelle Maria.',
              },
            },
            {
              greek: 'Πώς σε λένε;',
              transliteration: 'pos se léne?',
              translation: { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment t\'appelles-tu ?' },
            },
            {
              greek: 'Χαίρω πολύ',
              transliteration: 'héro polí',
              translation: { en: 'Nice to meet you', es: 'Mucho gusto', fr: 'Enchanté(e)' },
            },
            {
              greek: 'Ναι',
              transliteration: 'ne',
              translation: { en: 'Yes', es: 'Sí', fr: 'Oui' },
            },
            {
              greek: 'Όχι',
              transliteration: 'óhi',
              translation: { en: 'No', es: 'No', fr: 'Non' },
            },
          ],
          exercises: [
            {
              id: 'u1-l4-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you say "My name is" in Greek?',
                es: '¿Cómo se dice "Me llamo" en griego?',
                fr: 'Comment dit-on "Je m\'appelle" en grec ?',
              },
              options: [
                { en: 'Χαίρω πολύ', es: 'Χαίρω πολύ', fr: 'Χαίρω πολύ' },
                { en: 'Πώς σε λένε;', es: 'Πώς σε λένε;', fr: 'Πώς σε λένε;' },
                { en: 'Με λένε', es: 'Με λένε', fr: 'Με λένε' },
                { en: 'Ναι', es: 'Ναι', fr: 'Ναι' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u1-l4-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "Χαίρω πολύ"',
                es: 'Traduce del griego: "Χαίρω πολύ"',
                fr: 'Traduisez du grec : "Χαίρω πολύ"',
              },
              greekText: 'Χαίρω πολύ',
              direction: 'from_greek',
              acceptedAnswers: ['Nice to meet you', 'Pleased to meet you', 'Mucho gusto', 'Enchanté', 'Enchantée'],
            },
            {
              id: 'u1-l4-ex3',
              type: 'fill_blank',
              sentence: {
                en: '___ σε λένε; means "What is your name?"',
                es: '___ σε λένε; significa "¿Cómo te llamas?"',
                fr: '___ σε λένε; signifie "Comment t\'appelles-tu ?"',
              },
              greekSentence: '___ σε λένε;',
              answer: 'Πώς',
              wordBank: ['Με', 'Πώς', 'Ναι', 'Όχι'],
            },
            {
              id: 'u1-l4-ex4',
              type: 'match_pairs',
              pairs: [
                { greek: 'Με λένε', translation: { en: 'My name is', es: 'Me llamo', fr: 'Je m\'appelle' } },
                { greek: 'Χαίρω πολύ', translation: { en: 'Nice to meet you', es: 'Mucho gusto', fr: 'Enchanté(e)' } },
                { greek: 'Ναι', translation: { en: 'Yes', es: 'Sí', fr: 'Oui' } },
                { greek: 'Όχι', translation: { en: 'No', es: 'No', fr: 'Non' } },
              ],
            },
            {
              id: 'u1-l4-ex5',
              type: 'multiple_choice',
              prompt: {
                en: 'Be careful! In Greek, "Ναι" (ne) means:',
                es: '¡Cuidado! En griego, "Ναι" (ne) significa:',
                fr: 'Attention ! En grec, "Ναι" (ne) signifie :',
              },
              options: [
                { en: 'No', es: 'No', fr: 'Non' },
                { en: 'Yes', es: 'Sí', fr: 'Oui' },
                { en: 'Maybe', es: 'Quizás', fr: 'Peut-être' },
                { en: 'Hello', es: 'Hola', fr: 'Bonjour' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 5: Numbers 1-5
        {
          id: 'u1-l5',
          unitId: 'unit-1',
          order: 5,
          title: {
            en: 'Numbers 1-5',
            es: 'Números 1-5',
            fr: 'Nombres 1-5',
          },
          description: {
            en: 'Learn to count from one to five in Greek',
            es: 'Aprende a contar de uno a cinco en griego',
            fr: 'Apprenez à compter de un à cinq en grec',
          },
          vocabulary: [
            {
              greek: 'ένα',
              transliteration: 'éna',
              translation: { en: 'one', es: 'uno', fr: 'un' },
            },
            {
              greek: 'δύο',
              transliteration: 'dío',
              translation: { en: 'two', es: 'dos', fr: 'deux' },
            },
            {
              greek: 'τρία',
              transliteration: 'tría',
              translation: { en: 'three', es: 'tres', fr: 'trois' },
            },
            {
              greek: 'τέσσερα',
              transliteration: 'tésera',
              translation: { en: 'four', es: 'cuatro', fr: 'quatre' },
            },
            {
              greek: 'πέντε',
              transliteration: 'pénde',
              translation: { en: 'five', es: 'cinco', fr: 'cinq' },
            },
          ],
          exercises: [
            {
              id: 'u1-l5-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "three" in Greek?',
                es: '¿Cómo se dice "tres" en griego?',
                fr: 'Comment dit-on "trois" en grec ?',
              },
              options: [
                { en: 'ένα', es: 'ένα', fr: 'ένα' },
                { en: 'δύο', es: 'δύο', fr: 'δύο' },
                { en: 'τρία', es: 'τρία', fr: 'τρία' },
                { en: 'τέσσερα', es: 'τέσσερα', fr: 'τέσσερα' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u1-l5-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "πέντε"',
                es: 'Traduce del griego: "πέντε"',
                fr: 'Traduisez du grec : "πέντε"',
              },
              greekText: 'πέντε',
              direction: 'from_greek',
              acceptedAnswers: ['five', 'cinco', 'cinq', '5'],
            },
            {
              id: 'u1-l5-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'ένα', translation: { en: 'one', es: 'uno', fr: 'un' } },
                { greek: 'δύο', translation: { en: 'two', es: 'dos', fr: 'deux' } },
                { greek: 'τρία', translation: { en: 'three', es: 'tres', fr: 'trois' } },
                { greek: 'τέσσερα', translation: { en: 'four', es: 'cuatro', fr: 'quatre' } },
                { greek: 'πέντε', translation: { en: 'five', es: 'cinco', fr: 'cinq' } },
              ],
            },
            {
              id: 'u1-l5-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Fill in the missing number: ένα, δύο, ___',
                es: 'Completa el número que falta: ένα, δύο, ___',
                fr: 'Complétez le nombre manquant : ένα, δύο, ___',
              },
              greekSentence: 'ένα, δύο, ___',
              answer: 'τρία',
              wordBank: ['τέσσερα', 'τρία', 'πέντε', 'δύο'],
            },
            {
              id: 'u1-l5-ex5',
              type: 'listening',
              greekText: 'τέσσερα',
              prompt: {
                en: 'What number did you hear?',
                es: '¿Qué número escuchaste?',
                fr: 'Quel nombre avez-vous entendu ?',
              },
              options: [
                { en: 'two (δύο)', es: 'dos (δύο)', fr: 'deux (δύο)' },
                { en: 'three (τρία)', es: 'tres (τρία)', fr: 'trois (τρία)' },
                { en: 'four (τέσσερα)', es: 'cuatro (τέσσερα)', fr: 'quatre (τέσσερα)' },
                { en: 'five (πέντε)', es: 'cinco (πέντε)', fr: 'cinq (πέντε)' },
              ],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};
