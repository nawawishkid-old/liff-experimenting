const { getDefaultActionUriFieldInstances } = require("./helpers");
const fields = require("./common-fields");

const name = "template_columns[]_0_";

module.exports = [
  fields
    .templateThumbnailImageUrl()
    .name(name + "thumbnailImageUrl")
    .get(),
  fields
    .templateImageBackgroundColor()
    .name(name + "imageBackgroundColor")
    .get(),
  fields
    .templateTitle()
    .name(name + "title")
    .get(),
  fields
    .templateText()
    .name(name + "text")
    .required()
    .get(),
  ...fields.getDefaultAction(name),
  ...getDefaultActionUriFieldInstances(name.slice(0, -1), 0).map(f =>
    f
      .duplicatable()
      .maxDuplications(3)
      .get()
  )
];
