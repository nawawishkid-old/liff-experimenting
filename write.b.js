"use strict";

var fs = require("fs");

var scheme = require("./dist/message-fields");

fs.writeFile("src/field-schemes.json", JSON.stringify(scheme), function (err) {
  if (err) {
    console.log(err);
  }
});
