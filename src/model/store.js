import { configureStore } from "@reduxjs/toolkit";

import CollectionsSlice from './collections-slice';
import * as Modes from "./modes";

export function createInitState() {
    return {
        collections: [
            // TODO Remove after very initial rounds of development
            { id: "testId1", name: "Basic" },
            { id: "testId2", name: "Extended" },
            { id: "testId3", name: "Last" }
        ],
        items: [],
        mode: Modes.VIEW
    };
}

export function createNewStore(initState) {
    return configureStore({
        preloadedState: initState,
        reducer: {
            collections: CollectionsSlice
        }
    });
}
