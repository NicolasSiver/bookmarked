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
            // TODO Remove after very initial rounds of development
            { id: "testId1", name: "Basic" },
            { id: "testId2", name: "Extended" },
            { id: "testId3", name: "Last" }
        ],
        dialog: {
            target: null,
            type: null
        },
        items: {
            // TODO Remove after very initial rounds of development
            testId1: [
                { id: "itemId1", title: "Test Title 1", description: "desc temp", url: "https://some.com" },
                { id: "itemId2", title: "Test Title 2", description: "", url: "https://some2.com" },
                { id: "itemId3", title: "Test Title 3", description: "desc temp", url: "https://some3.com" },
                { id: "itemId4", title: "Test Title 4", description: "desc temp", url: "https://some4.com" },
                { id: "itemId5", title: "Test Title 5", description: "desc temp", url: "https://some5.com" },
                { id: "itemId6", title: "Test Title 6", description: "desc temp", url: "https://some6.com" },
                { id: "itemId7", title: "Test Title 7", description: "desc temp", url: "https://some7.com" },
                { id: "itemId8", title: "Test Title 8", description: "desc temp", url: "https://some8.com" },
                { id: "itemId9", title: "Test Title 9", description: "desc temp", url: "https://some9.com" }
            ]
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
