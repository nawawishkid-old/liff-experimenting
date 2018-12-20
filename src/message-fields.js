const InputSchemeFactory = require("./InputSchemeFactory");

const isf = new InputSchemeFactory({ required: true });
const createMessageFields = (type, ...fields) => [
  getMessageTypeField(type),
  ...fields
];

const getMessageTypeField = type =>
  isf
    .hidden("message_type")
    .value(type)
    .get();

/**
 * **********
 * VALIDATORS
 * **********
 */
const validator = {
  httpsUrl: {
    // https://developers.line.biz/en/reference/messaging-api/#image-message
    validator: value => /^https:\/\/.*/g.test(value) && value.length <= 1000,
    message: "Image URL scheme must be HTTPS"
  },
  getTextLengthValidator: limit => ({
    validator: value => value.length <= limit,
    message: `Text length must not exceed ${limit} characters`
  })
};
/**
 * **********
 * FIELDS
 * **********
 */
module.exports.text = createMessageFields(
  "text",
  isf
    .textArea("text")
    .label("Text")
    .validator(validator.getTextLengthValidator(2000))
    .placeholder("Your message goes here...")
    .value("Hello! This message is sent from LIFF!")
    .max(2000)
    .get()
);

const urlPatternArgs = [
  "^https:\\/\\/([a-z]+\\.[a-z]{2,})+.*$",
  "URL must be HTTPS, HTTP not allowed."
];
module.exports.image = createMessageFields(
  "image",
  isf
    .url("originalContentUrl")
    .label("Original Content URL")
    .description(
      "Image URL. Must be .jpeg file with 1024x1024 px maximum resolution and under 1Mb in size."
    )
    .validator(validator.httpsUrl)
    .pattern(...urlPatternArgs)
    .max(1000)
    .get(),
  isf
    .url("previewImageUrl")
    .label("Preview Image URL")
    .description(
      "Preview image URL. <p>Must be .jpeg file with 240x240 px maximum resolution and under 1Mb in size.</p>"
    )
    .validator(validator.httpsUrl)
    .pattern(...urlPatternArgs)
    .max(1000)
    .get()
);

module.exports.location = createMessageFields(
  "location",
  isf
    .text("title")
    .label("Title")
    .placeholder("Location title")
    .validator(validator.getTextLengthValidator(100))
    .max(100)
    .get(),
  isf
    .text("address")
    .label("Address")
    .placeholder("Your address here...")
    .validator(validator.getTextLengthValidator(100))
    .max(100)
    .get(),
  isf
    .number("latitude")
    .label("Latitude")
    .placeholder("e.g. -18.41242039402342")
    .validator({
      validator: value => value >= -90 && value <= 90,
      message: "Invalid latitude value. Valid range is -90 - 90."
    })
    .max(90)
    .min(-90)
    .step(0.00001)
    .get(),
  isf
    .number("longitude")
    .label("Longitude")
    .placeholder("e.g. 173.41242039402342")
    .validator({
      validator: value => value >= -180 && value <= 180,
      message: "Invalid longitude value. Valid range is -180 - 180."
    })
    .max(180)
    .min(-180)
    .step(0.00001)
    .get()
);
