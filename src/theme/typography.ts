import { TextStyle } from 'react-native';

export const typography = {
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.3,
  } as TextStyle,

  heading2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.2,
  } as TextStyle,

  heading3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,

  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  } as TextStyle,

  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,

  captionBold: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  } as TextStyle,

  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.2,
  } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
