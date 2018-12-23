const {
  isf,
  createTemplateMessageFormFields,
  getDefaultActionUriFieldInstances
} = require("./helpers");
const fields = require("./common-fields");

const templateActions = getDefaultActionUriFieldInstances("template", 0).map(
  field =>
    field
      .duplicatable()
      .maxDuplications(4)
      .get()
);

module.exports = createTemplateMessageFormFields(
  "templateButtonMessage",
  "buttons",
  fields.templateText().get(),
  fields.templateTitle().get(),
  fields.templateThumbnailImageUrl().get(),
  fields.templateImageAspectRatio().get(),
  fields.templateImageSize().get(),
  fields.templateImageBackgroundColor().get(),
  ...fields.getDefaultAction("template"),
  ...templateActions
);
