class InputSchemeFactory {
  _data = {};
  defaultAttributes = {};

  constructor(defaultAttributes = {}) {
    this.defaultAttributes = defaultAttributes;
    this._resetFieldData();
  }

  get() {
    const data = { ...this._data };

    this._resetFieldData();

    return data;
  }

  /**
   * **********
   *
   * Input type methods
   *
   * **********
   */

  text(name) {
    return this.type("text").name(name);
  }

  textArea(name) {
    return this.type("textarea").name(name);
  }

  number(name) {
    return this.type("number").name(name);
  }

  select(name, options = []) {
    return this.type("select").name(name);
  }

  bool(name) {
    return this.type("select").name(name);
  }

  url(name) {
    return this.type("url").name(name);
  }

  hidden(name) {
    return this.type("hidden").name(name);
  }

  type(type) {
    throwIfNotType("string", type);

    if (HTML_INPUT_TYPES.some(t => t === type)) {
      return this._setAttr("type", type);
    }

    return this._setExtra("type", type);
  }
  /**
   * 'name' attribute.
   *
   * @param {string} name
   */
  name(name) {
    throwIfNotType("string", name);

    return this._setAttr("name", name);
  }

  value(value) {
    return this._setAttr("value", value);
  }

  /**
   * HTML5 'pattern' attribute for validation.
   *
   * @param {string} pattern
   */
  pattern(pattern, message) {
    throwIfNotType("string", pattern);
    throwIfNotType("string", message);

    return this._setAttr("pattern", pattern).data(
      "error-message-pattern",
      message
    );
  }

  required() {
    return this._setAttr("required", true);
  }

  optional() {
    return this._setAttr("required", false);
  }

  /**
   * <input type="number" step={number} />
   *
   * @param {number} step
   */
  step(number) {
    const type = this._getAttr("type");

    throwIf(
      type !== "number",
      'Input type must be "number" or "text" before set "step" attribute'
    );

    return this._setAttr("step", number);
  }

  min(number) {
    throwIfFieldTypeNotNumberOrTextClass(this._getAttr("type"));

    const type = this._getAttr("type");
    const attr = isTypeTextClass(type) ? "minlength" : "min";

    return this._setAttr(attr, number);
  }

  max(number) {
    throwIfFieldTypeNotNumberOrTextClass(this._getAttr("type"));

    const type = this._getAttr("type");
    const attr = isTypeTextClass(type) ? "maxlength" : "max";

    return this._setAttr(attr, number);
  }

  placeholder(text) {
    throwIfNotType("string", text);

    return this._setAttr("placeholder", text);
  }

  data(key, value) {
    const stringValue = value.toString();
    const isTestPass = /^[^-]([a-zA-Z]+-{0,1})+$/g.test(key);

    throwIf(
      !isTestPass,
      "Data-* attribute must contains only lower case letter, hyphen, and not double hyphens in a row."
    );
    throwIfNotType("string", key);

    return this._setAttr(`data-${key}`, stringValue);
  }

  /**
   * **********
   *
   * Additional data methods.
   *
   * **********
   */
  /**
   * <option> for <select>
   *
   * @param {array} options
   */
  options(options) {
    throwIf(
      this._getExtra("type") !== "select",
      'Input type must be "select" before set options'
    );

    throwIfNotType("array", options);

    throwIf(
      options.every(opt => isObjectSchemaValid(TYPE_OPTIONS, opt)),
      "Option object must be { title, value }"
    );

    return this._setExtra("options", options);
  }

  validator(validatorObj) {
    throwIf(
      isObjectSchemaValid(TYPE_VALIDATOR_OBJ, validatorObj),
      'validatorObj.validator must be a "function" and validatorObj.message must be a "string"'
    );

    this._data.validators.push(validatorObj);

    return this;
  }

  label(label) {
    throwIfNotType("string", label);

    return this._setExtra("label", label);
  }

  description(text) {
    throwIfNotType("string", text);

    return this._setExtra("description", text);
  }

  /**
   * **********
   *
   * Utility methods
   *
   * **********
   */

  /**
   * **********
   *
   * Private methods. The name begins with underscore ('_')
   *
   * **********
   */
  _getAttr(key) {
    return this._data.attributes[key];
  }

  _getExtra(key) {
    return this._data[key];
  }

  _setAttr(key, newValue, isMerge = false) {
    if (isObject(key)) {
      Object.keys(key).forEach(k => this._setAttr(k, key[k]));

      return this;
    }

    const oldValue = this._getAttr(key);

    this._data.attributes[key] = this._createValueFromClassApiCall(
      newValue,
      oldValue,
      isMerge
    );

    return this;
  }

  _setExtra(key, newValue, isMerge = false) {
    if (isObject(key)) {
      Object.keys(key).forEach(k => this._setExtra(k, key[k]));

      return this;
    }

    const oldValue = this._data[key];

    this._data[key] = this._createValueFromClassApiCall(
      newValue,
      oldValue,
      isMerge
    );

    return this;
  }

  _createValueFromClassApiCall(newValue, oldValue, isMerge = false) {
    let value;

    if (isArray(newValue) && isArray(oldValue) && isMerge) {
      value = [...oldValue, ...newValue];
    } else if (isObject(newValue) && isObject(oldValue) && isMerge) {
      value = { ...oldValue, ...newValue };
    } else {
      value = newValue;
    }

    return value;
  }

  _resetFieldData() {
    const { attributes, ...rest } = this._getDefaultFieldData();

    this._data = {
      ...rest,
      attributes: { ...attributes, ...this.defaultAttributes }
    };

    return this;
  }

  _getDefaultFieldData() {
    return {
      attributes: {
        type: "text",
        name: null,
        value: null
      },
      validators: []
    };
  }
}

module.exports = InputSchemeFactory;

const TYPE_VALIDATOR_OBJ = { validator: Function, message: String };
const TYPE_OPTIONS = { title: String, value: "*" };
const HTML_INPUT_TYPES = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week"
];
const TEXT_RELATED_FIELD_TYPES = [
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "textarea"
];

/**
 * **********
 *
 * The class's helper functions
 *
 * **********
 */
const isString = value => typeof value === "string";
const isNumber = value => typeof value === "number";
const isArray = value => Array.isArray(value);
const isFunction = value => typeof value === "function";
const isObject = value => value.constructor === Object;
const isUndefined = value => typeof value === "undefined";
const isTypeTextClass = type => TEXT_RELATED_FIELD_TYPES.some(t => t === type);
const throwIfFieldTypeNotNumberOrTextClass = type => {
  throwIf(
    type !== "number" && !isTypeTextClass(type),
    'Field type must be "number" or text-related type to use "max" attribute. Current field type is ' +
      type
  );

  return true;
};
const throwIf = (test, message) => {
  if (test) {
    throw new Error(message);
  }

  return true;
};
const throwIfNotType = (type, value) => {
  let isThatType;

  switch (type) {
    case "string":
      isThatType = isString(value);
      break;

    case "number":
      isThatType = isNumber(value);
      break;

    case "array":
      isThatType = isArray(value);
      break;

    default:
      throw new TypeError("Invalid type given to test.");
  }

  return throwIf(!isThatType, `Expected ${type}, ${typeof value} given.`);
};
const isObjectSchemaValid = (schema, obj) =>
  Object.keys(schema).every(key => {
    if (schema[key] === "*") {
      return true;
    }

    return typeof obj[key] === schema[key].name;
  });
