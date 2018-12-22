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
})({"jc48":[function(require,module,exports) {
document.querySelectorAll("form .field .description-icon").forEach(function (elem) {
  return elem.addEventListener("click", function (e) {
    console.log("description icon clicked!");
    var notiDom = document.querySelector("form .field .field-description[data-for=".concat(this.dataset.for, "]"));
    var method = notiDom.classList.contains("collapse") ? "remove" : "add";
    notiDom.classList[method]("collapse");
  });
});
document.querySelectorAll("form .field .field-description").forEach(function (elem) {
  return elem.querySelector(".delete").addEventListener("click", function () {
    return elem.classList.add("collapse");
  });
});
},{}],"C/Vt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseManyFieldNames = exports.parseFieldName = void 0;

var parseManyFieldNames = function parseManyFieldNames(fields) {
  var starterObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "_";
  return fields.reduce(function (obj, field) {
    return parseFieldName(field, obj);
  }, starterObj, delimiter);
};

exports.parseManyFieldNames = parseManyFieldNames;

var parseFieldName = function parseFieldName(field) {
  var starterObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "_";
  var name = field.name,
      value = field.value;
  var splittedName = name.split(delimiter); // Remove form id

  var keys = splittedName.slice(1);
  keys.reduce(function (obj, key, index) {
    var isLastIndex = !keys[index + 1] ? true : false;

    if (Array.isArray(obj) && isNaN(parseInt(key))) {
      throw new Error("The key preceded by array must be a numeric value, " + key + " given.");
    }

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
  obj[key] = value;
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
},{}],"iynK":[function(require,module,exports) {
"use strict";

var fieldNameParser = _interopRequireWildcard(require("../fieldNameParser"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function handleEachForm(form) {
  var fields = _toConsumableArray(form.elements).filter(function (elem) {
    return elem.tagName !== "BUTTON";
  });

  fields.forEach(handleEachField);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fields.forEach(validateField);
    var liffMessageData = fieldNameParser.parseManyFieldNames(fields); // const liffMessageData = createLiffMessageData(fields);

    console.log("The form is submitted!");
    console.log("liffMessageData: ", liffMessageData);
  });
}

function handleEachField(field) {
  field.addEventListener("input", function (e) {
    return validateField(e.target);
  });
} // Handle all form submission.


document.querySelectorAll("form").forEach(handleEachForm); // Handle all submit buttons
// document.querySelectorAll(".submit-button").forEach(dom =>
//   dom.addEventListener("click", e => {
//     // e.preventDefault();
//     console.log("Submit button is clicked!");
//   })
// );
// Should separate concern

function validateField(field) {
  var validity = field.validity,
      validationMessage = field.validationMessage;
  var messageDom = field.parentElement.parentElement.querySelector(".builtin-message");

  if (!validity.valid) {
    var message = validity.patternMismatch ? field.dataset.errorMessagePattern : validationMessage;
    field.classList.remove("is-success");
    field.classList.add("is-danger");
    messageDom.innerHTML = message || validationMessage;
    return true;
  } else {
    field.classList.remove("is-danger");
    field.classList.add("is-success");
    messageDom.innerHTML = "";
    return false;
  }
}
},{"../fieldNameParser":"C/Vt"}],"mHFU":[function(require,module,exports) {
"use strict";

require("./field-description-effect");

require("./form-validation");
},{"./field-description-effect":"jc48","./form-validation":"iynK"}],"Focm":[function(require,module,exports) {
"use strict";

require("./dom");
},{"./dom":"mHFU"}]},{},["Focm"], null)
//# sourceMappingURL=/index.dev.map