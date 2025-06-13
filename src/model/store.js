import { configureStore } from "@reduxjs/toolkit";

import { collectionsSlice } from "./collections-slice";
import { composeDataFromBuckets } from "../util/compose-data-from-buckets";
import * as Constants from './constants';
import { createBucketKeys } from "../util/create-bucket-keys";
import { ExtensionStorage } from "../service/extension-storage";
import { dialogSlice } from "./dialog-slice";
import { itemsSlice } from "./items-slice";
import { menuSlice } from "./menu-slice";
import { modeSlice } from './mode-slice';
import * as Modes from "./modes";
import { PersistMiddleware } from "../controller/persist-middleware";
import { settingsSlice } from "./settings-slice";
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

        settings: {
            open: false,
            storageQuota: 0
        },

        tab: null
    };
}

export function createNewStore(initState) {
    let persistMiddleware = new PersistMiddleware().createMiddleware();

    return configureStore({
        preloadedState: initState,
        reducer: {
            collections: collectionsSlice.reducer,
            dialog: dialogSlice.reducer,
            items: itemsSlice.reducer,
            menu: menuSlice.reducer,
            mode: modeSlice.reducer,
            settings: settingsSlice.reducer,
            tab: tabSlice.reducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware)
    });
}

export function restoreLocalState() {
    let collections, items;
    let storage = new ExtensionStorage('sync');

    return Promise.all([
        storage.getValue([collectionsSlice.name]),
        storage.getValue(createBucketKeys(itemsSlice.name, Constants.STORAGE_BUCKETS_MAX))
    ]).then(([collectionsData, itemsData]) => {
        collections = collectionsData[collectionsSlice.name];
        items = composeDataFromBuckets(itemsData);

        return { collections, items };
    });
}
