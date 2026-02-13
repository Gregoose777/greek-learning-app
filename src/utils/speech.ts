import * as Speech from 'expo-speech';

const GREEK_LOCALE = 'el-GR';

let ttsAvailable: boolean | null = null;

/**
 * Check if TTS is available on the device.
 * Caches the result after first check.
 */
export async function isTtsAvailable(): Promise<boolean> {
  if (ttsAvailable !== null) return ttsAvailable;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    ttsAvailable = voices.length > 0;
  } catch {
    ttsAvailable = false;
  }
  return ttsAvailable;
}

/**
 * Speak Greek text using TTS.
 * Silently fails if TTS is unavailable.
 */
export function speakGreek(text: string): void {
  try {
    // Stop any ongoing speech before starting new
    Speech.stop();
    Speech.speak(text, {
      language: GREEK_LOCALE,
      rate: 0.85,
      pitch: 1.0,
    });
  } catch {
    // Graceful fallback: do nothing if TTS fails
  }
}

/**
 * Stop any ongoing speech.
 */
export function stopSpeech(): void {
  try {
    Speech.stop();
  } catch {
    // Ignore errors
  }
}

/**
 * Check if TTS is currently speaking.
 */
export async function isSpeaking(): Promise<boolean> {
  try {
    return await Speech.isSpeakingAsync();
  } catch {
    return false;
  }
}
