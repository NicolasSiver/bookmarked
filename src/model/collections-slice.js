import { init } from "@paralleldrive/cuid2";
import { createSlice } from "@reduxjs/toolkit";

let cuid = init({ length: 8 });
let initialState = [];

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection(state, action) {
            let collection = {
                id: cuid(),
                name: action.payload.name
            };

            state.push(collection);
        },

        changeCollectionName(state, action) {
            const { collectionId, name } = action.payload;
            const collection = state.find(collection => collection.id === collectionId);

            if (collection !== undefined) {
                collection.name = name;
            }
        },

        deleteCollection(state, action) {
            const { collectionId } = action.payload;
            const index = state.findIndex(collection => collection.id === collectionId);

            if (index !== -1) {
                state.splice(index, 1);
            }
        },

        shiftColleciton(state, action) {
            const { fromIndex, toIndex } = action.payload;
            const collection = state.splice(fromIndex, 1)[0];

            state.splice(toIndex, 0, collection);
        }
    }
});

export const { addCollection, changeCollectionName, deleteCollection, shiftColleciton } = collectionsSlice.actions;
