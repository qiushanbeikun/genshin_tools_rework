import { getMuteDelta, panelsToDmgList } from './utils';
import type { PanelInput } from '../../types';

export const generatePanelList = (
  boundary: number,
  basePanel: PanelInput,
  mutableField: string,
  muteStep: number
): [PanelInput] => {
  mutableField = mutableField === 'atk_percent' ? 'total_atk' : mutableField;
  const totalIndex = boundary * 2;
  const list = Array(boundary * 2 + 1);
  for (let i = boundary; i >= 0; i--) {
    const basePanelCopy = { ...basePanel };
    const basePanelCopy2 = { ...basePanel };
    const muteDelta = getMuteDelta(boundary - i, muteStep, mutableField, basePanel);
    basePanelCopy[mutableField] -= muteDelta;
    list[i] = basePanelCopy;
    basePanelCopy2[mutableField] += muteDelta;
    list[totalIndex - i] = basePanelCopy2;
  }
  return list;
};

export const baseChartData = (boundary, field, basePanel) => {
  const panelList = generatePanelList(boundary, basePanel, field.name, field.step);
  const damageList = panelsToDmgList(panelList);
  const base = damageList[boundary].expectedDmg;
  const expDmg = damageList.map((damage) => damage.expectedDmg);
  return marginOverBase(expDmg, base);
};

export const marginOverBase = (damages, base) => {
  return damages.map((each) => ((each - base) / base) * 100);
};
