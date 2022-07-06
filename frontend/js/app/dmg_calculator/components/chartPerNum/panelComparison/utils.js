import { INITIAL_PANEL, PANEL_NAME_TO_TEXT } from '../../constants';
import { IndexedPanel } from '../../types';
import { PanelInput } from '../../types';
import type { DmgBundle } from '../../types';

export const isPanelExist = (panel: PanelInput, panelList: [IndexedPanel]): boolean => {
  return (
    panelList.filter(
      (existingPanel: IndexedPanel) => JSON.stringify(existingPanel.panel) === JSON.stringify(panel)
    ).length > 0
  );
};

export const newPanels = (panel: PanelInput, indexedPanelList: [IndexedPanel]): [IndexedPanel] => {
  const nextId = getNextId(indexedPanelList);
  return [...indexedPanelList, { id: nextId, panel: panel }];
};

export const getNextId = (indexedPanelList: [IndexedPanel]): number => {
  let ids = indexedPanelList.map((indexedPanel: IndexedPanel) => indexedPanel.id);
  return Math.max.apply(null, ids) + 1;
};

export const buildTableContent = (indexedPanelList: [IndexedPanel]) => {
  const ids = indexedPanelList.map((indexedPanel) => indexedPanel.id);
  const rows = Object.keys(INITIAL_PANEL).map((key) => {
    const dataByKey = indexedPanelList.map((indexedPanel) => indexedPanel.panel[key]);
    const keyText = PANEL_NAME_TO_TEXT[key];
    return { keyText, ...dataByKey };
  });
  return { ids, rows };
};

export const dmgCompare = (dmgBundles: [DmgBundle]) => {
  const list = dmgBundles.map((dmgBundle) => dmgBundle.expectedDmg);
  const base = list[0];
  return list.map((dmg) => Math.floor((dmg / base) * 100));
};
