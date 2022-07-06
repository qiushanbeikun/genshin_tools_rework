import { MASTERY_BASE, MASTERY_INFLATION } from '../../constants';
import type { DmgBundle, PanelInput } from '../../types';

/**
 * for prevChart, label starts from 1 with length 2 * boundary
 * @param boundary
 * @param type
 * @returns {number[]|*}
 */
export const generateLabels = (boundary: number, type: string): [number] => {
  switch (type) {
    default:
    case 'base':
      const totalIndex = boundary * 2;
      const list = Array(boundary * 2 + 1).fill(0);

      for (let i = boundary; i >= 0; i--) {
        list[totalIndex - i] = boundary - i;
        list[i] = i - boundary;
      }
      return list;
    case 'prev':
      return [...Array(boundary * 2).keys()].map((e) => e + 1);
  }
};

export const panelsToDmgList = (panels: [PanelInput]): [DmgBundle] => {
  return panels.map((panel) => calcDmg(panel));
};

export const getMuteDelta = (ratio, muteStep, mutableField, panel) => {
  if (mutableField === 'total_atk') {
    return (panel.base_atk * (muteStep * ratio)) / 100;
  } else {
    return muteStep * ratio;
  }
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

export const calcDmg = (panel: PanelInput): DmgBundle => {
  const sanitized = sanitizePanel(panel);
  const eleBonus =
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
    eleBonus;
  const ctkEdDmg = unCtkEdDmg * (1 + sanitized.ctk_dmg / 100);
  const expectedDmg =
    (sanitized.ctk_rate / 100) * ctkEdDmg + (1 - sanitized.ctk_rate / 100) * unCtkEdDmg;
  return {
    unCtkEdDmg: unCtkEdDmg,
    ctkEdDmg: ctkEdDmg,
    expectedDmg: expectedDmg,
  };
};

export const chartEntryValidation = (panel: PanelInput, chartSettings): boolean => {
  for (const key in panel) {
    if (typeof panel[key] !== 'number' || panel[key] < 0) return false;
  }
  const fields = chartSettings.fields;
  const isFieldValid = fields.reduce(
    (acc, field) => acc && field.step > 0 && typeof field.step === 'number'
  );
  return chartSettings.boundary > 0 && typeof chartSettings.boundary === 'number' && isFieldValid;
};
