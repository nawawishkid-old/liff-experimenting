const parseManyFieldNames = (fields, starterObj = {}, delimiter = "_") =>
  fields.reduce(
    (obj, field) => parseFieldName(field, obj),
    starterObj,
    delimiter
  );

const parseFieldName = (field, starterObj = {}, delimiter = "_") => {
  const { name, value } = field;
  const splittedName = name.split(delimiter);
  // Remove form id
  const keys = splittedName.slice(1);

  keys.reduce((obj, key, index) => {
    const isLastIndex = !keys[index + 1] ? true : false;

    if (Array.isArray(obj) && isNaN(parseInt(key))) {
      throw new Error(
        "The key preceded by array must be a numeric value, " + key + " given."
      );
    }

    if (isLastIndex) {
      return handleLastIndex(obj, key, value);
    }

    // Keyname ends with bracket
    const valueShouldBeArray = key.slice(-2) === "[]";

    if (valueShouldBeArray) {
      return handleArrayProperty(obj, key);
    }

    return handleNormal(obj, key);
  }, starterObj);

  return starterObj;
};

/**
 * *****
 * HELPER FUNCTIONS
 * *****
 */
const handleLastIndex = (obj, key, value) => {
  obj[key] = value;

  return obj;
};
const handleArrayProperty = (obj, key) => {
  // Remove bracket from keyname then assign new array to it.
  const slicedKey = key.slice(0, -2);
  const prop = obj[slicedKey];

  // If prop already exists, skip the loop
  // to prevent data overwriting.
  if (isPropExists(obj, slicedKey)) {
    return prop;
  }

  obj[slicedKey] = [];

  return obj[slicedKey];
};
const handleNormal = (obj, key) => {
  // If prop already exists, skip the loop
  // to prevent data overwriting.
  if (isPropExists(obj, key)) {
    return obj[key];
  }

  // If key is not expected to be array
  // and not the last item, assign new object to it.
  obj[key] = {};

  return obj[key];
};
const isPropExists = (obj, key) => typeof obj[key] !== "undefined";

export { parseFieldName, parseManyFieldNames };
