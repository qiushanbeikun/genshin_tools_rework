import {
  ARTIFACT_NAMES,
  ENHANCE_RATES,
  INITIAL_ARTI_CONFIG, POSITION, POSITION_CONSTRAINTS,
  VICE_PROP_TYPE
} from "./constants";

import i18n from "../../../../localization/i18n";

const randomEnhance = (list, level) => {
  let result = 0;
  for (let i = 0; i < level; i++) {
    result += list[Math.floor(Math.random() * 3)];
  }
  return result;
}

export const calcEnhance = (prop, level) => {
  switch (prop) {
    case 1:
      return randomEnhance(ENHANCE_RATES.atk_num, level);
    case 2:
      return randomEnhance(ENHANCE_RATES.life_num, level);
    case 3:
      return randomEnhance(ENHANCE_RATES.def_num, level);
    case 4:
      return (randomEnhance(ENHANCE_RATES.atk_percent, level)).toFixed(1) + '%';
    case 5:
      return (randomEnhance(ENHANCE_RATES.life_percent, level)).toFixed(1) + '%';
    case 6:
      return (randomEnhance(ENHANCE_RATES.def_percent, level)).toFixed(1) + '%';
    case 7:
      return randomEnhance(ENHANCE_RATES.ele_mastery, level);
    case 8:
      return (randomEnhance(ENHANCE_RATES.recharge_rate, level)).toFixed(1) + '%';
    case 9:
      return (randomEnhance(ENHANCE_RATES.ctk_rate, level)).toFixed(1) + '%';
    case 10:
      return (randomEnhance(ENHANCE_RATES.ctk_dmg, level)).toFixed(1) + '%';
    default:
      return -1
  }
}

export const propNameParser = (prop) => {
  const percent = i18n.t("generator_ui:percent")
  return (prop.includes(percent) ? prop.replace(percent, '') : prop)
}

export function upperCase(str) {
  let firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

export function resetViceProps(curPos, curMainProp = 0) {
  return {
    ...INITIAL_ARTI_CONFIG,
    ["position"]: curPos,
    ["main_prop"]: curMainProp,
  }
}

export const isEnhanceAble = (vice_props) => {
  return (9 - vice_props.map((prop) => prop.count).reduce((acc, cur) => acc + cur, 0)) > 0;
}

export function getNewUsedProps(curUsedProps, curIdx, prevIdx) {
  // remove previous
  let res = [...curUsedProps]
  if (prevIdx !== 0) {
    res.splice(res.indexOf(VICE_PROP_TYPE[prevIdx - 1]), 1)
  }
  // add current
  if (curIdx !== 0) {
    res = [...res, VICE_PROP_TYPE[curIdx - 1]]
  }
  return res;
}

export function getParsedArtiConfig(artiConfig, selectedSetName) {
  const VICE_NAMES = ['viceOne', 'viceTwo', 'viceThree', 'viceFour'];
  const position = artiConfig.position;
  const constraints = POSITION_CONSTRAINTS[position];
  const mainPropName = constraints[artiConfig.main_prop];
  let res = {
    // "title": ARTIFACT_NAMES[position],
    "position": position,
    "position_name": POSITION[position],
    "mainProp": propNameParser(mainPropName),
    'mainPropRate': getMainPropRate(mainPropName),
    "artiSet": selectedSetName,
  }
  VICE_NAMES.map((name, index) => {
    const ctx = artiConfig.vice_props[index];
    const prop = ctx.prop;
    const count = ctx.count;
    res = Object.assign(res, {[name]: `${propNameParser(VICE_PROP_TYPE[prop - 1])}+${calcEnhance(prop, count)}`})
  })
  console.log(res);
  return res;
}

export function getNewViceProps(curViceProps, ctx, index) {
  let res = [...curViceProps];
  res[index] = ctx;
  return res;
}

export function getMainPropRate(mainPropName) {
  switch (mainPropName) {
    case i18n.t("artifact_props:atk"):
      return "311"
    case i18n.t("artifact_props:ele_mastery"):
      return "187"
    case i18n.t("artifact_props:recharge_rate"):
      return "51.8%"
    case i18n.t("artifact_props:def_percent"):
    case i18n.t("artifact_props:phy_buff"):
      return "58.3%"
    case i18n.t("artifact_props:hp"):
      return "4,780"
    case i18n.t("artifact_props:ctk_rate"):
      return "31.1%"
    case i18n.t("artifact_props:ctk_dmg"):
      return "62.2%"
    case i18n.t("artifact_props:heal_buff"):
      return "35.9%"
    case i18n.t("artifact_props:atk_percent"):
    case i18n.t("artifact_props:hp_percent"):
    case i18n.t("artifact_props:hydro_buff"):
    case i18n.t("artifact_props:pyro_buff"):
    case i18n.t("artifact_props:electro_buff"):
    case i18n.t("artifact_props:geo_buff"):
    case i18n.t("artifact_props:anemo_buff"):
    case i18n.t("artifact_props:cryo_buff"):
    default:
      return "46.6%"
  }
}
