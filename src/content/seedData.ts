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

    // ============================================
    // Unit 2: Greetings & Introductions
    // ============================================
    {
      id: 'unit-2',
      courseId: 'modern-greek',
      order: 2,
      title: {
        en: 'Greetings & Introductions',
        es: 'Saludos y Presentaciones',
        fr: 'Salutations et Présentations',
      },
      description: {
        en: 'Master everyday greetings and learn to introduce yourself',
        es: 'Domina los saludos cotidianos y aprende a presentarte',
        fr: 'Maîtrisez les salutations quotidiennes et apprenez à vous présenter',
      },
      lessons: [
        // Lesson 1: Formal Greetings
        {
          id: 'u2-l1',
          unitId: 'unit-2',
          order: 1,
          title: {
            en: 'Formal Greetings',
            es: 'Saludos Formales',
            fr: 'Salutations Formelles',
          },
          description: {
            en: 'Learn polite and formal ways to greet people',
            es: 'Aprende formas educadas y formales de saludar',
            fr: 'Apprenez des façons polies et formelles de saluer',
          },
          vocabulary: [
            {
              greek: 'Γεια σας',
              transliteration: 'ya sas',
              translation: { en: 'Hello (formal/plural)', es: 'Hola (formal/plural)', fr: 'Bonjour (formel/pluriel)' },
              exampleSentence: {
                en: 'Γεια σας, κύριε. - Hello, sir.',
                es: 'Γεια σας, κύριε. - Hola, señor.',
                fr: 'Γεια σας, κύριε. - Bonjour, monsieur.',
              },
            },
            {
              greek: 'Κύριε',
              transliteration: 'kírie',
              translation: { en: 'Sir / Mr.', es: 'Señor', fr: 'Monsieur' },
            },
            {
              greek: 'Κυρία',
              transliteration: 'kiría',
              translation: { en: 'Ma\'am / Mrs.', es: 'Señora', fr: 'Madame' },
            },
            {
              greek: 'Τι κάνετε;',
              transliteration: 'ti kánete?',
              translation: { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?' },
            },
            {
              greek: 'Καλά, ευχαριστώ',
              transliteration: 'kalá, efharistó',
              translation: { en: 'Fine, thank you', es: 'Bien, gracias', fr: 'Bien, merci' },
            },
          ],
          exercises: [
            {
              id: 'u2-l1-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you formally say "Hello" in Greek?',
                es: '¿Cómo se dice "Hola" formalmente en griego?',
                fr: 'Comment dit-on "Bonjour" formellement en grec ?',
              },
              options: [
                { en: 'Γεια σου', es: 'Γεια σου', fr: 'Γεια σου' },
                { en: 'Γεια σας', es: 'Γεια σας', fr: 'Γεια σας' },
                { en: 'Αντίο', es: 'Αντίο', fr: 'Αντίο' },
                { en: 'Καλημέρα', es: 'Καλημέρα', fr: 'Καλημέρα' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u2-l1-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "How are you?" (formal)',
                es: 'Traduce al griego: "¿Cómo está usted?"',
                fr: 'Traduisez en grec : "Comment allez-vous ?"',
              },
              greekText: 'Τι κάνετε;',
              direction: 'to_greek',
              acceptedAnswers: ['Τι κάνετε;', 'Τι κάνετε', 'τι κάνετε', 'Ti kanete'],
            },
            {
              id: 'u2-l1-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Κύριε', translation: { en: 'Sir', es: 'Señor', fr: 'Monsieur' } },
                { greek: 'Κυρία', translation: { en: 'Ma\'am', es: 'Señora', fr: 'Madame' } },
                { greek: 'Γεια σας', translation: { en: 'Hello (formal)', es: 'Hola (formal)', fr: 'Bonjour (formel)' } },
                { greek: 'Καλά, ευχαριστώ', translation: { en: 'Fine, thank you', es: 'Bien, gracias', fr: 'Bien, merci' } },
              ],
            },
            {
              id: 'u2-l1-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: Τι ___; means "How are you? (formal)"',
                es: 'Completa: Τι ___; significa "¿Cómo está usted?"',
                fr: 'Complétez : Τι ___; signifie "Comment allez-vous ?"',
              },
              greekSentence: 'Τι ___;',
              answer: 'κάνετε',
              wordBank: ['κάνεις', 'κάνετε', 'λένε', 'είσαι'],
            },
            {
              id: 'u2-l1-ex5',
              type: 'listening',
              greekText: 'Καλά, ευχαριστώ',
              prompt: {
                en: 'What does this phrase mean?',
                es: '¿Qué significa esta frase?',
                fr: 'Que signifie cette phrase ?',
              },
              options: [
                { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour (matin)' },
                { en: 'Fine, thank you', es: 'Bien, gracias', fr: 'Bien, merci' },
                { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' },
                { en: 'Nice to meet you', es: 'Mucho gusto', fr: 'Enchanté(e)' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 2: Informal Greetings
        {
          id: 'u2-l2',
          unitId: 'unit-2',
          order: 2,
          title: {
            en: 'Informal Greetings',
            es: 'Saludos Informales',
            fr: 'Salutations Informelles',
          },
          description: {
            en: 'Learn casual ways to greet friends and family',
            es: 'Aprende formas casuales de saludar a amigos y familia',
            fr: 'Apprenez des façons décontractées de saluer amis et famille',
          },
          vocabulary: [
            {
              greek: 'Τι κάνεις;',
              transliteration: 'ti kánis?',
              translation: { en: 'How are you? (informal)', es: '¿Cómo estás?', fr: 'Comment vas-tu ?' },
              exampleSentence: {
                en: 'Γεια σου! Τι κάνεις; - Hi! How are you?',
                es: 'Γεια σου! Τι κάνεις; - ¡Hola! ¿Cómo estás?',
                fr: 'Γεια σου! Τι κάνεις; - Salut ! Comment vas-tu ?',
              },
            },
            {
              greek: 'Πολύ καλά',
              transliteration: 'polí kalá',
              translation: { en: 'Very well', es: 'Muy bien', fr: 'Très bien' },
            },
            {
              greek: 'Έτσι κι έτσι',
              transliteration: 'étsi ki étsi',
              translation: { en: 'So-so', es: 'Así así', fr: 'Comme ci comme ça' },
            },
            {
              greek: 'Τα λέμε',
              transliteration: 'ta léme',
              translation: { en: 'See you / Talk later', es: 'Nos vemos', fr: 'À plus tard' },
            },
            {
              greek: 'Φίλε',
              transliteration: 'fíle',
              translation: { en: 'Friend (male)', es: 'Amigo', fr: 'Ami' },
            },
          ],
          exercises: [
            {
              id: 'u2-l2-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you informally ask "How are you?" in Greek?',
                es: '¿Cómo preguntas informalmente "¿Cómo estás?" en griego?',
                fr: 'Comment demander informellement "Comment vas-tu ?" en grec ?',
              },
              options: [
                { en: 'Τι κάνετε;', es: 'Τι κάνετε;', fr: 'Τι κάνετε;' },
                { en: 'Πώς σε λένε;', es: 'Πώς σε λένε;', fr: 'Πώς σε λένε;' },
                { en: 'Τι κάνεις;', es: 'Τι κάνεις;', fr: 'Τι κάνεις;' },
                { en: 'Τα λέμε', es: 'Τα λέμε', fr: 'Τα λέμε' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u2-l2-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "Πολύ καλά"',
                es: 'Traduce del griego: "Πολύ καλά"',
                fr: 'Traduisez du grec : "Πολύ καλά"',
              },
              greekText: 'Πολύ καλά',
              direction: 'from_greek',
              acceptedAnswers: ['Very well', 'Very good', 'Muy bien', 'Très bien'],
            },
            {
              id: 'u2-l2-ex3',
              type: 'fill_blank',
              sentence: {
                en: '___ κι ___ means "So-so"',
                es: '___ κι ___ significa "Así así"',
                fr: '___ κι ___ signifie "Comme ci comme ça"',
              },
              greekSentence: '___ κι ___',
              answer: 'Έτσι',
              wordBank: ['Έτσι', 'Πολύ', 'Καλά', 'Ναι'],
            },
            {
              id: 'u2-l2-ex4',
              type: 'match_pairs',
              pairs: [
                { greek: 'Τι κάνεις;', translation: { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ?' } },
                { greek: 'Πολύ καλά', translation: { en: 'Very well', es: 'Muy bien', fr: 'Très bien' } },
                { greek: 'Έτσι κι έτσι', translation: { en: 'So-so', es: 'Así así', fr: 'Comme ci comme ça' } },
                { greek: 'Τα λέμε', translation: { en: 'See you', es: 'Nos vemos', fr: 'À plus tard' } },
              ],
            },
            {
              id: 'u2-l2-ex5',
              type: 'listening',
              greekText: 'Τα λέμε',
              prompt: {
                en: 'What does this phrase mean?',
                es: '¿Qué significa esta frase?',
                fr: 'Que signifie cette phrase ?',
              },
              options: [
                { en: 'Hello', es: 'Hola', fr: 'Bonjour' },
                { en: 'Very well', es: 'Muy bien', fr: 'Très bien' },
                { en: 'See you / Talk later', es: 'Nos vemos', fr: 'À plus tard' },
                { en: 'So-so', es: 'Así así', fr: 'Comme ci comme ça' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 3: Saying Thank You & Please
        {
          id: 'u2-l3',
          unitId: 'unit-2',
          order: 3,
          title: {
            en: 'Thank You & Please',
            es: 'Gracias y Por Favor',
            fr: 'Merci et S\'il Vous Plaît',
          },
          description: {
            en: 'Learn essential polite expressions',
            es: 'Aprende expresiones esenciales de cortesía',
            fr: 'Apprenez les expressions essentielles de politesse',
          },
          vocabulary: [
            {
              greek: 'Ευχαριστώ',
              transliteration: 'efharistó',
              translation: { en: 'Thank you', es: 'Gracias', fr: 'Merci' },
              exampleSentence: {
                en: 'Ευχαριστώ πολύ! - Thank you very much!',
                es: 'Ευχαριστώ πολύ! - ¡Muchas gracias!',
                fr: 'Ευχαριστώ πολύ! - Merci beaucoup !',
              },
            },
            {
              greek: 'Παρακαλώ',
              transliteration: 'parakaló',
              translation: { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien' },
            },
            {
              greek: 'Συγγνώμη',
              transliteration: 'signómi',
              translation: { en: 'Excuse me / Sorry', es: 'Perdón / Disculpe', fr: 'Excusez-moi / Pardon' },
            },
            {
              greek: 'Τίποτα',
              transliteration: 'típota',
              translation: { en: 'Nothing / Don\'t mention it', es: 'Nada / No hay de qué', fr: 'Rien / Il n\'y a pas de quoi' },
            },
            {
              greek: 'Ευχαριστώ πολύ',
              transliteration: 'efharistó polí',
              translation: { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup' },
            },
          ],
          exercises: [
            {
              id: 'u2-l3-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you say "Thank you" in Greek?',
                es: '¿Cómo se dice "Gracias" en griego?',
                fr: 'Comment dit-on "Merci" en grec ?',
              },
              options: [
                { en: 'Παρακαλώ', es: 'Παρακαλώ', fr: 'Παρακαλώ' },
                { en: 'Ευχαριστώ', es: 'Ευχαριστώ', fr: 'Ευχαριστώ' },
                { en: 'Συγγνώμη', es: 'Συγγνώμη', fr: 'Συγγνώμη' },
                { en: 'Τίποτα', es: 'Τίποτα', fr: 'Τίποτα' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u2-l3-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "Please"',
                es: 'Traduce al griego: "Por favor"',
                fr: 'Traduisez en grec : "S\'il vous plaît"',
              },
              greekText: 'Παρακαλώ',
              direction: 'to_greek',
              acceptedAnswers: ['Παρακαλώ', 'παρακαλώ', 'parakalo', 'parakaló'],
            },
            {
              id: 'u2-l3-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Ευχαριστώ', translation: { en: 'Thank you', es: 'Gracias', fr: 'Merci' } },
                { greek: 'Παρακαλώ', translation: { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît' } },
                { greek: 'Συγγνώμη', translation: { en: 'Sorry', es: 'Perdón', fr: 'Pardon' } },
                { greek: 'Τίποτα', translation: { en: 'Nothing', es: 'Nada', fr: 'Rien' } },
              ],
            },
            {
              id: 'u2-l3-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ πολύ means "Thank you very much"',
                es: 'Completa: ___ πολύ significa "Muchas gracias"',
                fr: 'Complétez : ___ πολύ signifie "Merci beaucoup"',
              },
              greekSentence: '___ πολύ',
              answer: 'Ευχαριστώ',
              wordBank: ['Ευχαριστώ', 'Παρακαλώ', 'Συγγνώμη', 'Καλημέρα'],
            },
            {
              id: 'u2-l3-ex5',
              type: 'listening',
              greekText: 'Συγγνώμη',
              prompt: {
                en: 'What does this word mean?',
                es: '¿Qué significa esta palabra?',
                fr: 'Que signifie ce mot ?',
              },
              options: [
                { en: 'Thank you', es: 'Gracias', fr: 'Merci' },
                { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît' },
                { en: 'Excuse me / Sorry', es: 'Perdón / Disculpe', fr: 'Excusez-moi / Pardon' },
                { en: 'Nothing', es: 'Nada', fr: 'Rien' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 4: Where Are You From?
        {
          id: 'u2-l4',
          unitId: 'unit-2',
          order: 4,
          title: {
            en: 'Where Are You From?',
            es: '¿De Dónde Eres?',
            fr: 'D\'où Venez-Vous ?',
          },
          description: {
            en: 'Learn to ask and tell where you are from',
            es: 'Aprende a preguntar y decir de dónde eres',
            fr: 'Apprenez à demander et dire d\'où vous venez',
          },
          vocabulary: [
            {
              greek: 'Από πού είσαι;',
              transliteration: 'apó pu íse?',
              translation: { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où viens-tu ?' },
              exampleSentence: {
                en: 'Από πού είσαι; - Where are you from?',
                es: 'Από πού είσαι; - ¿De dónde eres?',
                fr: 'Από πού είσαι; - D\'où viens-tu ?',
              },
            },
            {
              greek: 'Είμαι από',
              transliteration: 'íme apó',
              translation: { en: 'I am from', es: 'Soy de', fr: 'Je suis de' },
            },
            {
              greek: 'Ελλάδα',
              transliteration: 'eláda',
              translation: { en: 'Greece', es: 'Grecia', fr: 'Grèce' },
            },
            {
              greek: 'Αγγλία',
              transliteration: 'anglía',
              translation: { en: 'England', es: 'Inglaterra', fr: 'Angleterre' },
            },
            {
              greek: 'Αμερική',
              transliteration: 'amerikí',
              translation: { en: 'America', es: 'América', fr: 'Amérique' },
            },
          ],
          exercises: [
            {
              id: 'u2-l4-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you ask "Where are you from?" in Greek?',
                es: '¿Cómo preguntas "¿De dónde eres?" en griego?',
                fr: 'Comment demander "D\'où viens-tu ?" en grec ?',
              },
              options: [
                { en: 'Τι κάνεις;', es: 'Τι κάνεις;', fr: 'Τι κάνεις;' },
                { en: 'Πώς σε λένε;', es: 'Πώς σε λένε;', fr: 'Πώς σε λένε;' },
                { en: 'Από πού είσαι;', es: 'Από πού είσαι;', fr: 'Από πού είσαι;' },
                { en: 'Τι κάνετε;', es: 'Τι κάνετε;', fr: 'Τι κάνετε;' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u2-l4-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "Είμαι από την Ελλάδα"',
                es: 'Traduce del griego: "Είμαι από την Ελλάδα"',
                fr: 'Traduisez du grec : "Είμαι από την Ελλάδα"',
              },
              greekText: 'Είμαι από την Ελλάδα',
              direction: 'from_greek',
              acceptedAnswers: ['I am from Greece', 'I\'m from Greece', 'Soy de Grecia', 'Je suis de Grèce'],
            },
            {
              id: 'u2-l4-ex3',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ από την Αγγλία means "I am from England"',
                es: 'Completa: ___ από την Αγγλία significa "Soy de Inglaterra"',
                fr: 'Complétez : ___ από την Αγγλία signifie "Je suis d\'Angleterre"',
              },
              greekSentence: '___ από την Αγγλία',
              answer: 'Είμαι',
              wordBank: ['Είμαι', 'Είσαι', 'Είναι', 'Πού'],
            },
            {
              id: 'u2-l4-ex4',
              type: 'match_pairs',
              pairs: [
                { greek: 'Ελλάδα', translation: { en: 'Greece', es: 'Grecia', fr: 'Grèce' } },
                { greek: 'Αγγλία', translation: { en: 'England', es: 'Inglaterra', fr: 'Angleterre' } },
                { greek: 'Αμερική', translation: { en: 'America', es: 'América', fr: 'Amérique' } },
                { greek: 'Είμαι από', translation: { en: 'I am from', es: 'Soy de', fr: 'Je suis de' } },
              ],
            },
            {
              id: 'u2-l4-ex5',
              type: 'listening',
              greekText: 'Είμαι από την Ελλάδα',
              prompt: {
                en: 'What does this sentence mean?',
                es: '¿Qué significa esta oración?',
                fr: 'Que signifie cette phrase ?',
              },
              options: [
                { en: 'I am from England', es: 'Soy de Inglaterra', fr: 'Je suis d\'Angleterre' },
                { en: 'I am from America', es: 'Soy de América', fr: 'Je suis d\'Amérique' },
                { en: 'I am from Greece', es: 'Soy de Grecia', fr: 'Je suis de Grèce' },
                { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où viens-tu ?' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 5: How Do You Feel?
        {
          id: 'u2-l5',
          unitId: 'unit-2',
          order: 5,
          title: {
            en: 'How Do You Feel?',
            es: '¿Cómo Te Sientes?',
            fr: 'Comment Vous Sentez-Vous ?',
          },
          description: {
            en: 'Learn to express feelings and emotions',
            es: 'Aprende a expresar sentimientos y emociones',
            fr: 'Apprenez à exprimer des sentiments et émotions',
          },
          vocabulary: [
            {
              greek: 'Είμαι καλά',
              transliteration: 'íme kalá',
              translation: { en: 'I am fine', es: 'Estoy bien', fr: 'Je vais bien' },
              exampleSentence: {
                en: 'Είμαι καλά, ευχαριστώ. - I am fine, thank you.',
                es: 'Είμαι καλά, ευχαριστώ. - Estoy bien, gracias.',
                fr: 'Είμαι καλά, ευχαριστώ. - Je vais bien, merci.',
              },
            },
            {
              greek: 'κουρασμένος',
              transliteration: 'kurazménos',
              translation: { en: 'tired (male)', es: 'cansado', fr: 'fatigué' },
            },
            {
              greek: 'χαρούμενος',
              transliteration: 'harúmenos',
              translation: { en: 'happy (male)', es: 'feliz / contento', fr: 'heureux / content' },
            },
            {
              greek: 'λυπημένος',
              transliteration: 'lipiménos',
              translation: { en: 'sad (male)', es: 'triste', fr: 'triste' },
            },
            {
              greek: 'Πώς είσαι;',
              transliteration: 'pos íse?',
              translation: { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment es-tu ?' },
            },
          ],
          exercises: [
            {
              id: 'u2-l5-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What does "χαρούμενος" mean?',
                es: '¿Qué significa "χαρούμενος"?',
                fr: 'Que signifie "χαρούμενος" ?',
              },
              greekPrompt: 'χαρούμενος',
              options: [
                { en: 'tired', es: 'cansado', fr: 'fatigué' },
                { en: 'sad', es: 'triste', fr: 'triste' },
                { en: 'happy', es: 'feliz', fr: 'heureux' },
                { en: 'fine', es: 'bien', fr: 'bien' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u2-l5-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "I am tired"',
                es: 'Traduce al griego: "Estoy cansado"',
                fr: 'Traduisez en grec : "Je suis fatigué"',
              },
              greekText: 'Είμαι κουρασμένος',
              direction: 'to_greek',
              acceptedAnswers: ['Είμαι κουρασμένος', 'είμαι κουρασμένος', 'Eimai kourasmenos'],
            },
            {
              id: 'u2-l5-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'χαρούμενος', translation: { en: 'happy', es: 'feliz', fr: 'heureux' } },
                { greek: 'κουρασμένος', translation: { en: 'tired', es: 'cansado', fr: 'fatigué' } },
                { greek: 'λυπημένος', translation: { en: 'sad', es: 'triste', fr: 'triste' } },
                { greek: 'καλά', translation: { en: 'fine', es: 'bien', fr: 'bien' } },
              ],
            },
            {
              id: 'u2-l5-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: Είμαι ___ means "I am sad"',
                es: 'Completa: Είμαι ___ significa "Estoy triste"',
                fr: 'Complétez : Είμαι ___ signifie "Je suis triste"',
              },
              greekSentence: 'Είμαι ___',
              answer: 'λυπημένος',
              wordBank: ['χαρούμενος', 'κουρασμένος', 'λυπημένος', 'καλά'],
            },
            {
              id: 'u2-l5-ex5',
              type: 'listening',
              greekText: 'Είμαι κουρασμένος',
              prompt: {
                en: 'What does this sentence mean?',
                es: '¿Qué significa esta oración?',
                fr: 'Que signifie cette phrase ?',
              },
              options: [
                { en: 'I am happy', es: 'Estoy feliz', fr: 'Je suis heureux' },
                { en: 'I am tired', es: 'Estoy cansado', fr: 'Je suis fatigué' },
                { en: 'I am sad', es: 'Estoy triste', fr: 'Je suis triste' },
                { en: 'I am fine', es: 'Estoy bien', fr: 'Je vais bien' },
              ],
              correctIndex: 1,
            },
          ],
        },
      ],
    },

    // ============================================
    // Unit 3: Numbers, Colors & Days
    // ============================================
    {
      id: 'unit-3',
      courseId: 'modern-greek',
      order: 3,
      title: {
        en: 'Numbers, Colors & Days',
        es: 'Números, Colores y Días',
        fr: 'Nombres, Couleurs et Jours',
      },
      description: {
        en: 'Learn numbers, colors, and days of the week in Greek',
        es: 'Aprende números, colores y días de la semana en griego',
        fr: 'Apprenez les nombres, les couleurs et les jours de la semaine en grec',
      },
      lessons: [
        // Lesson 1: Numbers 6-10
        {
          id: 'u3-l1',
          unitId: 'unit-3',
          order: 1,
          title: {
            en: 'Numbers 6-10',
            es: 'Números 6-10',
            fr: 'Nombres 6-10',
          },
          description: {
            en: 'Continue counting from six to ten in Greek',
            es: 'Continúa contando del seis al diez en griego',
            fr: 'Continuez à compter de six à dix en grec',
          },
          vocabulary: [
            {
              greek: 'έξι',
              transliteration: 'éxi',
              translation: { en: 'six', es: 'seis', fr: 'six' },
            },
            {
              greek: 'εφτά',
              transliteration: 'eftá',
              translation: { en: 'seven', es: 'siete', fr: 'sept' },
            },
            {
              greek: 'οχτώ',
              transliteration: 'ohtó',
              translation: { en: 'eight', es: 'ocho', fr: 'huit' },
            },
            {
              greek: 'εννιά',
              transliteration: 'eniá',
              translation: { en: 'nine', es: 'nueve', fr: 'neuf' },
            },
            {
              greek: 'δέκα',
              transliteration: 'déka',
              translation: { en: 'ten', es: 'diez', fr: 'dix' },
            },
          ],
          exercises: [
            {
              id: 'u3-l1-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "eight" in Greek?',
                es: '¿Cómo se dice "ocho" en griego?',
                fr: 'Comment dit-on "huit" en grec ?',
              },
              options: [
                { en: 'έξι', es: 'έξι', fr: 'έξι' },
                { en: 'εφτά', es: 'εφτά', fr: 'εφτά' },
                { en: 'οχτώ', es: 'οχτώ', fr: 'οχτώ' },
                { en: 'εννιά', es: 'εννιά', fr: 'εννιά' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u3-l1-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "δέκα"',
                es: 'Traduce del griego: "δέκα"',
                fr: 'Traduisez du grec : "δέκα"',
              },
              greekText: 'δέκα',
              direction: 'from_greek',
              acceptedAnswers: ['ten', 'diez', 'dix', '10'],
            },
            {
              id: 'u3-l1-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'έξι', translation: { en: 'six', es: 'seis', fr: 'six' } },
                { greek: 'εφτά', translation: { en: 'seven', es: 'siete', fr: 'sept' } },
                { greek: 'οχτώ', translation: { en: 'eight', es: 'ocho', fr: 'huit' } },
                { greek: 'εννιά', translation: { en: 'nine', es: 'nueve', fr: 'neuf' } },
                { greek: 'δέκα', translation: { en: 'ten', es: 'diez', fr: 'dix' } },
              ],
            },
            {
              id: 'u3-l1-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Fill in: έξι, εφτά, ___, εννιά',
                es: 'Completa: έξι, εφτά, ___, εννιά',
                fr: 'Complétez : έξι, εφτά, ___, εννιά',
              },
              greekSentence: 'έξι, εφτά, ___, εννιά',
              answer: 'οχτώ',
              wordBank: ['δέκα', 'οχτώ', 'πέντε', 'εννιά'],
            },
            {
              id: 'u3-l1-ex5',
              type: 'listening',
              greekText: 'εννιά',
              prompt: {
                en: 'What number did you hear?',
                es: '¿Qué número escuchaste?',
                fr: 'Quel nombre avez-vous entendu ?',
              },
              options: [
                { en: 'six (έξι)', es: 'seis (έξι)', fr: 'six (έξι)' },
                { en: 'seven (εφτά)', es: 'siete (εφτά)', fr: 'sept (εφτά)' },
                { en: 'nine (εννιά)', es: 'nueve (εννιά)', fr: 'neuf (εννιά)' },
                { en: 'ten (δέκα)', es: 'diez (δέκα)', fr: 'dix (δέκα)' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 2: Numbers 11-20
        {
          id: 'u3-l2',
          unitId: 'unit-3',
          order: 2,
          title: {
            en: 'Numbers 11-20',
            es: 'Números 11-20',
            fr: 'Nombres 11-20',
          },
          description: {
            en: 'Learn the teen numbers in Greek',
            es: 'Aprende los números del once al veinte en griego',
            fr: 'Apprenez les nombres de onze à vingt en grec',
          },
          vocabulary: [
            {
              greek: 'έντεκα',
              transliteration: 'éndeka',
              translation: { en: 'eleven', es: 'once', fr: 'onze' },
            },
            {
              greek: 'δώδεκα',
              transliteration: 'dódeka',
              translation: { en: 'twelve', es: 'doce', fr: 'douze' },
            },
            {
              greek: 'δεκατρία',
              transliteration: 'dekatría',
              translation: { en: 'thirteen', es: 'trece', fr: 'treize' },
            },
            {
              greek: 'δεκαπέντε',
              transliteration: 'dekapénde',
              translation: { en: 'fifteen', es: 'quince', fr: 'quinze' },
            },
            {
              greek: 'είκοσι',
              transliteration: 'íkosi',
              translation: { en: 'twenty', es: 'veinte', fr: 'vingt' },
            },
          ],
          exercises: [
            {
              id: 'u3-l2-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "twelve" in Greek?',
                es: '¿Cómo se dice "doce" en griego?',
                fr: 'Comment dit-on "douze" en grec ?',
              },
              options: [
                { en: 'έντεκα', es: 'έντεκα', fr: 'έντεκα' },
                { en: 'δώδεκα', es: 'δώδεκα', fr: 'δώδεκα' },
                { en: 'δεκατρία', es: 'δεκατρία', fr: 'δεκατρία' },
                { en: 'είκοσι', es: 'είκοσι', fr: 'είκοσι' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u3-l2-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "είκοσι"',
                es: 'Traduce del griego: "είκοσι"',
                fr: 'Traduisez du grec : "είκοσι"',
              },
              greekText: 'είκοσι',
              direction: 'from_greek',
              acceptedAnswers: ['twenty', 'veinte', 'vingt', '20'],
            },
            {
              id: 'u3-l2-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'έντεκα', translation: { en: 'eleven', es: 'once', fr: 'onze' } },
                { greek: 'δώδεκα', translation: { en: 'twelve', es: 'doce', fr: 'douze' } },
                { greek: 'δεκαπέντε', translation: { en: 'fifteen', es: 'quince', fr: 'quinze' } },
                { greek: 'είκοσι', translation: { en: 'twenty', es: 'veinte', fr: 'vingt' } },
              ],
            },
            {
              id: 'u3-l2-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Fill in: έντεκα, δώδεκα, ___',
                es: 'Completa: έντεκα, δώδεκα, ___',
                fr: 'Complétez : έντεκα, δώδεκα, ___',
              },
              greekSentence: 'έντεκα, δώδεκα, ___',
              answer: 'δεκατρία',
              wordBank: ['δεκαπέντε', 'δεκατρία', 'είκοσι', 'δέκα'],
            },
            {
              id: 'u3-l2-ex5',
              type: 'listening',
              greekText: 'δεκαπέντε',
              prompt: {
                en: 'What number did you hear?',
                es: '¿Qué número escuchaste?',
                fr: 'Quel nombre avez-vous entendu ?',
              },
              options: [
                { en: 'eleven (έντεκα)', es: 'once (έντεκα)', fr: 'onze (έντεκα)' },
                { en: 'thirteen (δεκατρία)', es: 'trece (δεκατρία)', fr: 'treize (δεκατρία)' },
                { en: 'fifteen (δεκαπέντε)', es: 'quince (δεκαπέντε)', fr: 'quinze (δεκαπέντε)' },
                { en: 'twenty (είκοσι)', es: 'veinte (είκοσι)', fr: 'vingt (είκοσι)' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 3: Basic Colors
        {
          id: 'u3-l3',
          unitId: 'unit-3',
          order: 3,
          title: {
            en: 'Basic Colors',
            es: 'Colores Básicos',
            fr: 'Couleurs de Base',
          },
          description: {
            en: 'Learn the names of common colors in Greek',
            es: 'Aprende los nombres de los colores comunes en griego',
            fr: 'Apprenez les noms des couleurs courantes en grec',
          },
          vocabulary: [
            {
              greek: 'κόκκινο',
              transliteration: 'kókino',
              translation: { en: 'red', es: 'rojo', fr: 'rouge' },
              exampleSentence: {
                en: 'Το κόκκινο αυτοκίνητο. - The red car.',
                es: 'Το κόκκινο αυτοκίνητο. - El coche rojo.',
                fr: 'Το κόκκινο αυτοκίνητο. - La voiture rouge.',
              },
            },
            {
              greek: 'μπλε',
              transliteration: 'ble',
              translation: { en: 'blue', es: 'azul', fr: 'bleu' },
            },
            {
              greek: 'πράσινο',
              transliteration: 'prásino',
              translation: { en: 'green', es: 'verde', fr: 'vert' },
            },
            {
              greek: 'άσπρο',
              transliteration: 'áspro',
              translation: { en: 'white', es: 'blanco', fr: 'blanc' },
            },
            {
              greek: 'μαύρο',
              transliteration: 'mávro',
              translation: { en: 'black', es: 'negro', fr: 'noir' },
            },
          ],
          exercises: [
            {
              id: 'u3-l3-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "green" in Greek?',
                es: '¿Cómo se dice "verde" en griego?',
                fr: 'Comment dit-on "vert" en grec ?',
              },
              options: [
                { en: 'κόκκινο', es: 'κόκκινο', fr: 'κόκκινο' },
                { en: 'μπλε', es: 'μπλε', fr: 'μπλε' },
                { en: 'πράσινο', es: 'πράσινο', fr: 'πράσινο' },
                { en: 'μαύρο', es: 'μαύρο', fr: 'μαύρο' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u3-l3-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "μπλε"',
                es: 'Traduce del griego: "μπλε"',
                fr: 'Traduisez du grec : "μπλε"',
              },
              greekText: 'μπλε',
              direction: 'from_greek',
              acceptedAnswers: ['blue', 'azul', 'bleu'],
            },
            {
              id: 'u3-l3-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'κόκκινο', translation: { en: 'red', es: 'rojo', fr: 'rouge' } },
                { greek: 'μπλε', translation: { en: 'blue', es: 'azul', fr: 'bleu' } },
                { greek: 'πράσινο', translation: { en: 'green', es: 'verde', fr: 'vert' } },
                { greek: 'άσπρο', translation: { en: 'white', es: 'blanco', fr: 'blanc' } },
                { greek: 'μαύρο', translation: { en: 'black', es: 'negro', fr: 'noir' } },
              ],
            },
            {
              id: 'u3-l3-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ means "white" in Greek',
                es: 'Completa: ___ significa "blanco" en griego',
                fr: 'Complétez : ___ signifie "blanc" en grec',
              },
              greekSentence: '___',
              answer: 'άσπρο',
              wordBank: ['κόκκινο', 'μπλε', 'άσπρο', 'μαύρο'],
            },
            {
              id: 'u3-l3-ex5',
              type: 'listening',
              greekText: 'κόκκινο',
              prompt: {
                en: 'What color did you hear?',
                es: '¿Qué color escuchaste?',
                fr: 'Quelle couleur avez-vous entendue ?',
              },
              options: [
                { en: 'red (κόκκινο)', es: 'rojo (κόκκινο)', fr: 'rouge (κόκκινο)' },
                { en: 'blue (μπλε)', es: 'azul (μπλε)', fr: 'bleu (μπλε)' },
                { en: 'green (πράσινο)', es: 'verde (πράσινο)', fr: 'vert (πράσινο)' },
                { en: 'black (μαύρο)', es: 'negro (μαύρο)', fr: 'noir (μαύρο)' },
              ],
              correctIndex: 0,
            },
          ],
        },

        // Lesson 4: More Colors
        {
          id: 'u3-l4',
          unitId: 'unit-3',
          order: 4,
          title: {
            en: 'More Colors',
            es: 'Más Colores',
            fr: 'Plus de Couleurs',
          },
          description: {
            en: 'Expand your color vocabulary in Greek',
            es: 'Amplía tu vocabulario de colores en griego',
            fr: 'Élargissez votre vocabulaire de couleurs en grec',
          },
          vocabulary: [
            {
              greek: 'κίτρινο',
              transliteration: 'kítrino',
              translation: { en: 'yellow', es: 'amarillo', fr: 'jaune' },
            },
            {
              greek: 'πορτοκαλί',
              transliteration: 'portokalí',
              translation: { en: 'orange', es: 'naranja', fr: 'orange' },
            },
            {
              greek: 'ροζ',
              transliteration: 'roz',
              translation: { en: 'pink', es: 'rosa', fr: 'rose' },
            },
            {
              greek: 'γκρι',
              transliteration: 'gri',
              translation: { en: 'gray', es: 'gris', fr: 'gris' },
            },
            {
              greek: 'καφέ',
              transliteration: 'kafé',
              translation: { en: 'brown', es: 'marrón', fr: 'marron' },
            },
          ],
          exercises: [
            {
              id: 'u3-l4-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "yellow" in Greek?',
                es: '¿Cómo se dice "amarillo" en griego?',
                fr: 'Comment dit-on "jaune" en grec ?',
              },
              options: [
                { en: 'πορτοκαλί', es: 'πορτοκαλί', fr: 'πορτοκαλί' },
                { en: 'κίτρινο', es: 'κίτρινο', fr: 'κίτρινο' },
                { en: 'ροζ', es: 'ροζ', fr: 'ροζ' },
                { en: 'καφέ', es: 'καφέ', fr: 'καφέ' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u3-l4-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "πορτοκαλί"',
                es: 'Traduce del griego: "πορτοκαλί"',
                fr: 'Traduisez du grec : "πορτοκαλί"',
              },
              greekText: 'πορτοκαλί',
              direction: 'from_greek',
              acceptedAnswers: ['orange', 'naranja'],
            },
            {
              id: 'u3-l4-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'κίτρινο', translation: { en: 'yellow', es: 'amarillo', fr: 'jaune' } },
                { greek: 'πορτοκαλί', translation: { en: 'orange', es: 'naranja', fr: 'orange' } },
                { greek: 'ροζ', translation: { en: 'pink', es: 'rosa', fr: 'rose' } },
                { greek: 'γκρι', translation: { en: 'gray', es: 'gris', fr: 'gris' } },
                { greek: 'καφέ', translation: { en: 'brown', es: 'marrón', fr: 'marron' } },
              ],
            },
            {
              id: 'u3-l4-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ means "pink" in Greek',
                es: 'Completa: ___ significa "rosa" en griego',
                fr: 'Complétez : ___ signifie "rose" en grec',
              },
              greekSentence: '___',
              answer: 'ροζ',
              wordBank: ['γκρι', 'ροζ', 'καφέ', 'κίτρινο'],
            },
            {
              id: 'u3-l4-ex5',
              type: 'listening',
              greekText: 'καφέ',
              prompt: {
                en: 'What color did you hear?',
                es: '¿Qué color escuchaste?',
                fr: 'Quelle couleur avez-vous entendue ?',
              },
              options: [
                { en: 'yellow (κίτρινο)', es: 'amarillo (κίτρινο)', fr: 'jaune (κίτρινο)' },
                { en: 'gray (γκρι)', es: 'gris (γκρι)', fr: 'gris (γκρι)' },
                { en: 'brown (καφέ)', es: 'marrón (καφέ)', fr: 'marron (καφέ)' },
                { en: 'orange (πορτοκαλί)', es: 'naranja (πορτοκαλί)', fr: 'orange (πορτοκαλί)' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 5: Days of the Week
        {
          id: 'u3-l5',
          unitId: 'unit-3',
          order: 5,
          title: {
            en: 'Days of the Week',
            es: 'Días de la Semana',
            fr: 'Jours de la Semaine',
          },
          description: {
            en: 'Learn the days of the week in Greek',
            es: 'Aprende los días de la semana en griego',
            fr: 'Apprenez les jours de la semaine en grec',
          },
          vocabulary: [
            {
              greek: 'Δευτέρα',
              transliteration: 'deftéra',
              translation: { en: 'Monday', es: 'lunes', fr: 'lundi' },
              exampleSentence: {
                en: 'Σήμερα είναι Δευτέρα. - Today is Monday.',
                es: 'Σήμερα είναι Δευτέρα. - Hoy es lunes.',
                fr: 'Σήμερα είναι Δευτέρα. - Aujourd\'hui c\'est lundi.',
              },
            },
            {
              greek: 'Τρίτη',
              transliteration: 'tríti',
              translation: { en: 'Tuesday', es: 'martes', fr: 'mardi' },
            },
            {
              greek: 'Τετάρτη',
              transliteration: 'tetárti',
              translation: { en: 'Wednesday', es: 'miércoles', fr: 'mercredi' },
            },
            {
              greek: 'Πέμπτη',
              transliteration: 'pémpti',
              translation: { en: 'Thursday', es: 'jueves', fr: 'jeudi' },
            },
            {
              greek: 'Παρασκευή',
              transliteration: 'paraskeví',
              translation: { en: 'Friday', es: 'viernes', fr: 'vendredi' },
            },
          ],
          exercises: [
            {
              id: 'u3-l5-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "Wednesday" in Greek?',
                es: '¿Cómo se dice "miércoles" en griego?',
                fr: 'Comment dit-on "mercredi" en grec ?',
              },
              options: [
                { en: 'Δευτέρα', es: 'Δευτέρα', fr: 'Δευτέρα' },
                { en: 'Τρίτη', es: 'Τρίτη', fr: 'Τρίτη' },
                { en: 'Τετάρτη', es: 'Τετάρτη', fr: 'Τετάρτη' },
                { en: 'Πέμπτη', es: 'Πέμπτη', fr: 'Πέμπτη' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u3-l5-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "Παρασκευή"',
                es: 'Traduce del griego: "Παρασκευή"',
                fr: 'Traduisez du grec : "Παρασκευή"',
              },
              greekText: 'Παρασκευή',
              direction: 'from_greek',
              acceptedAnswers: ['Friday', 'viernes', 'vendredi'],
            },
            {
              id: 'u3-l5-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Δευτέρα', translation: { en: 'Monday', es: 'lunes', fr: 'lundi' } },
                { greek: 'Τρίτη', translation: { en: 'Tuesday', es: 'martes', fr: 'mardi' } },
                { greek: 'Τετάρτη', translation: { en: 'Wednesday', es: 'miércoles', fr: 'mercredi' } },
                { greek: 'Πέμπτη', translation: { en: 'Thursday', es: 'jueves', fr: 'jeudi' } },
                { greek: 'Παρασκευή', translation: { en: 'Friday', es: 'viernes', fr: 'vendredi' } },
              ],
            },
            {
              id: 'u3-l5-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Fill in: Δευτέρα, ___, Τετάρτη',
                es: 'Completa: Δευτέρα, ___, Τετάρτη',
                fr: 'Complétez : Δευτέρα, ___, Τετάρτη',
              },
              greekSentence: 'Δευτέρα, ___, Τετάρτη',
              answer: 'Τρίτη',
              wordBank: ['Πέμπτη', 'Τρίτη', 'Παρασκευή', 'Δευτέρα'],
            },
            {
              id: 'u3-l5-ex5',
              type: 'listening',
              greekText: 'Πέμπτη',
              prompt: {
                en: 'What day of the week did you hear?',
                es: '¿Qué día de la semana escuchaste?',
                fr: 'Quel jour de la semaine avez-vous entendu ?',
              },
              options: [
                { en: 'Monday (Δευτέρα)', es: 'lunes (Δευτέρα)', fr: 'lundi (Δευτέρα)' },
                { en: 'Tuesday (Τρίτη)', es: 'martes (Τρίτη)', fr: 'mardi (Τρίτη)' },
                { en: 'Thursday (Πέμπτη)', es: 'jueves (Πέμπτη)', fr: 'jeudi (Πέμπτη)' },
                { en: 'Friday (Παρασκευή)', es: 'viernes (Παρασκευή)', fr: 'vendredi (Παρασκευή)' },
              ],
              correctIndex: 2,
            },
          ],
        },
      ],
    },

    // ============================================
    // Unit 4: Food & Ordering
    // ============================================
    {
      id: 'unit-4',
      courseId: 'modern-greek',
      order: 4,
      title: {
        en: 'Food & Ordering',
        es: 'Comida y Pedidos',
        fr: 'Nourriture et Commandes',
      },
      description: {
        en: 'Learn food vocabulary and how to order at a restaurant',
        es: 'Aprende vocabulario de comida y cómo pedir en un restaurante',
        fr: 'Apprenez le vocabulaire de la nourriture et comment commander au restaurant',
      },
      lessons: [
        // Lesson 1: Common Foods
        {
          id: 'u4-l1',
          unitId: 'unit-4',
          order: 1,
          title: {
            en: 'Common Foods',
            es: 'Alimentos Comunes',
            fr: 'Aliments Courants',
          },
          description: {
            en: 'Learn the names of common foods in Greek',
            es: 'Aprende los nombres de alimentos comunes en griego',
            fr: 'Apprenez les noms des aliments courants en grec',
          },
          vocabulary: [
            {
              greek: 'ψωμί',
              transliteration: 'psomí',
              translation: { en: 'bread', es: 'pan', fr: 'pain' },
              exampleSentence: {
                en: 'Θέλω ψωμί. - I want bread.',
                es: 'Θέλω ψωμί. - Quiero pan.',
                fr: 'Θέλω ψωμί. - Je veux du pain.',
              },
            },
            {
              greek: 'νερό',
              transliteration: 'neró',
              translation: { en: 'water', es: 'agua', fr: 'eau' },
            },
            {
              greek: 'κρέας',
              transliteration: 'kréas',
              translation: { en: 'meat', es: 'carne', fr: 'viande' },
            },
            {
              greek: 'σαλάτα',
              transliteration: 'saláta',
              translation: { en: 'salad', es: 'ensalada', fr: 'salade' },
            },
            {
              greek: 'τυρί',
              transliteration: 'tirí',
              translation: { en: 'cheese', es: 'queso', fr: 'fromage' },
            },
          ],
          exercises: [
            {
              id: 'u4-l1-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "bread" in Greek?',
                es: '¿Cómo se dice "pan" en griego?',
                fr: 'Comment dit-on "pain" en grec ?',
              },
              options: [
                { en: 'νερό', es: 'νερό', fr: 'νερό' },
                { en: 'ψωμί', es: 'ψωμί', fr: 'ψωμί' },
                { en: 'κρέας', es: 'κρέας', fr: 'κρέας' },
                { en: 'τυρί', es: 'τυρί', fr: 'τυρί' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u4-l1-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "σαλάτα"',
                es: 'Traduce del griego: "σαλάτα"',
                fr: 'Traduisez du grec : "σαλάτα"',
              },
              greekText: 'σαλάτα',
              direction: 'from_greek',
              acceptedAnswers: ['salad', 'ensalada', 'salade'],
            },
            {
              id: 'u4-l1-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'ψωμί', translation: { en: 'bread', es: 'pan', fr: 'pain' } },
                { greek: 'νερό', translation: { en: 'water', es: 'agua', fr: 'eau' } },
                { greek: 'κρέας', translation: { en: 'meat', es: 'carne', fr: 'viande' } },
                { greek: 'σαλάτα', translation: { en: 'salad', es: 'ensalada', fr: 'salade' } },
                { greek: 'τυρί', translation: { en: 'cheese', es: 'queso', fr: 'fromage' } },
              ],
            },
            {
              id: 'u4-l1-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ means "water" in Greek',
                es: 'Completa: ___ significa "agua" en griego',
                fr: 'Complétez : ___ signifie "eau" en grec',
              },
              greekSentence: '___',
              answer: 'νερό',
              wordBank: ['ψωμί', 'νερό', 'τυρί', 'κρέας'],
            },
            {
              id: 'u4-l1-ex5',
              type: 'listening',
              greekText: 'τυρί',
              prompt: {
                en: 'What food did you hear?',
                es: '¿Qué alimento escuchaste?',
                fr: 'Quel aliment avez-vous entendu ?',
              },
              options: [
                { en: 'bread (ψωμί)', es: 'pan (ψωμί)', fr: 'pain (ψωμί)' },
                { en: 'meat (κρέας)', es: 'carne (κρέας)', fr: 'viande (κρέας)' },
                { en: 'cheese (τυρί)', es: 'queso (τυρί)', fr: 'fromage (τυρί)' },
                { en: 'salad (σαλάτα)', es: 'ensalada (σαλάτα)', fr: 'salade (σαλάτα)' },
              ],
              correctIndex: 2,
            },
          ],
        },

        // Lesson 2: Drinks
        {
          id: 'u4-l2',
          unitId: 'unit-4',
          order: 2,
          title: {
            en: 'Drinks',
            es: 'Bebidas',
            fr: 'Boissons',
          },
          description: {
            en: 'Learn the names of common drinks in Greek',
            es: 'Aprende los nombres de bebidas comunes en griego',
            fr: 'Apprenez les noms des boissons courantes en grec',
          },
          vocabulary: [
            {
              greek: 'καφές',
              transliteration: 'kafés',
              translation: { en: 'coffee', es: 'café', fr: 'café' },
              exampleSentence: {
                en: 'Ένα καφέ, παρακαλώ. - A coffee, please.',
                es: 'Ένα καφέ, παρακαλώ. - Un café, por favor.',
                fr: 'Ένα καφέ, παρακαλώ. - Un café, s\'il vous plaît.',
              },
            },
            {
              greek: 'τσάι',
              transliteration: 'tsái',
              translation: { en: 'tea', es: 'té', fr: 'thé' },
            },
            {
              greek: 'γάλα',
              transliteration: 'gála',
              translation: { en: 'milk', es: 'leche', fr: 'lait' },
            },
            {
              greek: 'χυμός',
              transliteration: 'himós',
              translation: { en: 'juice', es: 'jugo / zumo', fr: 'jus' },
            },
            {
              greek: 'κρασί',
              transliteration: 'krasí',
              translation: { en: 'wine', es: 'vino', fr: 'vin' },
            },
          ],
          exercises: [
            {
              id: 'u4-l2-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "coffee" in Greek?',
                es: '¿Cómo se dice "café" en griego?',
                fr: 'Comment dit-on "café" en grec ?',
              },
              options: [
                { en: 'τσάι', es: 'τσάι', fr: 'τσάι' },
                { en: 'καφές', es: 'καφές', fr: 'καφές' },
                { en: 'γάλα', es: 'γάλα', fr: 'γάλα' },
                { en: 'κρασί', es: 'κρασί', fr: 'κρασί' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u4-l2-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "κρασί"',
                es: 'Traduce del griego: "κρασί"',
                fr: 'Traduisez du grec : "κρασί"',
              },
              greekText: 'κρασί',
              direction: 'from_greek',
              acceptedAnswers: ['wine', 'vino', 'vin'],
            },
            {
              id: 'u4-l2-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'καφές', translation: { en: 'coffee', es: 'café', fr: 'café' } },
                { greek: 'τσάι', translation: { en: 'tea', es: 'té', fr: 'thé' } },
                { greek: 'γάλα', translation: { en: 'milk', es: 'leche', fr: 'lait' } },
                { greek: 'χυμός', translation: { en: 'juice', es: 'jugo', fr: 'jus' } },
                { greek: 'κρασί', translation: { en: 'wine', es: 'vino', fr: 'vin' } },
              ],
            },
            {
              id: 'u4-l2-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ means "tea" in Greek',
                es: 'Completa: ___ significa "té" en griego',
                fr: 'Complétez : ___ signifie "thé" en grec',
              },
              greekSentence: '___',
              answer: 'τσάι',
              wordBank: ['καφές', 'τσάι', 'γάλα', 'κρασί'],
            },
            {
              id: 'u4-l2-ex5',
              type: 'listening',
              greekText: 'γάλα',
              prompt: {
                en: 'What drink did you hear?',
                es: '¿Qué bebida escuchaste?',
                fr: 'Quelle boisson avez-vous entendue ?',
              },
              options: [
                { en: 'coffee (καφές)', es: 'café (καφές)', fr: 'café (καφές)' },
                { en: 'milk (γάλα)', es: 'leche (γάλα)', fr: 'lait (γάλα)' },
                { en: 'juice (χυμός)', es: 'jugo (χυμός)', fr: 'jus (χυμός)' },
                { en: 'wine (κρασί)', es: 'vino (κρασί)', fr: 'vin (κρασί)' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 3: At the Restaurant
        {
          id: 'u4-l3',
          unitId: 'unit-4',
          order: 3,
          title: {
            en: 'At the Restaurant',
            es: 'En el Restaurante',
            fr: 'Au Restaurant',
          },
          description: {
            en: 'Learn essential phrases for ordering at a restaurant',
            es: 'Aprende frases esenciales para pedir en un restaurante',
            fr: 'Apprenez les phrases essentielles pour commander au restaurant',
          },
          vocabulary: [
            {
              greek: 'Θα ήθελα',
              transliteration: 'tha íthela',
              translation: { en: 'I would like', es: 'Me gustaría / Quisiera', fr: 'Je voudrais' },
              exampleSentence: {
                en: 'Θα ήθελα ένα καφέ. - I would like a coffee.',
                es: 'Θα ήθελα ένα καφέ. - Me gustaría un café.',
                fr: 'Θα ήθελα ένα καφέ. - Je voudrais un café.',
              },
            },
            {
              greek: 'Τον λογαριασμό',
              transliteration: 'ton logariazmó',
              translation: { en: 'The bill / check', es: 'La cuenta', fr: 'L\'addition' },
            },
            {
              greek: 'Το μενού',
              transliteration: 'to menú',
              translation: { en: 'The menu', es: 'El menú', fr: 'Le menu' },
            },
            {
              greek: 'Πεινάω',
              transliteration: 'pináo',
              translation: { en: 'I am hungry', es: 'Tengo hambre', fr: 'J\'ai faim' },
            },
            {
              greek: 'Διψάω',
              transliteration: 'dipsáo',
              translation: { en: 'I am thirsty', es: 'Tengo sed', fr: 'J\'ai soif' },
            },
          ],
          exercises: [
            {
              id: 'u4-l3-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you say "I would like" in Greek?',
                es: '¿Cómo se dice "Me gustaría" en griego?',
                fr: 'Comment dit-on "Je voudrais" en grec ?',
              },
              options: [
                { en: 'Πεινάω', es: 'Πεινάω', fr: 'Πεινάω' },
                { en: 'Θα ήθελα', es: 'Θα ήθελα', fr: 'Θα ήθελα' },
                { en: 'Διψάω', es: 'Διψάω', fr: 'Διψάω' },
                { en: 'Ευχαριστώ', es: 'Ευχαριστώ', fr: 'Ευχαριστώ' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u4-l3-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate from Greek: "Πεινάω"',
                es: 'Traduce del griego: "Πεινάω"',
                fr: 'Traduisez du grec : "Πεινάω"',
              },
              greekText: 'Πεινάω',
              direction: 'from_greek',
              acceptedAnswers: ['I am hungry', 'I\'m hungry', 'Tengo hambre', 'J\'ai faim'],
            },
            {
              id: 'u4-l3-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'Θα ήθελα', translation: { en: 'I would like', es: 'Me gustaría', fr: 'Je voudrais' } },
                { greek: 'Το μενού', translation: { en: 'The menu', es: 'El menú', fr: 'Le menu' } },
                { greek: 'Πεινάω', translation: { en: 'I am hungry', es: 'Tengo hambre', fr: 'J\'ai faim' } },
                { greek: 'Διψάω', translation: { en: 'I am thirsty', es: 'Tengo sed', fr: 'J\'ai soif' } },
              ],
            },
            {
              id: 'u4-l3-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: Θα ___ ένα νερό means "I would like a water"',
                es: 'Completa: Θα ___ ένα νερό significa "Me gustaría un agua"',
                fr: 'Complétez : Θα ___ ένα νερό signifie "Je voudrais une eau"',
              },
              greekSentence: 'Θα ___ ένα νερό',
              answer: 'ήθελα',
              wordBank: ['ήθελα', 'θέλω', 'είναι', 'έχω'],
            },
            {
              id: 'u4-l3-ex5',
              type: 'listening',
              greekText: 'Τον λογαριασμό, παρακαλώ',
              prompt: {
                en: 'What is being requested?',
                es: '¿Qué se está pidiendo?',
                fr: 'Que demande-t-on ?',
              },
              options: [
                { en: 'The menu', es: 'El menú', fr: 'Le menu' },
                { en: 'The bill, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît' },
                { en: 'A coffee', es: 'Un café', fr: 'Un café' },
                { en: 'Water', es: 'Agua', fr: 'De l\'eau' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 4: Greek Dishes
        {
          id: 'u4-l4',
          unitId: 'unit-4',
          order: 4,
          title: {
            en: 'Greek Dishes',
            es: 'Platos Griegos',
            fr: 'Plats Grecs',
          },
          description: {
            en: 'Learn the names of popular Greek dishes',
            es: 'Aprende los nombres de platos griegos populares',
            fr: 'Apprenez les noms des plats grecs populaires',
          },
          vocabulary: [
            {
              greek: 'μουσακάς',
              transliteration: 'musakás',
              translation: { en: 'moussaka', es: 'musaka', fr: 'moussaka' },
              exampleSentence: {
                en: 'Ο μουσακάς είναι νόστιμος! - The moussaka is delicious!',
                es: 'Ο μουσακάς είναι νόστιμος! - ¡La musaka es deliciosa!',
                fr: 'Ο μουσακάς είναι νόστιμος! - La moussaka est délicieuse !',
              },
            },
            {
              greek: 'σουβλάκι',
              transliteration: 'suvláki',
              translation: { en: 'souvlaki (meat skewer)', es: 'souvlaki (brocheta)', fr: 'souvlaki (brochette)' },
            },
            {
              greek: 'χωριάτικη σαλάτα',
              transliteration: 'horiátiki saláta',
              translation: { en: 'Greek salad', es: 'ensalada griega', fr: 'salade grecque' },
            },
            {
              greek: 'γύρος',
              transliteration: 'yíros',
              translation: { en: 'gyros', es: 'gyros', fr: 'gyros' },
            },
            {
              greek: 'νόστιμο',
              transliteration: 'nóstimo',
              translation: { en: 'delicious', es: 'delicioso', fr: 'délicieux' },
            },
          ],
          exercises: [
            {
              id: 'u4-l4-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'What is "σουβλάκι" in English?',
                es: '¿Qué es "σουβλάκι" en español?',
                fr: 'Qu\'est-ce que "σουβλάκι" en français ?',
              },
              greekPrompt: 'σουβλάκι',
              options: [
                { en: 'moussaka', es: 'musaka', fr: 'moussaka' },
                { en: 'Greek salad', es: 'ensalada griega', fr: 'salade grecque' },
                { en: 'souvlaki (meat skewer)', es: 'souvlaki (brocheta)', fr: 'souvlaki (brochette)' },
                { en: 'gyros', es: 'gyros', fr: 'gyros' },
              ],
              correctIndex: 2,
            },
            {
              id: 'u4-l4-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "Greek salad"',
                es: 'Traduce al griego: "ensalada griega"',
                fr: 'Traduisez en grec : "salade grecque"',
              },
              greekText: 'χωριάτικη σαλάτα',
              direction: 'to_greek',
              acceptedAnswers: ['χωριάτικη σαλάτα', 'horiatiki salata', 'horiátiki saláta'],
            },
            {
              id: 'u4-l4-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'μουσακάς', translation: { en: 'moussaka', es: 'musaka', fr: 'moussaka' } },
                { greek: 'σουβλάκι', translation: { en: 'souvlaki', es: 'souvlaki', fr: 'souvlaki' } },
                { greek: 'γύρος', translation: { en: 'gyros', es: 'gyros', fr: 'gyros' } },
                { greek: 'νόστιμο', translation: { en: 'delicious', es: 'delicioso', fr: 'délicieux' } },
              ],
            },
            {
              id: 'u4-l4-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: Ο μουσακάς είναι ___! means "The moussaka is delicious!"',
                es: 'Completa: Ο μουσακάς είναι ___! significa "¡La musaka es deliciosa!"',
                fr: 'Complétez : Ο μουσακάς είναι ___! signifie "La moussaka est délicieuse !"',
              },
              greekSentence: 'Ο μουσακάς είναι ___!',
              answer: 'νόστιμος',
              wordBank: ['νόστιμος', 'καλός', 'μεγάλος', 'κόκκινος'],
            },
            {
              id: 'u4-l4-ex5',
              type: 'listening',
              greekText: 'Θα ήθελα ένα σουβλάκι',
              prompt: {
                en: 'What is being ordered?',
                es: '¿Qué se está pidiendo?',
                fr: 'Que commande-t-on ?',
              },
              options: [
                { en: 'A moussaka', es: 'Una musaka', fr: 'Une moussaka' },
                { en: 'A souvlaki', es: 'Un souvlaki', fr: 'Un souvlaki' },
                { en: 'A Greek salad', es: 'Una ensalada griega', fr: 'Une salade grecque' },
                { en: 'A gyros', es: 'Un gyros', fr: 'Un gyros' },
              ],
              correctIndex: 1,
            },
          ],
        },

        // Lesson 5: Tastes & Preferences
        {
          id: 'u4-l5',
          unitId: 'unit-4',
          order: 5,
          title: {
            en: 'Tastes & Preferences',
            es: 'Gustos y Preferencias',
            fr: 'Goûts et Préférences',
          },
          description: {
            en: 'Learn to express food preferences and describe tastes',
            es: 'Aprende a expresar preferencias de comida y describir sabores',
            fr: 'Apprenez à exprimer vos préférences alimentaires et décrire les goûts',
          },
          vocabulary: [
            {
              greek: 'Μου αρέσει',
              transliteration: 'mu arési',
              translation: { en: 'I like', es: 'Me gusta', fr: 'J\'aime / Ça me plaît' },
              exampleSentence: {
                en: 'Μου αρέσει ο καφές. - I like coffee.',
                es: 'Μου αρέσει ο καφές. - Me gusta el café.',
                fr: 'Μου αρέσει ο καφές. - J\'aime le café.',
              },
            },
            {
              greek: 'Δεν μου αρέσει',
              transliteration: 'den mu arési',
              translation: { en: 'I don\'t like', es: 'No me gusta', fr: 'Je n\'aime pas' },
            },
            {
              greek: 'γλυκό',
              transliteration: 'glikó',
              translation: { en: 'sweet', es: 'dulce', fr: 'sucré / doux' },
            },
            {
              greek: 'αλμυρό',
              transliteration: 'almiró',
              translation: { en: 'salty', es: 'salado', fr: 'salé' },
            },
            {
              greek: 'πικάντικο',
              transliteration: 'pikándiko',
              translation: { en: 'spicy', es: 'picante', fr: 'épicé' },
            },
          ],
          exercises: [
            {
              id: 'u4-l5-ex1',
              type: 'multiple_choice',
              prompt: {
                en: 'How do you say "I like" in Greek?',
                es: '¿Cómo se dice "Me gusta" en griego?',
                fr: 'Comment dit-on "J\'aime" en grec ?',
              },
              options: [
                { en: 'Θα ήθελα', es: 'Θα ήθελα', fr: 'Θα ήθελα' },
                { en: 'Μου αρέσει', es: 'Μου αρέσει', fr: 'Μου αρέσει' },
                { en: 'Δεν μου αρέσει', es: 'Δεν μου αρέσει', fr: 'Δεν μου αρέσει' },
                { en: 'Πεινάω', es: 'Πεινάω', fr: 'Πεινάω' },
              ],
              correctIndex: 1,
            },
            {
              id: 'u4-l5-ex2',
              type: 'translation',
              prompt: {
                en: 'Translate to Greek: "I don\'t like"',
                es: 'Traduce al griego: "No me gusta"',
                fr: 'Traduisez en grec : "Je n\'aime pas"',
              },
              greekText: 'Δεν μου αρέσει',
              direction: 'to_greek',
              acceptedAnswers: ['Δεν μου αρέσει', 'δεν μου αρέσει', 'Den mou aresi'],
            },
            {
              id: 'u4-l5-ex3',
              type: 'match_pairs',
              pairs: [
                { greek: 'γλυκό', translation: { en: 'sweet', es: 'dulce', fr: 'sucré' } },
                { greek: 'αλμυρό', translation: { en: 'salty', es: 'salado', fr: 'salé' } },
                { greek: 'πικάντικο', translation: { en: 'spicy', es: 'picante', fr: 'épicé' } },
                { greek: 'Μου αρέσει', translation: { en: 'I like', es: 'Me gusta', fr: 'J\'aime' } },
              ],
            },
            {
              id: 'u4-l5-ex4',
              type: 'fill_blank',
              sentence: {
                en: 'Complete: ___ μου αρέσει means "I don\'t like"',
                es: 'Completa: ___ μου αρέσει significa "No me gusta"',
                fr: 'Complétez : ___ μου αρέσει signifie "Je n\'aime pas"',
              },
              greekSentence: '___ μου αρέσει',
              answer: 'Δεν',
              wordBank: ['Δεν', 'Και', 'Πολύ', 'Ναι'],
            },
            {
              id: 'u4-l5-ex5',
              type: 'listening',
              greekText: 'Μου αρέσει το σουβλάκι',
              prompt: {
                en: 'What is being said?',
                es: '¿Qué se está diciendo?',
                fr: 'Que dit-on ?',
              },
              options: [
                { en: 'I don\'t like souvlaki', es: 'No me gusta el souvlaki', fr: 'Je n\'aime pas le souvlaki' },
                { en: 'I like souvlaki', es: 'Me gusta el souvlaki', fr: 'J\'aime le souvlaki' },
                { en: 'I would like souvlaki', es: 'Me gustaría souvlaki', fr: 'Je voudrais un souvlaki' },
                { en: 'Souvlaki is delicious', es: 'El souvlaki es delicioso', fr: 'Le souvlaki est délicieux' },
              ],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
