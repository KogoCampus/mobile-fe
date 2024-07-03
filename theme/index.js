/** @type {import('tailwindcss').Config} */

import { useFonts, loadAsync } from 'expo-font';

const fonts = {
  'WantedSansExtraBlack': require('./fonts/WantedSans-ExtraBlack.otf'),
  'WantedSansBlack': require('./fonts/WantedSans-Black.otf'),
  'WantedSansExtraBold': require('./fonts/WantedSans-ExtraBold.otf'),
  'WantedSansBold': require('./fonts/WantedSans-Bold.otf'),
  'WantedSansSemiBold': require('./fonts/WantedSans-SemiBold.otf'),
  'WantedSansMedium': require('./fonts/WantedSans-Medium.otf'),
  'WantedSansRegular': require('./fonts/WantedSans-Regular.otf'),
}

/**
 * Async function to load fonts.
 */
export async function loadThemeFonts() {
  return await loadAsync(fonts);
}

/**
 * React hook to load fonts.
 */
export function useThemeFonts() {
  return useFonts(fonts);
}
