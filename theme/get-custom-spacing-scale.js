const basicClasses = {
  margin: {
    auto: "auto",
  },
  inset: {
    auto: "auto",
    full: "100%",
  },
  translate: {
    full: "100%",
  },
};

function getCustomSpacingScale(customSpacing) {
  const spacingUtilities = [
    "padding",
    "margin",
    "gap",
    "inset",
    "space",
    "translate",
    "scrollMargin",
    "scrollPadding",
  ];
  return spacingUtilities.reduce(
    (acc, util) => ({
      ...acc,
      [util]: { ...customSpacing, ...basicClasses },
    }),
    {},
  );
}

module.exports = getCustomSpacingScale;
