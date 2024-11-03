import { configureStore } from "@reduxjs/toolkit";

import CollectionsSlice from './collections-slice';

export function createInitState() {
    return {
        collections: [],
        items: []
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
