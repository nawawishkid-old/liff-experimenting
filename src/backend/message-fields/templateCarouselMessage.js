const { createTemplateMessageFormFields } = require("./helpers");
const fields = require("./common-fields");
const templateCarouselColumns = require("./templateCarouselColumns");

module.exports = createTemplateMessageFormFields(
  "templateCarouselMessage",
  "carousel",
  fields.templateImageAspectRatio().get(),
  fields.templateImageSize().get(),
  ...templateCarouselColumns
);
