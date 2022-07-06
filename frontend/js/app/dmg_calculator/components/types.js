export interface PanelInput {
  life: number;
  base_atk: number;
  total_atk: number;
  ctk_rate: number;
  ctk_dmg: number;
  ele_mastery: number;
  ele_buff: number;
  react_ratio: number;
}

export interface IndexedPanel {
  id: number;
  panel: PanelInput;
}

export interface DmgBundle {
  unCtkEdDmg: number;
  ctkEdDmg: number;
  expectedDmg: number;
}

export interface ChartSettingRow {
  name: string;
  step: number;
  value: string;
}
