export const getCollections = state => state.collections;

export const getDialogTarget = state => state.dialog.target;

export const getDialogType = state => state.dialog.type;

export const getItems = state => state.items;

export const getMenuAnchorElement = state => state.menu.anchorElement;

export const getMode = state => state.mode;

export const getSearchQuery = state => state.search.query;

export const getSearchResults = state => state.search.results;

export const getSettingsItemWidth = state => state.settings.itemWidth;

export const getSettingsMode = state => state.settings.mode;

export const getSettingsPanelOpen = state => state.settingsPanel.open;

export const getSettingsPanelStorageQuota = state => state.settingsPanel.storageQuota;

export const getSpacesCurrent = state => state.spaces.current;

export const getSpacesList = state => state.spaces.list;

export const getTabFavIconUrl = state => state.tab?.favIconUrl || null;

export const getTabTitle = state => state.tab?.title || null;

export const getTabUrl = state => state.tab?.url || null;
