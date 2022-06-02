export const MAIN_PROP_TYPES = ['生命值',
  '生命值百分比',
  '攻击力',
  '攻击力百分比',
  '元素精通',
  '元素充能效率',
  '风元素伤害加成',
  '火元素伤害加成',
  '水元素伤害加成',
  '雷元素伤害加成',
  '岩元素伤害加成',
  '冰元素伤害加成',
  '物理伤害加成',
  '治疗加成',
  '防御力',
  '防御力百分比',
  '暴击率',
  '暴击伤害'];

export const FLOWER_CONSTRAINT = ['生命值'];

export const FEATHER_CONSTRAINT = ['攻击力'];

export const SANDGLASS_CONSTRAINT = [
  '攻击力百分比',
  '元素精通',
  '生命值百分比',
  '元素充能效率',
  '防御力百分比'];

export const GOBLET_CONSTRAINT = [
  '攻击力百分比',
  '元素精通',
  '生命值',
  '风元素伤害加成',
  '火元素伤害加成',
  '水元素伤害加成',
  '雷元素伤害加成',
  '岩元素伤害加成',
  '冰元素伤害加成',
  '物理伤害加成',
  '防御力'];

export const CROWN_CONSTRAINT = [
  '治疗加成',
  '防御力百分比',
  '暴击率',
  '暴击伤害',
  '攻击力百分比',
  '元素精通',];

export const VICE_PROP_TYPE = [
  '攻击力',
  '生命值',
  '防御力',
  '攻击力百分比',
  '生命值百分比',
  '防御力百分比',
  '元素精通',
  '元素充能效率',
  '暴击率',
  '暴击伤害'];


export const POSITION = {
  'flower': '生之花',
  'feather': '死之羽',
  'sandglass': '时之沙',
  'goblet': '空之杯',
  'crown': '理之冠'
}

// export const MAIN_PROP_RATE = {
//   "攻击力百分比": '46.6%',
//   '攻击力': '311',
//   '元素精通': '187',
//   '生命值': '4780',
//   '生命值百分比': '46.6%',
//   '风元素伤害加成': '46.6%',
//   '火元素伤害加成': '46.6%',
//   '水元素伤害加成': '46.6%',
//   '雷元素伤害加成': '46.6%',
//   '岩元素伤害加成': '46.6%',
//   '冰元素伤害加成': '46.6%',
//   '物理伤害加成': '58.3%',
//   '防御力': '58.3%',
//   '暴击率': '31.1%',
//   '暴击伤害': '62.2%',
//   '治疗加成': '35.9%',
//   '元素充能效率': '51.8%',
// }

export const ARTIFACT_NAMES = {
  'flower': '明威之镡',
  'feather': '切落之羽',
  'sand': '雷云之笼',
  'cup': '绯花之壶',
  'head': '华饰之兜',
}

