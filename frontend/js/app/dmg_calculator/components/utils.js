import { MASTERY_BASE, MASTERY_INFLATION } from './constants';

export const generateLabels = (boundary: number): [number] => {
  const totalIndex = boundary * 2;
  const list = Array(boundary * 2 + 1).fill(0);

  for (let i = boundary; i >= 0; i--) {
    list[totalIndex - i] = boundary - i;
    list[i] = i - boundary;
  }
  return list;
};

export const calcDmg = (panel: PanelInput): DmgBundle => {
  const sanitized = sanitizePanel(panel);
  const ele_bonus =
    sanitized.react_ratio === 1
      ? 1
      : 1 +
        sanitized.react_ratio *
          (sanitized.ele_buff / 100 +
            (sanitized.ele_mastery * MASTERY_INFLATION) / (MASTERY_BASE + sanitized.ele_mastery));
  const unCtkEdDmg =
    sanitized.total_atk *
    (1 + sanitized.ele_buff / 100) *
    (1 + sanitized.ele_buff / 100) *
    ele_bonus;
  const ctkEdDmg = unCtkEdDmg * (1 + sanitized.ctk_dmg / 100);
  const expectedDmg =
    (sanitized.ctk_rate / 100) * ctkEdDmg + (1 - sanitized.ctk_rate / 100) * unCtkEdDmg;
  return {
    unCtkEdDmg: unCtkEdDmg,
    ctkEdDmg: ctkEdDmg,
    expectedDmg: expectedDmg,
  };
};

export const sanitizePanel = (panel: PanelInput): PanelInput => {
  if (panel.ctk_rate > 100) {
    panel.ctk_rate = 100;
  }
  for (const prop in panel) {
    if (panel[prop] < 0) {
      panel[prop] = 0;
    }
  }
  return panel;
};

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
    const muteDelta = getMuteDelta(i, boundary, muteStep, mutableField, basePanel);
    basePanelCopy[mutableField] -= muteDelta;
    list[i] = basePanelCopy;
    basePanelCopy2[mutableField] += muteDelta;
    list[totalIndex - i] = basePanelCopy2;
  }
  return list;
};

export const panelsToDmgList = (panels: [PanelInput]): [DmgBundle] => {
  return panels.map((panel) => calcDmg(panel));
};

export const perNumChartData = (boundary, field, basePanel) => {
  const panelList = generatePanelList(boundary, basePanel, field.name, field.step);
  const damageList = panelsToDmgList(panelList);
  const base = damageList[boundary].expectedDmg;
  let expDmg = damageList.map((damage) => damage.expectedDmg);
  expDmg = expDmg.map((each) => ((each - base) / base) * 100);
  return expDmg;
};

export const getMuteDelta = (index, boundary, muteStep, mutableField, panel) => {
  if (mutableField === 'total_atk') {
    return (panel.base_atk * (muteStep * (boundary - index))) / 100;
  } else {
    return muteStep * (boundary - index);
  }
};
