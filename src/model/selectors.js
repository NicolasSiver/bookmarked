export const getCollections = state => state.collections;

export const getDialogTarget = state => state.dialog.target;

export const getDialogType = state => state.dialog.type;

export const getItems = state => state.items;

export const getMenuAnchorElement = state => state.menu.anchorElement;

export const getMode = state => state.mode;

export const getSettingsOpen = state => state.settings.open;

export const getSettingsStorageQuota = state => state.settings.storageQuota;

export const getTabFavIconUrl = state => state.tab?.favIconUrl || null;

export const getTabTitle = state => state.tab?.title || null;

export const getTabUrl = state => state.tab?.url || null;
