type PanelInput = {
  life: number,
  base_atk: number,
  total_atk: number,
  ctk_rate: number,
  ctk_dmg: number,
  ele_mastery: number,
  ele_buff: number,
  react_ratio: number,
};

type DmgBundle = {
  unCtkEdDmg: number,
  ctkEdDmg: number,
  expectedDmg: number,
};

type ChartSettingRow = {
  name: string,
  step: number,
  value: string,
};
