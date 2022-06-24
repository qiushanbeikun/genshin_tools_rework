import { getMuteDelta, panelsToDmgList } from './utils';

export const marginOverPrev = (damages) => {
  const dataList = damages.map((each, index) => {
    if (index === 0) return 0;
    return ((each - damages[index - 1]) / damages[index - 1]) * 100;
  });
  dataList.shift();
  return dataList;
};

export const generatePrevPanelList = (
  boundary: number,
  basePanel: PanelInput,
  mutableField: string,
  muteStep: number
): [PanelInput] => {
  mutableField = mutableField === 'atk_percent' ? 'total_atk' : mutableField;
  const list = Array(boundary * 2 + 1);
  for (let i = 0; i <= boundary * 2; i++) {
    const basePanelCopy = { ...basePanel };
    const muteDelta = getMuteDelta(i, muteStep, mutableField, basePanel);
    basePanelCopy[mutableField] += muteDelta;
    list[i] = basePanelCopy;
  }
  return list;
};

export const prevChartData = (boundary, field, basePanel) => {
  const panelList = generatePrevPanelList(boundary, basePanel, field.name, field.step);
  const damageList = panelsToDmgList(panelList);
  const expDmg = damageList.map((damage) => damage.expectedDmg);
  return marginOverPrev(expDmg);
};
