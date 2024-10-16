import { useFonts, loadAsync } from "expo-font";

const fonts = {
  WantedSansExtraBlack: require("../src/assets/fonts/WantedSans-ExtraBlack.otf"),
  WantedSansBlack: require("../src/assets/fonts/WantedSans-Black.otf"),
  WantedSansExtraBold: require("../src/assets/fonts/WantedSans-ExtraBold.otf"),
  WantedSansBold: require("../src/assets/fonts/WantedSans-Bold.otf"),
  WantedSansSemiBold: require("../src/assets/fonts/WantedSans-SemiBold.otf"),
  WantedSansMedium: require("../src/assets/fonts/WantedSans-Medium.otf"),
  WantedSansRegular: require("../src/assets/fonts/WantedSans-Regular.otf"),
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
