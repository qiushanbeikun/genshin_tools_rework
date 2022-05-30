import {
  ARTIFACT_NAMES,
  CROWN_CONSTRAINT,
  ENHANCE_RATES,
  FEATHER_CONSTRAINT,
  FLOWER_CONSTRAINT,
  GOBLET_CONSTRAINT, INITIAL_ARTI_CONFIG, MAIN_PROP_RATE, MAIN_PROP_TYPES,
  SANDGLASS_CONSTRAINT, VICE_PROP_TYPE
} from "./constants";

const randomEnhance = (list, level) => {
  let result = 0;
  for (let i = 0; i < level; i++) {
    result += list[Math.floor(Math.random() * 3)];
  }
  return result;
}


export const calcEnhancement = (prop, level) => {
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

export const propTypeParser = (prop) => {
  return (prop.includes('百分比') ? prop.replace('百分比', '') : prop)
}

export function getConstraint(position) {
  switch (position) {
    case "flower":
      return FLOWER_CONSTRAINT;
    case "feather":
      return FEATHER_CONSTRAINT;
    case "sand":
      return SANDGLASS_CONSTRAINT;
    case "cup":
      return GOBLET_CONSTRAINT;
    case "head":
      return CROWN_CONSTRAINT;
    default:
    case "all":
      return MAIN_PROP_TYPES;
  }
}

export function ucFirst(str) {
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

export const isEnhanceAble = (artiConfig) => {
  return (9 - artiConfig.vice_counts.reduce((acc, cur) => acc + cur, 0)) > 0;
}

export function getNewUsedProps(curUsedProps, curIdx, prevIdx) {
  // remove previous one
  if (prevIdx !== 0) {
    curUsedProps.splice(curUsedProps.indexOf(VICE_PROP_TYPE[prevIdx - 1]), 1)
  }
  let res = curUsedProps;
  // add current
  if (curIdx !== 0) {
    res = [...res, VICE_PROP_TYPE[curIdx - 1]]
  }
  return res;
}

export function getParsedArtiConfig(artiConfig, constraints) {
  const VICE_NAMES = ['viceOne', 'viceTwo', 'viceThree', 'viceFour'];
  const position = artiConfig.position;
  const mainProp = constraints[artiConfig.main_prop];
  console.log(artiConfig, constraints, mainProp)
  let res = {
    "title": ARTIFACT_NAMES[position],
    "position": position,
    "mainProp": propTypeParser(mainProp),
    'mainPropRate': MAIN_PROP_RATE[mainProp],
  }
  VICE_NAMES.map((name, index) => {
    const prop = artiConfig.vice_props[index];
    const count = artiConfig.vice_counts[index];
    console.log(prop, count, mainProp)
    res = Object.assign(res, {[name]: `${propTypeParser(VICE_PROP_TYPE[prop-1])} +${calcEnhancement(prop, count)}`})
  })
  return res;
}
