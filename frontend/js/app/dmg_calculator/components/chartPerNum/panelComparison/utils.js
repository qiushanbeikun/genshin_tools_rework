import { INITIAL_PANEL } from '../../constants';
import { IndexedPanel } from '../../types';
import { PanelInput } from '../../types';

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

export const getContext = (indexedPanelList: [IndexedPanel]) => {
  const ids = indexedPanelList.map((indexedPanel) => indexedPanel.id);
  const rows = Object.keys(INITIAL_PANEL).map((key) => {
    const dataByKey = indexedPanelList.map((indexedPanel) => indexedPanel.panel[key]);
    return { key, ...dataByKey };
  });

  // for (const title of INITIAL_PANEL) {
  // }

  return { ids, rows };
};
