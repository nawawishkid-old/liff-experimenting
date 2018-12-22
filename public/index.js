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
})({"fieldNameParser.js":[function(require,module,exports) {
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var fieldNameParser = _interopRequireWildcard(require("./fieldNameParser"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Initialize LIFF SDK
window.onload = function () {
  liff.init(function (data) {
    return initProfileUi();
  }, function (err) {
    // Show user profile as 'Anonymous'
    document.getElementById("user-greeting").classList.remove("is-invisible"); // Show warning message about LIFF.

    document.getElementById("warn-message-wrapper").classList.remove("collapse");
  });
}; // Handle all forms submission.


document.querySelectorAll("form").forEach(function handleEachForm(form) {
  var fields = _toConsumableArray(form.elements).filter(function (elem) {
    return elem.tagName !== "BUTTON";
  }); // Validate form on field input


  fields.forEach(function (field) {
    return field.addEventListener("input", function (e) {
      return validateField(e.target);
    });
  }); // Handle form submission.

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fields.forEach(validateField);

    if (!this.checkValidity()) {
      return;
    }

    var liffMessageData = fieldNameParser.parseManyFieldNames(fields);
    console.log("The form is submitted!");
    console.log("liffMessageData: ", liffMessageData);

    if (typeof liff.sendMessages === "undefined") {
      createResponse("warning", "Could not send message!");
      return;
    }

    liff.sendMessages(messages[node.dataset.messageType]);
    createResponse("success", "Message sent!");
  });
}); // Should separate concern

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
} // Toggle field description panel when field info icon is clicked.


document.querySelectorAll("form .field .description-icon").forEach(function (elem) {
  return elem.addEventListener("click", function () {
    console.log("description icon clicked!");
    var notiDom = document.querySelector("form .field .field-description[data-for=".concat(this.dataset.for, "]"));
    var method = notiDom.classList.contains("collapse") ? "remove" : "add";
    notiDom.classList[method]("collapse");
  });
}); // Close field description when delete icon is clicked.

document.querySelectorAll("form .field .field-description").forEach(function (elem) {
  return elem.querySelector(".delete").addEventListener("click", function () {
    return elem.classList.add("collapse");
  });
});

function createResponse(type, message) {
  var dom = document.createElement("span");
  var responsesBox = document.getElementById("responses");
  dom.classList.add("response", "tag", "is-".concat(type), "is-medium");
  dom.innerHTML = message;
  responsesBox.appendChild(dom);
  setTimeout(function () {
    return dom.classList.add("active");
  });
  setTimeout(function () {
    return responsesBox.firstElementChild.classList.remove("active");
  }, 3000);
  setTimeout(function () {
    return responsesBox.removeChild(responsesBox.firstElementChild);
  }, 3800);
}

function initProfileUi() {
  if (typeof liff.getProfile === "undefined") {
    return;
  }

  liff.getProfile().then(function (profile) {
    var displayName = profile.displayName,
        pictureUrl = profile.pictureUrl;
    var profileImageDom = document.querySelector("#profile-image img");
    var userGreetingDom = document.getElementById("user-greeting");
    var profileNameP = document.getElementById("profile-name");
    profileNameP.textContent = displayName;
    userGreetingDom.classList.remove("is-invisible");
    profileImageDom.src = pictureUrl;
    profileImageDom.classList.remove("is-invisible");
  }).catch(function (err) {
    console.log(err);
  });
}
},{"./fieldNameParser":"fieldNameParser.js"}],"../../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63126" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map