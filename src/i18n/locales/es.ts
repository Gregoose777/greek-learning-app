export default {
  // Tab labels
  tabs: {
    home: 'Inicio',
    lessons: 'Lecciones',
    review: 'Repasar',
    profile: 'Perfil',
  },
  // Home screen
  home: {
    title: 'Inicio',
    subtitle: 'Tu panel de aprendizaje de griego',
  },
  // Lessons screen
  lessons: {
    title: 'Lecciones',
    subtitle: 'Explora unidades y lecciones',
  },
  // Review screen
  review: {
    title: 'Repasar',
    subtitle: 'Practica vocabulario con repetición espaciada',
  },
  // Profile screen
  profile: {
    title: 'Perfil',
    subtitle: 'Tus estadísticas y ajustes',
    viewDesignSystem: 'Ver Sistema de Diseño',
    changeLanguage: 'Cambiar Idioma',
    settings: 'Ajustes',
    referenceLanguage: 'Idioma de referencia',
  },
  // Language picker
  languagePicker: {
    title: 'Elige Tu Idioma',
    subtitle: 'Selecciona el idioma para instrucciones y traducciones',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    confirm: 'Continuar',
  },
  // Design System / Component Showcase
  designSystem: {
    title: 'Sistema de Diseño',
  },
  // Alphabet module
  alphabet: {
    title: 'Alfabeto Griego',
    subtitle: 'Aprende las 24 letras griegas',
    learnTab: 'Aprender',
    quizTab: 'Prueba',
    letterDetail: 'Detalle de Letra',
    uppercase: 'Mayúscula',
    lowercase: 'Minúscula',
    name: 'Nombre',
    pronunciation: 'Pronunciación',
    transliteration: 'Transliteración',
    example: 'Ejemplo',
    audioPlaceholder: 'Audio próximamente',
    tapToHear: 'Toca para escuchar la pronunciación',
    progress: 'Progreso',
    lettersLearned: '{{learned}} de {{total}} letras aprendidas',
    quizTitle: 'Prueba de Letras',
    quizPrompt: '¿Cuál es la pronunciación de esta letra?',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    theCorrectAnswer: 'La respuesta correcta es:',
    next: 'Siguiente',
    quizComplete: '¡Prueba Completa!',
    quizScore: 'Acertaste {{correct}} de {{total}}',
    tryAgain: 'Intentar de Nuevo',
    backToAlphabet: 'Volver al Alfabeto',
    startQuiz: 'Iniciar Prueba',
    markAsLearned: 'Marcar como Aprendida',
    markedLearned: '¡Aprendida!',
  },
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Algo salió mal',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    save: 'Guardar',
    ok: 'OK',
  },
} as const;
