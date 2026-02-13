export default {
  // Tab labels
  tabs: {
    home: 'Accueil',
    lessons: 'Leçons',
    review: 'Révision',
    profile: 'Profil',
  },
  // Home screen
  home: {
    title: 'Accueil',
    subtitle: 'Votre tableau de bord d\'apprentissage du grec',
    continueLesson: 'Continuer à Apprendre',
    allLessonsComplete: 'Toutes les leçons terminées !',
    noLessonsYet: 'Commencez votre première leçon !',
    level: 'Niveau',
    totalXp: 'XP Total',
    reviewDue: 'Révisions à Faire',
    dailyGoal: 'Objectif Quotidien',
    dailyGoalProgress: '{{completed}} sur {{goal}} leçons aujourd\'hui',
    dailyGoalComplete: 'Objectif quotidien atteint !',
  },
  // Lessons screen
  lessons: {
    title: 'Leçons',
    subtitle: 'Parcourir les unités et leçons',
  },
  // Review screen
  review: {
    title: 'Révision',
    subtitle: 'Pratiquez le vocabulaire avec la répétition espacée',
  },
  // Profile screen
  profile: {
    title: 'Profil',
    subtitle: 'Vos statistiques et paramètres',
    viewDesignSystem: 'Voir le Système de Design',
    changeLanguage: 'Changer de Langue',
    settings: 'Paramètres',
    referenceLanguage: 'Langue de référence',
  },
  // Language picker
  languagePicker: {
    title: 'Choisissez Votre Langue',
    subtitle: 'Sélectionnez la langue pour les instructions et traductions',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    confirm: 'Continuer',
  },
  // Design System / Component Showcase
  designSystem: {
    title: 'Système de Design',
  },
  // Alphabet module
  alphabet: {
    title: 'Alphabet Grec',
    subtitle: 'Apprenez les 24 lettres grecques',
    learnTab: 'Apprendre',
    quizTab: 'Quiz',
    letterDetail: 'Détail de la Lettre',
    uppercase: 'Majuscule',
    lowercase: 'Minuscule',
    name: 'Nom',
    pronunciation: 'Prononciation',
    transliteration: 'Translittération',
    example: 'Exemple',
    audioPlaceholder: 'Audio bientôt disponible',
    tapToHear: 'Appuyez pour écouter la prononciation',
    progress: 'Progrès',
    lettersLearned: '{{learned}} sur {{total}} lettres apprises',
    quizTitle: 'Quiz des Lettres',
    quizPrompt: 'Quelle est la prononciation de cette lettre ?',
    correct: 'Correct !',
    incorrect: 'Incorrect',
    theCorrectAnswer: 'La bonne réponse est :',
    next: 'Suivant',
    quizComplete: 'Quiz Terminé !',
    quizScore: 'Vous avez {{correct}} sur {{total}} correct',
    tryAgain: 'Réessayer',
    backToAlphabet: 'Retour à l\'Alphabet',
    startQuiz: 'Commencer le Quiz',
    markAsLearned: 'Marquer comme Appris',
    markedLearned: 'Appris !',
  },
  // Unit map / lesson list
  unitMap: {
    lessonCount: '{{completed}} / {{total}} leçons terminées',
    lesson: 'Leçon',
    exerciseCount: '{{count}} exercices',
    comingSoon: 'Exercices de leçon bientôt disponibles',
    locked: 'Terminez la leçon précédente pour débloquer',
  },
  // Lesson exercise engine
  exercise: {
    questionOf: '{{current}} sur {{total}}',
    checkAnswer: 'Vérifier',
    continue: 'Continuer',
    correct: 'Correct !',
    incorrect: 'Incorrect',
    correctAnswerWas: 'Bonne réponse : {{answer}}',
    selectAnswer: 'Sélectionnez une réponse',
    typeAnswer: 'Tapez votre réponse...',
    chooseWord: 'Choisissez le bon mot :',
    matchPairs: 'Associez les paires',
    greek: 'Grec',
    translation: 'Traduction',
    perfectMatch: 'Parfait ! Toutes les paires associées !',
    allMatched: 'Toutes les paires associées !',
  },
  // Lesson summary
  lessonSummary: {
    title: 'Leçon Terminée !',
    score: 'Score',
    accuracy: '{{percent}}% de Précision',
    xpEarned: 'XP Gagnés',
    questionsCorrect: '{{correct}} sur {{total}} correctes',
    timeSpent: 'Temps',
    continueLearning: 'Continuer',
    retryLesson: 'Réessayer',
  },
  // Streak
  streak: {
    dayStreak: 'Jours consécutifs',
    longest: 'Record',
    freezes: 'Protections',
    freezeHint: 'La protection de série couvre 1 jour manqué',
  },
  // Vocabulary collection
  vocabulary: {
    searchPlaceholder: 'Rechercher des mots...',
    wordCount: '{{count}} mots',
    wordDetail: 'Détail du Mot',
    translation: 'Traduction',
    category: 'Catégorie',
    exampleSentence: 'Phrase d\'exemple',
    pronunciationGuide: 'Prononciation',
    noResults: 'Aucun mot trouvé',
    tryDifferentSearch: 'Essayez un autre terme de recherche',
    emptyTitle: 'Pas encore de vocabulaire',
    emptySubtitle: 'Terminez des leçons pour construire votre collection de vocabulaire',
  },
  // Common
  common: {
    loading: 'Chargement...',
    error: 'Quelque chose a mal tourné',
    retry: 'Réessayer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    ok: 'OK',
  },
} as const;
