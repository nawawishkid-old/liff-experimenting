const InputSchemeFactory = require("../field-builder/InputSchemeFactory");
const fields = require("./common-fields");

const isf = new InputSchemeFactory({ required: true });

const createTemplateMessageFormFields = (
  formId,
  templateType,
  { normalFields, ...rest }
) =>
  createMessageFormFields(formId, "template", {
    normalFields: [
      isf
        .hidden("template_type")
        .value(templateType)
        .get(),
      fields.altText().get(false),
      ...normalFields
    ],
    ...rest
  });

/**
 * Create form data.
 *
 * @param {string} formId Form id
 * @param {string} messageType Type of Line message.
 * @param  {...FieldData[]} fieldDataObjs Array of FieldData objects.
 *
 * @return {DataForForm} DataForForm object.
 */
const createMessageFormFields = (formId, messageType, options) => {
  const { normalFields, advancedFields } = options;
  const addFieldId = getAddFieldIdCallback(formId);
  const nfs = [getMessageTypeField(messageType), ...normalFields].map(
    addFieldId
  );
  const afs = Array.isArray(advancedFields)
    ? advancedFields.map(addFieldId)
    : [];

  return { id: formId, normalFields: nfs, advancedFields: afs };
};

const getAddFieldIdCallback = formId => field => {
  /**
   * Field name begins with its form's id, followed by the key of each level of Line message object.
   * All are separated by underscore.
   */
  const createdId = `${formId}_${field.attributes.name}`;

  field.attributes.id = field.attributes.name = createdId;

  return field;
};

/**
 * Get attributes data for creating HTMLInputElement type hidden.
 *
 * @param {string} messageType Type of Line message.
 *
 * @return {HTMLAttributes} HTMLAttributes object.
 */
const getMessageTypeField = messageType =>
  isf
    .hidden("type")
    .value(messageType)
    .get();

function getDefaultActionUriFieldInstances(prefixName, index) {
  const name = `${prefixName}_actions[]_${index}_`;
  const actionType = new InputSchemeFactory()
    .hidden(`${name}type`)
    .value("uri");
  const actionLabel = new InputSchemeFactory()
    .text(`${name}label`)
    .label("Action label")
    .max(20)
    .required();
  const actionUri = new InputSchemeFactory()
    .url(`${name}uri`)
    .label("Action link URL")
    .pattern(...fields.lineActionUriPatternArgs)
    .description("Link URL to be opened when tapped.")
    .max(1000)
    .required();

  return [actionType, actionLabel, actionUri];
}

module.exports = {
  isf,
  getMessageTypeField,
  createMessageFormFields,
  createTemplateMessageFormFields,
  getDefaultActionUriFieldInstances
};