const localizations = {
  'zh-cn': {

    'MAIN_PROP_TYPES': ['生命值',
      '生命值百分比',
      '攻击力',
      '攻击力百分比',
      '元素精通',
      '元素充能效率',
      '风属性加成',
      '火属性加成',
      '水属性加成',
      '雷属性加成',
      '岩属性加成',
      '冰属性加成',
      '物理伤害加成',
      '治疗加成',
      '防御力',
      '防御力百分比',
      '暴击率',
      '暴击伤害'],

    'FLOWER_CONSTRAINT': ['生命值'],

    'FEATHER_CONSTRAINT': ['攻击力'],

    'SANDGLASS_CONSTRAINT': [
      '攻击力百分比',
      '元素精通',
      '生命值百分比',
      '元素充能效率',
      '防御力百分比'],

    'CROWN_CONSTRAINT': [
      '治疗加成',
      '防御力百分比',
      '暴击率',
      '暴击伤害',
      '攻击力百分比',
      '元素精通',],

    'GOBLET_CONSTRAINT': [
      '攻击力百分比',
      '元素精通',
      '生命值',
      '风元素伤害加成',
      '火元素伤害加成',
      '水元素伤害加成',
      '雷元素伤害加成',
      '岩元素伤害加成',
      '冰元素伤害加成',
      '物理伤害加成',
      '防御力'],

    'VICE_PROP_TYPE': [
      '攻击力',
      '生命值',
      '防御力',
      '攻击力百分比',
      '生命值百分比',
      '防御力百分比',
      '元素精通',
      '元素充能效率',
      '暴击率',
      '暴击伤害'],

    'MAIN_PROP_RATE': {
      "攻击力百分比": '46.6%',
      '攻击力': '311',
      '元素精通': '187',
      '生命值': '4780',
      '生命值百分比': '46.6%',
      '风元素伤害加成': '46.6%',
      '火元素伤害加成': '46.6%',
      '水元素伤害加成': '46.6%',
      '雷元素伤害加成': '46.6%',
      '岩元素伤害加成': '46.6%',
      '冰元素伤害加成': '46.6%',
      '物理伤害加成': '58.3%',
      '防御力': '58.3%',
      '暴击率': '31.1%',
      '暴击伤害': '62.2%',
      '治疗加成': '35.9%',
      '元素充能效率': '51.8%',
    },

    'ARTIFACT_NAMES':

      {
        'flower': '明威之镡',
        'feather': '切落之羽',
        'sandglass': '雷云之笼',
        'goblet': '绯花之壶',
        'crown': '华饰之兜',
      }

  },
  'en-us': {

    'MAIN_PROP_TYPES': ['HP',
      'HP %',
      'ATK',
      'ATK %',
      'Elemental Mastery',
      'Energy Recharge',
      'Anemo DMG Bonus',
      'Pyro DMG Bouns',
      'Hydro DMG Bouns',
      'Electro DMG Bouns',
      'Geo DMG Bonus',
      'Cryo DMG Bouns',
      'Physical DMG Bouns',
      'Healing Bonus',
      'DEF',
      'DEF %',
      'CRIT Rate',
      'CRIT DMG'],

    'FLOWER_CONSTRAINT': ['HP'],

    'FEATHER_CONSTRAINT': ['ATK'],

    'SANDGLASS_CONSTRAINT': [
      'ATK %',
      'Elemental Mastery',
      'HP %',
      'Energy Recharge',
      'DEF %'],

    'CROWN_CONSTRAINT': [
      'Healing Bonus',
      'DEF %',
      'CRIT Rate',
      'CRIT DMG',
      'ATK %',
      'Elemental Mastery',],

    'GOBLET_CONSTRAINT': [
      'ATK %',
      'Elemental Mastery',
      'HP',
      'Anemo DMG Bonus',
      'Pyro DMG Bouns',
      'Hydro DMG Bouns',
      'Electro DMG Bouns',
      'Geo DMG Bonus',
      'Cryo DMG Bouns',
      'Physical DMG Bouns',
      'DEF'],

    'VICE_PROP_TYPE': [
      'ATK',
      'HP',
      'DEF',
      'ATK %',
      'HP %',
      'DEF %',
      'Elemental Mastery',
      'Energy Recharge',
      'CRIT Rate',
      'CRIT DMG'],

    'MAIN_PROP_RATE': {
      "ATK %": '46.6%',
      'ATK': '311',
      'Elemental Mastery': '187',
      'HP': '4780',
      'HP %': '46.6%',
      'Anemo DMG Bonus': '46.6%',
      'Pyro DMG Bouns': '46.6%',
      'Hydro DMG Bouns': '46.6%',
      'Electro DMG Bouns': '46.6%',
      'Geo DMG Bonus': '46.6%',
      'Cryo DMG Bouns': '46.6%',
      'Physical DMG Bouns': '58.3%',
      'DEF': '58.3%',
      'CRIT Rate': '31.1%',
      'CRIT DMG': '62.2%',
      'Healing Bonus': '35.9%',
      'Energy Recharge': '51.8%',
    },

    'ARTIFACT_NAMES':

      {
        'flower': 'Magnificient Tsuba',
        'feather': 'Sundered Feather',
        'sandglass': 'Storm Cage',
        'goblet': 'Forest Waved Dignity',
        'crown': 'Ornate Kabuto',
      }
  }
}

export const MAIN_PROP_RATE = {
  "atk_percent": '46.6%',
  'atk': '311',
  'ele_mastery': '187',
  'life': '4780',
  'life_percent': '46.6%',
  'ele_buff': '46.6%',
  'phy_buff': '58.3%',
  'def': '58.3%',
  'ctk_rate': '31.1%',
  'ctk_dmg': '62.2%',
  'heal_buff': '35.9%',
  'recharge_rate': '51.8%',
}

//todo temp solution before localization done
export const MAIN_PROP_TRANS = {
  "atk_percent": '攻击力百分比',
  'atk': '攻击力',
  'ele_mastery': '元素精通',
  'life': '生命值',
  'life_percent': '生命值百分比',
  'ele_buff': '46.6%',
  'phy_buff': '物理伤害加成',
  'def': '防御力',
  'ctk_rate': '暴击率',
  'ctk_dmg': '暴击伤害',
  'heal_buff': '治疗加成',
  'recharge_rate': '元素充能效率',
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
  "sand": SANDGLASS_CONSTRAINT,
  "cup": GOBLET_CONSTRAINT,
  "head": CROWN_CONSTRAINT,
}

export const ARTIFACT_POSITIONS = ["flower", "feather", "sand", "cup", "head"];
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
  position: ARTIFACT_POSITIONS[0],
  main_prop: DEFAULT_MAIN_PROP,
  vice_props: INITIAL_VICE_PROPS,
  used_props: FLOWER_CONSTRAINT,
}
