export const colors = {
  // Primary - Greek blue
  primary: '#1a73e8',
  primaryLight: '#4a9af5',
  primaryDark: '#0d56b8',

  // Secondary - Warm gold (Mediterranean)
  secondary: '#f5a623',
  secondaryLight: '#f7bc5c',
  secondaryDark: '#c7841a',

  // Feedback
  success: '#34a853',
  error: '#ea4335',
  warning: '#fbbc04',

  // Backgrounds
  background: '#ffffff',
  surface: '#f8f9fa',
  surfaceAlt: '#e8eaed',

  // Text
  text: '#202124',
  textSecondary: '#5f6368',
  textDisabled: '#9aa0a6',
  textOnPrimary: '#ffffff',
  textOnSecondary: '#202124',

  // Borders
  border: '#dadce0',
  borderLight: '#e8eaed',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',
} as const;

export type ColorName = keyof typeof colors;
