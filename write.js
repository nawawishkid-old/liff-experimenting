const fs = require("fs");
const scheme = require("./dist/message-fields");

fs.writeFile("src/field-schemes.json", JSON.stringify(scheme), err => {
  if (err) {
    console.log(err);
  }
});
