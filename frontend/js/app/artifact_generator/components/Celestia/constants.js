import i18n from "../../../../localization/i18n";

export const INITIAL_INPUT_VALUES = {
  "title": "",
  "position": "",
  "main_prop": "",
  "main_prop_val": "",
  "vice_prop1": "",
  "vice_prop2": "",
  "vice_prop3": "",
  "vice_prop4": "",
  "desc_title": "",
  "desc": "",
  "owner": "",
  "image": "",
  "allowBlank": true,
}

export const DEFAULT_CROP_SIZE = {
  unit: "px",
  x: 25,
  y: 25,
  width: 100,
  height: 100,
};

export const INPUT_FIELDS = [
  {
    name: "title",
    text: i18n.t("generator_ui:artifact_title"),
  },
  {
    name: "position",
    text: i18n.t("generator_ui:artifact_position"),
  },
  {
    name: "main_prop",
    text: i18n.t("generator_ui:main_property"),
  },
  {
    name: "main_prop_val",
    text: i18n.t("generator_ui:main_property_value"),
  },
  {
    name: "vice_prop1",
    text: `${i18n.t("generator_ui:secondary_property")} 1`,
  },
  {
    name: "vice_prop2",
    text: `${i18n.t("generator_ui:secondary_property")} 2`,
  },
  {
    name: "vice_prop3",
    text: `${i18n.t("generator_ui:secondary_property")} 3`,
  },
  {
    name: "vice_prop4",
    text: `${i18n.t("generator_ui:secondary_property")} 4`,
  },
  {
    name: "desc_title",
    text: i18n.t("generator_ui:desc_title"),
  },
]

export const IMAGE_SIZE_LIMIT = 1024**2*2;


