import { configureStore } from "@reduxjs/toolkit";

import { collectionsSlice } from "./collections-slice";
import { dialogSlice } from "./dialog-slice";
import { itemsSlice } from "./items-slice";
import { menuSlice } from "./menu-slice";
import { modeSlice } from './mode-slice';
import * as Modes from "./modes";
import { PersistMiddleware } from "../controller/persist-middleware";
import { settingsPanelSlice } from "./settings-panel-slice";
import { tabSlice } from "./tab-slice";

export function createInitState() {
    return {
        collections: [
            // Signature - id: string, name: string
        ],

        dialog: {
            target: null,
            type: null
        },

        items: {
            // Signature - collectionId: string, items: Array<{ id: string, title: string, description: string, url: string }>
            // Example:
            // testId1: [
            //     { id: "itemId1", title: "Test Title 1", desc: "desc temp", url: "https://some.com", favUrl: "https://some.com/favicon.ico" },
            // ]
        },

        menu: {
            anchorElement: null
        },

        mode: Modes.VIEW,

        settingsPanel: {
            open: false,
            storageQuota: 0
        },

        tab: null
    };
}

export function createNewStore(initState, storageService) {
    let persistMiddleware = new PersistMiddleware(storageService).createMiddleware();

    return configureStore({
        preloadedState: initState,
        reducer: {
            collections: collectionsSlice.reducer,
            dialog: dialogSlice.reducer,
            items: itemsSlice.reducer,
            menu: menuSlice.reducer,
            mode: modeSlice.reducer,
            settingsPanel: settingsPanelSlice.reducer,
            tab: tabSlice.reducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware)
    });
}
