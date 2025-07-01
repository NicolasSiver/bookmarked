import { configureStore } from "@reduxjs/toolkit";

import { collectionsSlice } from "./collections-slice";
import { dialogSlice } from "./dialog-slice";
import { dropboxSyncSlice } from "./dropbox-sync-slice";
import { itemsSlice } from "./items-slice";
import { menuSlice } from "./menu-slice";
import { modeSlice } from './mode-slice';
import * as Modes from "./modes";
import { PersistMiddleware } from "../controller/persist-middleware";
import { searchSlice } from "./search-slice";
import { settingsSlice } from "./settings-slice";
import { settingsPanelSlice } from "./settings-panel-slice";
import { spacesSlice } from "./spaces-slice";
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

        dropboxSync: {
            busy: false, // Is Dropbox syncing
            codeChallenge: null, // Code challenge for Dropbox OAuth
            codeVerifier: null, // Code verifier for Dropbox OAuth
            error: null, // Error message if any
            refreshToken: null, // Dropbox refresh token
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

        search: {
            query: '',
            results: null
        },

        settings: {
            itemWidth: 3, // 1 to 12
            mode: 'dark', // 'dark' or 'light'
        },

        settingsPanel: {
            open: false,
            storageQuota: 0
        },

        spaces: {
            current: null, // Current space id
            list: [
                // Signature - id: string, name: string, collections: Array<string>
                // Example:
                // { id: "space1", name: "Work", collections: ["collectionId1", "collectionId2"] }
            ],
        },

        tab: null
    };
}

export function createNewStore(initState, storageService, listenerMiddleware = null) {
    let persistMiddleware = new PersistMiddleware(storageService).createMiddleware();

    return configureStore({
        preloadedState: initState,
        reducer: {
            collections: collectionsSlice.reducer,
            dialog: dialogSlice.reducer,
            dropboxSync: dropboxSyncSlice.reducer,
            items: itemsSlice.reducer,
            menu: menuSlice.reducer,
            mode: modeSlice.reducer,
            search: searchSlice.reducer,
            settings: settingsSlice.reducer,
            settingsPanel: settingsPanelSlice.reducer,
            spaces: spacesSlice.reducer,
            tab: tabSlice.reducer
        },
        middleware: getDefaultMiddleware => {
            let middleware = getDefaultMiddleware();

            if (listenerMiddleware !== null) {
                middleware = middleware.prepend(listenerMiddleware.middleware);
            }

            return middleware.concat(persistMiddleware);
        }
    });
}
