const { isf, createMessageFormFields } = require("../field-builder/helpers");

module.exports = createMessageFormFields(
  "locationMessage",
  "location",
  isf
    .text("title")
    .label("Title")
    .placeholder("Location title")
    .max(100)
    .get(),
  isf
    .text("address")
    .label("Address")
    .placeholder("Your address here...")
    .max(100)
    .get(),
  isf
    .number("latitude")
    .label("Latitude")
    .placeholder("e.g. -18.41242039402342")
    .max(90)
    .min(-90)
    .step(0.00001)
    .get(),
  isf
    .number("longitude")
    .label("Longitude")
    .placeholder("e.g. 173.41242039402342")
    .max(180)
    .min(-180)
    .step(0.00001)
    .get()
);
