"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseManyFieldNames = exports.parseFieldName = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parseManyFieldNames = function parseManyFieldNames(fields) {
  var starterObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fields.reduce(function (obj, field) {
    return parseFieldName(field, obj);
  }, starterObj);
};

exports.parseManyFieldNames = parseManyFieldNames;

var parseFieldName = function parseFieldName(field) {
  var starterObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var name = field.name,
      value = field.value;
  var splittedName = name.split("_"); // Remove form id

  var keys = splittedName.slice(1);
  keys.reduce(function (obj, key, index) {
    var isLastIndex = !keys[index + 1] ? true : false;

    if (isLastIndex) {
      return handleLastIndex(obj, key, value);
    } // Keyname ends with bracket


    var valueShouldBeArray = key.slice(-2) === "[]";

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


exports.parseFieldName = parseFieldName;

var handleLastIndex = function handleLastIndex(obj, key, value) {
  if (Array.isArray(obj)) {
    obj.push(_defineProperty({}, key, value));
  } else {
    obj[key] = value;
  }

  return obj;
};

var handleArrayProperty = function handleArrayProperty(obj, key) {
  // Remove bracket from keyname then assign new array to it.
  var slicedKey = key.slice(0, -2);
  var prop = obj[slicedKey]; // If prop already exists, skip the loop
  // to prevent data overwriting.

  if (isPropExists(obj, slicedKey)) {
    return prop;
  }

  obj[slicedKey] = [];
  return obj[slicedKey];
};

var handleNormal = function handleNormal(obj, key) {
  // If prop already exists, skip the loop
  // to prevent data overwriting.
  if (isPropExists(obj, key)) {
    return obj[key];
  } // If key is not expected to be array
  // and not the last item, assign new object to it.


  obj[key] = {};
  return obj[key];
};

var isPropExists = function isPropExists(obj, key) {
  return typeof obj[key] !== "undefined";
};