export default {
  // Tab labels
  tabs: {
    home: 'Home',
    lessons: 'Lessons',
    review: 'Review',
    profile: 'Profile',
  },
  // Home screen
  home: {
    title: 'Home',
    subtitle: 'Your Greek learning dashboard',
  },
  // Lessons screen
  lessons: {
    title: 'Lessons',
    subtitle: 'Browse units and lessons',
  },
  // Review screen
  review: {
    title: 'Review',
    subtitle: 'Practice vocabulary with spaced repetition',
  },
  // Profile screen
  profile: {
    title: 'Profile',
    subtitle: 'Your stats and settings',
    viewDesignSystem: 'View Design System',
    changeLanguage: 'Change Language',
    settings: 'Settings',
    referenceLanguage: 'Reference Language',
  },
  // Language picker
  languagePicker: {
    title: 'Choose Your Language',
    subtitle: 'Select the language for instructions and translations',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    confirm: 'Continue',
  },
  // Design System / Component Showcase
  designSystem: {
    title: 'Design System',
  },
  // Alphabet module
  alphabet: {
    title: 'Greek Alphabet',
    subtitle: 'Learn all 24 Greek letters',
    learnTab: 'Learn',
    quizTab: 'Quiz',
    letterDetail: 'Letter Detail',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    name: 'Name',
    pronunciation: 'Pronunciation',
    transliteration: 'Transliteration',
    example: 'Example',
    audioPlaceholder: 'Audio coming soon',
    tapToHear: 'Tap to hear pronunciation',
    progress: 'Progress',
    lettersLearned: '{{learned}} of {{total}} letters learned',
    quizTitle: 'Letter Quiz',
    quizPrompt: 'What is the pronunciation of this letter?',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    theCorrectAnswer: 'The correct answer is:',
    next: 'Next',
    quizComplete: 'Quiz Complete!',
    quizScore: 'You got {{correct}} out of {{total}} correct',
    tryAgain: 'Try Again',
    backToAlphabet: 'Back to Alphabet',
    startQuiz: 'Start Quiz',
    markAsLearned: 'Mark as Learned',
    markedLearned: 'Learned!',
  },
  // Unit map / lesson list
  unitMap: {
    lessonCount: '{{completed}} / {{total}} lessons completed',
    lesson: 'Lesson',
    exerciseCount: '{{count}} exercises',
    comingSoon: 'Lesson exercises coming soon',
    locked: 'Complete the previous lesson to unlock',
  },
  // Lesson exercise engine
  exercise: {
    questionOf: '{{current}} of {{total}}',
    checkAnswer: 'Check',
    continue: 'Continue',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    correctAnswerWas: 'Correct answer: {{answer}}',
    selectAnswer: 'Select an answer',
    typeAnswer: 'Type your answer...',
    chooseWord: 'Choose the correct word:',
  },
  // Lesson summary
  lessonSummary: {
    title: 'Lesson Complete!',
    score: 'Score',
    accuracy: '{{percent}}% Accuracy',
    xpEarned: 'XP Earned',
    questionsCorrect: '{{correct}} of {{total}} correct',
    continueLearning: 'Continue',
    retryLesson: 'Try Again',
  },
  // Common
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    ok: 'OK',
  },
} as const;
