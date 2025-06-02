import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

let itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        // Collection identifier + item itself
        // TODO Rename to 'addItemToCollection'?
        add(state, action) {
            let collection = state[action.payload.collectionId];

            if (collection !== undefined) {
                collection.push(action.payload.item);
            }
        },

        changeItemTitle(state, action) {
            let collection = state[action.payload.collectionId];

            if (collection !== undefined) {
                let item = collection.find(item => item.id === action.payload.itemId);
                if (item !== undefined) {
                    // Update the title of the item
                    item.title = action.payload.title;
                }
            }
        },

        deleteItemsByCollectionId(state, action) {
            let collectionId = action.payload.collectionId;

            if (state[collectionId] !== undefined) {
                delete state[collectionId];
            }
        }
    }
});

export const { add, changeItemTitle, deleteItemsByCollectionId } = itemsSlice.actions;
export default itemsSlice.reducer;
