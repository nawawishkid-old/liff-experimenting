/**
 * @typedef {string} HTMLInputElementType
 */
/**
 * @enum {HTMLInputElementType}
 * @readonly
 */
const HTML_INPUT_ELEMENT_TYPES = {
  BUTTON: "button",
  CHECKBOX: "checkbox",
  COLOR: "color",
  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  EMAIL: "email",
  FILE: "file",
  HIDDEN: "hidden",
  IMAGE: "image",
  MONTH: "month",
  NUMBER: "number",
  PASSWORD: "password",
  RADIO: "radio",
  RANGE: "range",
  RESET: "reset",
  SEARCH: "search",
  SUBMIT: "submit",
  TEL: "tel",
  TEXT: "text",
  TIME: "time",
  URL: "url",
  WEEK: "week"
};

/**
 * HTML Form Elements attributes
 *
 * @typedef {object} HTMLAttributes
 *
 * @property {string} id - Element.id
 * @property {string} name - HTMLInputElement.name
 * @property {HTMLInputElementType} type - HTMLInputElement.type
 * @property {bool} required - HTMLElement.required
 * @property {string} pattern - HTMLElement.pattern
 * @property {number} min - HTMLInputElement.min
 * @property {number} max - HTMLInputElement.max
 * @property {number} minlength - HTMLInputElement.minlength
 * @property {number} maxlength - HTMLInputElement.maxlength
 * @property {number} step - HTMLInputElement.step
 * @property {string} placeholder - HTMLInputElement.placeholder
 */

/**
 * @typedef {string} FieldDataCustomType
 */
/**
 * @enum {FieldDataCustomType}
 * @readonly
 */
const FIELD_DATA_CUSTOM_TYPE = {
  /** HTMLTextareaElement */
  TEXT_AREA: "textarea",
  /** HTMLSelectElement */
  SELECT: "select"
};

/**
 * @typedef {object} HTMLOptionElementData
 *
 * @property {string} label - HtmlOptionElement.innerHTML
 * @property {*} value - HTMLOptionElement.value
 */

/**
 * Data of form field created by InputSchemeFactory
 *
 * @typedef {Object} FieldData
 *
 * @property {FieldDataCustomType} type - Custom type of field.
 * @property {HTMLOptionElementData} options - Options data for HTMLSelectElement.
 * @property {string} label - Field's label.
 * @property {string} description - Field's description.
 * @property {bool} isDuplicatable - Indicate whether this field is duplicatable.
 * @property {number} maxDuplications - Maximum number of duplications of this field..
 * @property {HTMLAttributes} attributes - HTMLAttributes.
 */

/**
 * Prepared data for form builder.
 *
 * @typedef {object} DataForForm
 *
 * @property {string} id - Form id.
 * @property {FieldData[]} fields - Array of FieldData objects.
 */
