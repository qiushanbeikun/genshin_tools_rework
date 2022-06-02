import {
  ARTIFACT_NAMES,
  ENHANCE_RATES,
  INITIAL_ARTI_CONFIG, MAIN_PROP_RATE, POSITION_CONSTRAINTS,
  VICE_PROP_TYPE
} from "./constants";

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
  return (prop.includes('百分比') ? prop.replace('百分比', '') : prop)
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
  return (9 - vice_props.map((prop)=> prop.count).reduce((acc, cur) => acc + cur, 0)) > 0;
}

export function getNewUsedProps(curUsedProps, curIdx, prevIdx) {
  // remove previous one
  let res = [...curUsedProps]
  console.log(res)
  if (prevIdx !== 0) {
    res.splice(res.indexOf(VICE_PROP_TYPE[prevIdx - 1]), 1)
  }
  console.log(res)
  // add current
  if (curIdx !== 0) {
    res = [...res, VICE_PROP_TYPE[curIdx - 1]]
  }
  console.log(res)
  return res;
}

export function getParsedArtiConfig(artiConfig) {
  console.log(artiConfig)
  const VICE_NAMES = ['viceOne', 'viceTwo', 'viceThree', 'viceFour'];
  const position = artiConfig.position;
  const constraints = POSITION_CONSTRAINTS[position];
  const mainPropName = constraints[artiConfig.main_prop];
  console.log(artiConfig, constraints, mainPropName)
  let res = {
    "title": ARTIFACT_NAMES[position],
    "position": position,
    "mainProp": propNameParser(mainPropName),
    'mainPropRate': MAIN_PROP_RATE[mainPropName],
  }
  VICE_NAMES.map((name, index) => {
    const ctx = artiConfig.vice_props[index];
    const prop = ctx.prop;
    const count = ctx.count;
    console.log(prop, count)
    res = Object.assign(res, {[name]: `${propNameParser(VICE_PROP_TYPE[prop - 1])} +${calcEnhance(prop, count)}`})
  })
  console.log(res)
  return res;
}

export function getNewViceProps(curViceProps, ctx, index) {
  let res = [...curViceProps];
  res[index] = ctx;
  return res;
}
