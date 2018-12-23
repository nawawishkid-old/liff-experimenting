const { isf, createMessageFormFields } = require("./helpers");

module.exports = createMessageFormFields(
  "textMessage",
  "text",
  isf
    .textArea("text")
    .label("Text")
    .placeholder("Your message goes here...")
    .value("Hello! This message is sent from LIFF!")
    .max(2000)
    .get()
);
