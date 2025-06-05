export const getCollections = state => state.collections;

export const getDialogTarget = state => state.dialog.target;

export const getDialogType = state => state.dialog.type;

export const getItems = state => state.items;

export const getMenuAnchorElement = state => state.menu.anchorElement;

export const getMode = state => state.mode;

export const getTabUrl = state => state.tab?.url || null;
