/** @type {import('tailwindcss').Config} */

const getCustomSpacingScale = require("./theme/get-custom-spacing-scale");
const customSpacing = require("./theme/custom-spacing");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    ...getCustomSpacingScale(customSpacing),
    extend: {
      fontFamily: {
        WantedSansExtraBlack: ['WantedSans-ExtraBlack'],
        WantedSansBlack: ['WantedSans-Black'],
        WantedSansExtraBold: ['WantedSans-ExtraBold'],
        WantedSansBold: ['WantedSans-Bold'],
        WantedSansSemiBold: ['WantedSans-SemiBold'],
        WantedSansMedium: ['WantedSans-Medium'],
        WantedSansRegular: ['WantedSans-Regular'],
      },
    },
  },
  plugins: [],
};
