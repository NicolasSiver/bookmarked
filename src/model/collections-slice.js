import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        add(state, action) {
            state.collections.push(action.payload);
        }
    }
});

export const { add } = collectionsSlice.actions;
export default collectionsSlice.reducer;
