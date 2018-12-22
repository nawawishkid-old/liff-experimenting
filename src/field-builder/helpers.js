const InputSchemeFactory = require("./InputSchemeFactory");

const isf = new InputSchemeFactory({ required: true });

/**
 * Create form data.
 *
 * @param {string} formId Form id
 * @param {string} messageType Type of Line message.
 * @param  {...FieldData[]} fieldDataObjs Array of FieldData objects.
 *
 * @return {DataForForm} DataForForm object.
 */
const createMessageFormFields = (formId, messageType, ...fieldDataObjs) => {
  const fields = [getMessageTypeField(messageType), ...fieldDataObjs].map(
    field => {
      // console.log("field: ", field);
      /**
       * Field name begins with its form's id, followed by the key of each level of Line message object.
       * All are separated by underscore.
       */
      const createdId = `${formId}_${field.attributes.name}`;

      field.attributes.id = field.attributes.name = createdId;

      return field;
    }
  );

  return { id: formId, fields };
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

const urlPatternArgs = [
  "^https:\\/\\/([a-z]+\\.[a-z]{2,})+.*$",
  "URL must be HTTPS, HTTP not allowed."
];

const lineActionUriPatternArgs = [
  "^((http|https):\\/\\/([a-z]+\\.[a-z]{2,})+|line:\\/\\/([a-z]+\\/)+|tel).*$",
  "The available schemes are <code>http</code>, <code>https</code>, <code>line</code>, and <code>tel</code>"
];

function getDefaultActionUriFieldInstances(index) {
  const name = `template_actions[]_${index}_`;
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
    .pattern(...lineActionUriPatternArgs)
    .description("Link URL to be opened when tapped.")
    .max(1000)
    .required();

  return [actionType, actionLabel, actionUri];
}

module.exports = {
  isf,
  getMessageTypeField,
  createMessageFormFields,
  urlPatternArgs,
  lineActionUriPatternArgs,
  getDefaultActionUriFieldInstances
};
