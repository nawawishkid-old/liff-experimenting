import { parseFieldName, parseManyFieldNames } from "./fieldNameParser";

describe("parseFieldName", () => {
  let formId = "formId";
  let keyString = `${formId}_key_subkey`;
  let value = "value";
  let field = { name: keyString, value };
  let expected = { key: { subkey: value } };

  test("Must remove form id", () => {
    const result = parseFieldName(field); // here

    expect(result).toEqual(expected);
  });

  test("Field value must be a member of array if name key ends with bracket ([])", () => {
    const keyString = `formId_array[]_0_uri`;
    const field = { name: keyString, value };
    const expected = { array: [{ uri: value }] };

    expect(parseFieldName(field)).toEqual(expected);
  });

  test("Should throw an error if non-numeric key given after array", () => {
    const field = { name: "formId_array[]_haha", value };

    expect(() => parseFieldName(field)).toThrow();
  });
});

describe("parseManyFieldNames", () => {
  let value = "value naja";

  test("Should parse multiple fields", () => {
    const fields = [
      { name: "formId_type", value },
      { name: "formId_template_defaultAction", value },
      { name: "formId_template_actions[]_0_uri", value },
      { name: "formId_template_actions[]_0_type", value },
      { name: "formId_template_actions[]_0_label", value }
    ];
    const expected = {
      type: value,
      template: {
        defaultAction: value,
        actions: [{ uri: value, type: value, label: value }]
      }
    };

    expect(parseManyFieldNames(fields)).toEqual(expected);
  });
});
