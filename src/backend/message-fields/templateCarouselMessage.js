const { createTemplateMessageFormFields } = require("./helpers");
const fields = require("./common-fields");
const templateCarouselColumns = require("./templateCarouselColumns");

module.exports = createTemplateMessageFormFields(
  "templateCarouselMessage",
  "carousel",
  {
    advancedFields: [
      fields.templateImageAspectRatio().get(),
      fields.templateImageSize().get()
    ],
    normalFields: templateCarouselColumns
  }
);
