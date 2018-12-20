// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"A6es":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isString = function isString(value) {
  return typeof value === "string";
};

var isNumber = function isNumber(value) {
  return typeof value === "number";
};

var isArray = function isArray(value) {
  return Array.isArray(value);
};

var isFunction = function isFunction(value) {
  return typeof value === "function";
};

var isObject = function isObject(value) {
  return value.constructor === Object;
};

var isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};

var throwIf = function throwIf(test, message) {
  if (test) {
    throw new Error(message);
  }

  return true;
};

var throwIfNotType = function throwIfNotType(type, value) {
  var isThatType;

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

  return throwIf(!isThatType, "Expected ".concat(type, ", ").concat(_typeof(value), " given."));
};

var TYPE_VALIDATOR_OBJ = {
  validator: Function,
  message: String
};
var TYPE_OPTIONS = {
  title: String,
  value: "*"
};

var validateType = function validateType(type, obj) {
  return Object.keys(type).every(function (key) {
    if (type[key] === "*") {
      return true;
    }

    return _typeof(obj[key]) === type[key].name;
  });
};

var InputSchemeFactory =
/*#__PURE__*/
function () {
  function InputSchemeFactory() {
    var defaultAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, InputSchemeFactory);

    _defineProperty(this, "fieldData", {});

    _defineProperty(this, "defaultAttributes", {});

    this.defaultAttributes = defaultAttributes;

    this._resetFieldData();
  }

  _createClass(InputSchemeFactory, [{
    key: "get",
    value: function get() {
      var data = _objectSpread({}, this.fieldData);

      this._resetFieldData();

      return data;
    }
  }, {
    key: "text",
    value: function text(name) {
      return this._setAttr({
        type: "text",
        name: name
      });
    }
  }, {
    key: "number",
    value: function number(name) {
      return this._setAttr({
        type: "number",
        name: name
      });
    }
  }, {
    key: "select",
    value: function select(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this._setAttr({
        type: "select",
        name: name
      })._setOptions(options);
    }
  }, {
    key: "bool",
    value: function bool(name) {
      return this._setAttr({
        type: "select",
        name: name
      })._setOptions([true, false]);
    }
  }, {
    key: "hidden",
    value: function hidden(name) {
      return this._setAttr({
        type: "hidden",
        name: name
      });
    }
  }, {
    key: "value",
    value: function value(_value) {
      return this._setAttr("value", _value);
    }
    /**
     * HTML5 'pattern' attribute for validation.
     *
     * @param {string} pattern
     */

  }, {
    key: "pattern",
    value: function pattern(_pattern) {
      throwIfNotType("string", _pattern);
      return this._setAttr("pattern", _pattern);
    }
  }, {
    key: "required",
    value: function required() {
      return this._setAttr("required", true);
    }
  }, {
    key: "optional",
    value: function optional() {
      return this._setAttr("required", false);
    }
    /**
     * <input type="number" step={number} />
     *
     * @param {number} step
     */

  }, {
    key: "step",
    value: function step(number) {
      var type = this.fieldData.type;
      throwIf(type !== "number" || type !== "text", 'Input type must be "number" or "text" before set "step" attribute');
      return this._setAttr("step", number);
    }
  }, {
    key: "min",
    value: function min(number) {
      var type = this.fieldData.type;
      throwIf(type !== "number" || type !== "text", 'Input type must be "number" or "text" before set "min" attribute');
      return this._setAttr("min", number);
    }
  }, {
    key: "max",
    value: function max(number) {
      var type = this.fieldData.type;
      throwIf(type !== "number" || type !== "text", 'Input type must be "number" or "text" before set "max" attribute');
      return this._setAttr("max", number);
    }
    /**
     * <option> for <select>
     *
     * @param {array} options
     */

  }, {
    key: "options",
    value: function options(_options) {
      throwIf(this.fieldData.type !== "select", 'Input type must be "select" before set options');
      throwIfNotType("array", _options);
      throwIf(_options.every(function (opt) {
        return validateType(TYPE_OPTIONS, opt);
      }), "Option object must be { title, value }");
      return this._setExtra("options", _options);
    }
  }, {
    key: "validator",
    value: function validator(validatorObj) {
      throwIf(validateType(TYPE_VALIDATOR_OBJ, validatorObj), 'validatorObj.validator must be a "function" and validatorObj.message must be a "string"');
      this.fieldData.validators.push(validatorObj);
      return this;
    }
  }, {
    key: "_setAttr",
    value: function _setAttr(key, newValue) {
      var _this = this;

      var isMerge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isObject(key)) {
        Object.keys(key).forEach(function (k) {
          return _this._setAttr(k, key[k]);
        });
        return this;
      }

      var oldValue = this.fieldData.attributes[key];
      this.fieldData.attributes[key] = this._createValueFromClassApiCall(newValue, oldValue, isMerge);
      return this;
    }
  }, {
    key: "_setExtra",
    value: function _setExtra(key, newValue) {
      var _this2 = this;

      var isMerge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isObject(key)) {
        Object.keys(key).forEach(function (k) {
          return _this2._setExtra(k, key[k]);
        });
        return this;
      }

      var oldValue = this.fieldData[key];
      this.fieldData[key] = this._createValueFromClassApiCall(newValue, oldValue, isMerge);
      return this;
    }
  }, {
    key: "_createValueFromClassApiCall",
    value: function _createValueFromClassApiCall(newValue, oldValue) {
      var isMerge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var value;

      if (isArray(newValue) && isArray(oldValue) && isMerge) {
        value = [].concat(_toConsumableArray(oldValue), _toConsumableArray(newValue));
      } else if (isObject(newValue) && isObject(oldValue) && isMerge) {
        value = _objectSpread({}, oldValue, newValue);
      } else {
        value = newValue;
      }

      return value;
    }
  }, {
    key: "_resetFieldData",
    value: function _resetFieldData() {
      var _this$_getDefaultFiel = this._getDefaultFieldData(),
          attributes = _this$_getDefaultFiel.attributes,
          rest = _objectWithoutProperties(_this$_getDefaultFiel, ["attributes"]);

      this.fieldData = _objectSpread({}, rest, {
        attributes: _objectSpread({}, attributes, this.defaultAttributes)
      });
      return this;
    }
  }, {
    key: "_getDefaultFieldData",
    value: function _getDefaultFieldData() {
      return {
        attributes: {
          type: "text",
          name: null,
          value: null
        },
        validators: []
      };
    }
  }]);

  return InputSchemeFactory;
}();

