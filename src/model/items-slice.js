import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

let itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        // Collection identifier + item itself
        add(state, action) {
            let collection = state[action.payload.collectionId];
            if (collection !== undefined) {
                collection.push(action.payload.item);
            }
        }
    }
});

export const { add } = itemsSlice.actions;
export default itemsSlice.reducer;
