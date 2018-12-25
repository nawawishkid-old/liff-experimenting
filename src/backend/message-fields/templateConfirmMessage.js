const {
  isf,
  createTemplateMessageFormFields,
  getDefaultActionUriFieldInstances
} = require("./helpers");

const text = isf
  .textArea("text")
  .label("Message")
  .max(240)
  .get();
const templateActions = getDefaultActionUriFieldInstances(0).map(field =>
  field
    .duplicatable()
    .maxDuplications(4)
    .get()
);

module.exports = createTemplateMessageFormFields(
  "templateConfirmMessage",
  "confirm",
  { normalFields: [text, ...templateActions] }
);
