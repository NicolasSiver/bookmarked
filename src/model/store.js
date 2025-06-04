import { configureStore } from "@reduxjs/toolkit";

import { collectionsSlice } from "./collections-slice";
import { dialogSlice } from "./dialog-slice";
import { itemsSlice } from "./items-slice";
import { menuSlice } from "./menu-slice";
import { modeSlice } from './mode-slice';
import * as Modes from "./modes";
import { PersistMiddleware } from "../controller/persist-middleware";

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
            //     { id: "itemId1", title: "Test Title 1", description: "desc temp", url: "https://some.com" }
            // ]
        },
        menu: {
            anchorElement: null
        },
        mode: Modes.VIEW
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
            mode: modeSlice.reducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware)
    });
}
