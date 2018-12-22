const {
  isf,
  createMessageFormFields,
  urlPatternArgs,
  lineActionUriPatternArgs,
  getDefaultActionUriFieldInstances
} = require("../field-builder/helpers");

const altText = isf
  .textArea("altText")
  .label("Alternative text")
  .max(400)
  .get();
const templateType = isf
  .hidden("template_type")
  .value("buttons")
  .get();
const templateText = isf
  .textArea("template_text")
  .label("Text message")
  .description(
    "Max to 160 characters if there is no image or title. Otherwise, max to 60 characters"
  )
  .max(160)
  .get();
const templateTitle = isf
  .text("template_title")
  .label("Title")
  .max(40)
  .optional()
  .get();
const templateThumbnailImageUrl = isf
  .url("template_thumbnailImageUrl")
  .label("Thumbnail image URL")
  .description(
    "Image must be .jpeg or .png with maximum width of 1,024px and less than or equal to 1Mb in size."
  )
  .pattern(...urlPatternArgs)
  .max(1000)
  .optional()
  .get();
const templateImageAspectRatio = isf
  .select("template_imageAspectRatio")
  .label("Image aspect ratio")
  .options([
    {
      title: "rectangle (1.51:1)",
      value: "rectangle"
    },
    { title: "square (1:1)", value: "square" }
  ])
  .value("rectangle")
  .optional()
  .get();
const templateImageSize = isf
  .select("template_imageSize")
  .label("Image size")
  .options([
    { title: "cover", value: "cover" },
    { title: "contain", value: "contain" }
  ])
  .value("cover")
  .optional()
  .get();
const templateImageBackgroundColor = isf
  .color("template_imageBackgroundColor")
  .label("Image background color")
  // Color problem here: https://stackoverflow.com/questions/39264722/onchange-event-is-not-working-in-color-type-input
  .value("#f2f2f2")
  .optional()
  .get();
const templateDefaultActionType = isf
  .hidden("template_defaultAction_type")
  .value("uri")
  .get();
const templateDefaultActionLabel = isf
  .text("template_defaultAction_label")
  .label("Default action label")
  .max(20)
  .optional()
  .get();
const templateDefaultActionUri = isf
  .url("template_defaultAction_uri")
  .label("Default action link URL")
  .pattern(...lineActionUriPatternArgs)
  .description("Link URL to be opened when tapped.")
  .max(1000)
  .optional()
  .get();
const templateDefaultAction = [
  templateDefaultActionType,
  templateDefaultActionLabel,
  templateDefaultActionUri
];

const templateActions = getDefaultActionUriFieldInstances(0).map(field =>
  field
    .duplicatable()
    .maxDuplications(4)
    .get()
);

module.exports = createMessageFormFields(
  "templateButtonMessage",
  "template",
  altText,
  templateType,
  templateText,
  templateTitle,
  templateThumbnailImageUrl,
  templateImageAspectRatio,
  templateImageSize,
  templateImageBackgroundColor,
  ...templateDefaultAction,
  ...templateActions
);