var _default = InputSchemeFactory;
exports.default = _default;
},{}],"dUpu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = exports.image = exports.text = void 0;

var _InputSchemeFactory = _interopRequireDefault(require("./InputSchemeFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isf = new _InputSchemeFactory.default({
  required: true
});

var createMessageFields = function createMessageFields(type) {
  for (var _len = arguments.length, fields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fields[_key - 1] = arguments[_key];
  }

  return [getMessageTypeField(type)].concat(fields);
};

var getMessageTypeField = function getMessageTypeField(type) {
  return isf.hidden("message_type").value(type).get();
};
/**
 * **********
 * VALIDATORS
 * **********
 */


var validator = {
  httpsUrl: {
    // https://developers.line.biz/en/reference/messaging-api/#image-message
    validator: function validator(value) {
      return /^https:\/\/.*/g.test(value) && value.length <= 1000;
    },
    message: "Image URL scheme must be HTTPS"
  },
  getTextLengthValidator: function getTextLengthValidator(limit) {
    return {
      validator: function validator(value) {
        return value.length <= limit;
      },
      message: "Text length must not exceed ".concat(limit, " characters")
    };
  }
};
/**
 * **********
 * FIELDS
 * **********
 */

var text = createMessageFields("text", isf.text("text").validator(validator.getTextLengthValidator(2000)).get());
exports.text = text;
var image = createMessageFields("image", isf.text("originalContentUrl").validator(validator.httpsUrl).get(), isf.text("previewImageUrl").validator(validator.httpsUrl).get());
exports.image = image;
var location = createMessageFields("location", isf.text("title").validator(validator.getTextLengthValidator(100)).get(), isf.text("address").validator(validator.getTextLengthValidator(100)).get(), isf.number("lattitude").validator({
  validator: function validator(value) {
    return value >= -90 && value <= 90;
  },
  message: "Invalid lattitude value. Valid range is -90 - 90."
}).get(), isf.number("longitude").validator({
  validator: function validator(value) {
    return value >= -180 && value <= 180;
  },
  message: "Invalid longitude value. Valid range is -180 - 180."
}).get());
exports.location = location;
},{"./InputSchemeFactory":"A6es"}],"Focm":[function(require,module,exports) {
"use strict";

var schemes = _interopRequireWildcard(require("./message-fields"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

window.schemes = schemes;
},{"./message-fields":"dUpu"}]},{},["Focm"], null)
//# sourceMappingURL=/index.dev.map