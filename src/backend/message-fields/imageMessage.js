const { isf, createMessageFormFields } = require("./helpers");
const { urlPatternArgs } = require("./common-fields");

const getDescription = res =>
  `Must be .jpeg file with maximum resolution of ${res}x${res}px  and under 1Mb in size.`;

module.exports = createMessageFormFields(
  "imageMessage",
  "image",
  isf
    .url("originalContentUrl")
    .label("Original Content URL")
    .description(getDescription(1024))
    .pattern(...urlPatternArgs)
    .max(1000)
    .get(),
  isf
    .url("previewImageUrl")
    .label("Preview Image URL")
    .description(getDescription(240))
    .pattern(...urlPatternArgs)
    .max(1000)
    .get()
);
