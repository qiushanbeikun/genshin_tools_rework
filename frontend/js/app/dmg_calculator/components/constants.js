import type { ChartSettingRow, PanelInput } from './types';

export const INITIAL_PANEL: PanelInput = {
  life: 20000,
  base_atk: 800,
  total_atk: 2000,
  ctk_rate: 60,
  ctk_dmg: 120,
  ele_mastery: 80,
  ele_buff: 61.6,
  react_ratio: 1,
};

export const MASTERY_BASE = 1400;
export const MASTERY_INFLATION = 2.78;
export const GRAPH_COLORS_PRESETS = ['#95d881', '#1db798', '#2a81a6', '#c78ad7'];

export const DEFAULT_BOUNDARY = 3;
export const DEFAULT_SETTINGS: [ChartSettingRow] = [
  { name: 'atk_percent', step: 6, value: 'ATK Percent' },
  { name: 'ctk_rate', step: 3.5, value: 'CTK Rate' },
  { name: 'ctk_dmg', step: 7, value: 'CTK DMG' },
  { name: 'ele_mastery', step: 16, value: 'Ele Mastery' },
];

export const MOCK_PANELS = [
  {
    id: 1,
    panel: {
      life: 20000,
      base_atk: 801,
      total_atk: 2100,
      ctk_rate: 60,
      ctk_dmg: 120,
      ele_mastery: 80,
      ele_buff: 61.6,
      react_ratio: 1,
    },
  },
  {
    id: 2,
    panel: {
      life: 20000,
      base_atk: 802,
      total_atk: 2200,
      ctk_rate: 60,
      ctk_dmg: 120,
      ele_mastery: 80,
      ele_buff: 61.6,
      react_ratio: 1,
    },
  },
  {
    id: 3,
    panel: {
      life: 20000,
      base_atk: 803,
      total_atk: 2300,
      ctk_rate: 60,
      ctk_dmg: 120,
      ele_mastery: 80,
      ele_buff: 61.6,
      react_ratio: 1,
    },
  },
  {
    id: 4,
    panel: {
      life: 20000,
      base_atk: 804,
      total_atk: 2400,
      ctk_rate: 60,
      ctk_dmg: 120,
      ele_mastery: 80,
      ele_buff: 61.6,
      react_ratio: 1,
    },
  },
];

export const PANEL_NAME_TO_TEXT = {
  life: 'Life',
  base_atk: 'Base ATK',
  total_atk: 'Total ATK',
  ctk_rate: 'CTK Rate',
  ctk_dmg: 'CTK Dmg',
  ele_mastery: 'Ele Mastery',
  ele_buff: 'Element Buff',
  react_ratio: 'React Ratio',
};
