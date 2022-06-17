import i18n from "../../../../localization/i18n";

export const FLOWER_CONSTRAINT = [i18n.t("artifact_props:hp")];

export const FEATHER_CONSTRAINT = [i18n.t("artifact_props:atk")];

export const SAND_CONSTRAINT = [
  i18n.t("artifact_props:atk_percent"),
  i18n.t("artifact_props:ele_mastery"),
  i18n.t("artifact_props:hp_percent"),
  i18n.t("artifact_props:recharge_rate"),
  i18n.t("artifact_props:def_percent")];

export const GOBLET_CONSTRAINT = [
  i18n.t("artifact_props:atk_percent"),
  i18n.t("artifact_props:hp_percent"),
  i18n.t("artifact_props:def_percent"),
  i18n.t("artifact_props:ele_mastery"),
  i18n.t("artifact_props:hydro_buff"),
  i18n.t("artifact_props:pyro_buff"),
  i18n.t("artifact_props:electro_buff"),
  i18n.t("artifact_props:geo_buff"),
  i18n.t("artifact_props:anemo_buff"),
  i18n.t("artifact_props:cryo_buff"),
  i18n.t("artifact_props:phy_buff"),
];

export const HEAD_CONSTRAINT = [
  i18n.t("artifact_props:heal_buff"),
  i18n.t("artifact_props:def_percent"),
  i18n.t("artifact_props:ctk_rate"),
  i18n.t("artifact_props:ctk_dmg"),
  i18n.t("artifact_props:atk_percent"),
  i18n.t("artifact_props:ele_mastery"),
];

export const VICE_PROP_TYPE = [
  i18n.t("artifact_props:atk"),
  i18n.t("artifact_props:hp"),
  i18n.t("artifact_props:def"),
  i18n.t("artifact_props:atk_percent"),
  i18n.t("artifact_props:hp_percent"),
  i18n.t("artifact_props:def_percent"),
  i18n.t("artifact_props:ele_mastery"),
  i18n.t("artifact_props:recharge_rate"),
  i18n.t("artifact_props:ctk_rate"),
  i18n.t("artifact_props:ctk_dmg"),
];


export const POSITION = {
  'flower': i18n.t("artifact_positions:flower"),
  'feather': i18n.t("artifact_positions:feather"),
  'sand': i18n.t("artifact_positions:sand"),
  'goblet': i18n.t("artifact_positions:goblet"),
  'head': i18n.t("artifact_positions:head"),
}

export const ENHANCE_RATES = {
  'atk_num': [14, 16, 18, 19],
  'life_num': [209, 239, 269, 299],
  'def_num': [16, 19, 21, 23],
  'atk_percent': [4.1, 4.7, 5.3, 5.8],
  'life_percent': [4.1, 4.7, 5.4, 5.8],
  'def_percent': [5.1, 5.8, 6.6, 7.3],
  'ele_mastery': [16, 19, 21, 23],
  'recharge_rate': [4.5, 5.2, 5.8, 6.5],
  'ctk_rate': [2.7, 3.1, 3.5, 3.9],
  'ctk_dmg': [5.4, 6.2, 7.0, 7.8],
}

export const POSITION_CONSTRAINTS = {
  "flower": FLOWER_CONSTRAINT,
  "feather": FEATHER_CONSTRAINT,
  "sand": SAND_CONSTRAINT,
  "goblet": GOBLET_CONSTRAINT,
  "head": HEAD_CONSTRAINT,
}

export const ARTIFACT_POSITIONS = ["flower", "feather", "sand", "goblet", "head"];
export const DEFAULT_MAIN_PROP = 0;
export const INITIAL_VICE_PROPS = [
  {
    prop: 0,
    count: 1,
  },
  {
    prop: 0,
    count: 1,
  },
  {
    prop: 0,
    count: 1,
  },
  {
    prop: 0,
    count: 1,
  },
]

export const INITIAL_ARTI_CONFIG = {
  artiSet: 0,
  position: ARTIFACT_POSITIONS[0],
  main_prop: DEFAULT_MAIN_PROP,
  vice_props: INITIAL_VICE_PROPS,
  used_props: FLOWER_CONSTRAINT,
}
