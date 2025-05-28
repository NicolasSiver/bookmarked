import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection(state, action) {
            state.push(action.payload);
        },

        shiftColleciton(state, action) {
            const { fromIndex, toIndex } = action.payload;
            const collection = state.splice(fromIndex, 1)[0];
            state.splice(toIndex, 0, collection);
        }
    }
});

export const { addCollection, shiftColleciton } = collectionsSlice.actions;
export default collectionsSlice.reducer;
