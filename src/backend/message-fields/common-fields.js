const InputSchemeFactory = require("../field-builder/InputSchemeFactory");

const urlPatternArgs = [
  "^https:\\/\\/([\\w-]+\\.[\\w-])+.*$",
  "URL must be HTTPS, HTTP not allowed."
];

const lineActionUriPatternArgs = [
  "^((http|https):\\/\\/([\\w-]+\\.[\\w-])+|line:\\/\\/([\\w-]+\\/*)+|tel).*$",
  "The available schemes are <code>http</code>, <code>https</code>, <code>line</code>, and <code>tel</code>"
];
const templateImageAspectRatio = () =>
  new InputSchemeFactory()
    .select("template_imageAspectRatio")
    .label("Image aspect ratio")
    .options([
      {
        title: "rectangle (1.51:1)",
        value: "rectangle"
      },
      { title: "square (1:1)", value: "square" }
    ])
    .value("rectangle");
const templateImageSize = () =>
  new InputSchemeFactory()
    .select("template_imageSize")
    .label("Image size")
    .options([
      { title: "cover", value: "cover" },
      { title: "contain", value: "contain" }
    ])
    .value("cover");
const templateThumbnailImageUrl = () =>
  new InputSchemeFactory()
    .url("template_thumbnailImageUrl")
    .label("Thumbnail image URL")
    .description(
      "Image must be .jpeg or .png with maximum width of 1,024px and less than or equal to 1Mb in size."
    )
    .pattern(...urlPatternArgs)
    .max(1000);
const templateImageBackgroundColor = () =>
  new InputSchemeFactory()
    .color("template_imageBackgroundColor")
    .label("Image background color")
    // Color problem here: https://stackoverflow.com/questions/39264722/onchange-event-is-not-working-in-color-type-input
    .value("#f2f2f2");
const templateTitle = () =>
  new InputSchemeFactory()
    .text("template_title")
    .label("Title")
    .max(40);
const templateText = () =>
  new InputSchemeFactory()
    .textArea("template_text")
    .label("Text message")
    .description(
      "Max to 160 characters if there is no image or title. Otherwise, max to 60 characters"
    )
    .max(160);
const altText = () =>
  new InputSchemeFactory()
    .textArea("altText")
    .label("Alternative text")
    .max(400)
    .required();

const getDefaultAction = name => {
  const isf = new InputSchemeFactory();

  const templateDefaultActionType = isf
    .hidden(`${name}_defaultAction_type`)
    .value("uri")
    .group("defaultAction")
    .get();
  const templateDefaultActionLabel = isf
    .text(`${name}_defaultAction_label`)
    .label("Default action label")
    .max(20)
    .group("defaultAction")
    .get();
  const templateDefaultActionUri = isf
    .url(`${name}_defaultAction_uri`)
    .label("Default action link URL")
    .pattern(...lineActionUriPatternArgs)
    .description("Link URL to be opened when tapped.")
    .max(1000)
    .group("defaultAction")
    .get();
  const templateDefaultAction = [
    templateDefaultActionType,
    templateDefaultActionLabel,
    templateDefaultActionUri
  ];

  return templateDefaultAction;
};

module.exports = {
  altText,
  templateTitle,
  templateText,
  templateImageAspectRatio,
  templateImageSize,
  templateThumbnailImageUrl,
  templateImageBackgroundColor,
  urlPatternArgs,
  lineActionUriPatternArgs,
  getDefaultAction
};
