import { init } from "@paralleldrive/cuid2";
import { createSlice } from "@reduxjs/toolkit";

let cuid = init({ length: 8 });
let initialState = {};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action) {
            let collection = state[action.payload.collectionId];
            let item = {
                id: cuid(),
                ...action.payload.item
            };

            if (collection === undefined) {
                // If the collection does not exist, create it
                collection = [];
                state[action.payload.collectionId] = collection;
            }

            collection.push(item);
        },

        changeItemDescription(state, action) {
            let collection = state[action.payload.collectionId];

            if (collection !== undefined) {
                let item = collection.find(item => item.id === action.payload.itemId);
                if (item !== undefined) {
                    // Update the description of the item
                    item.desc = action.payload.description;
                }
            }
        },

        changeItemOrder(state, action) {
            let collection = state[action.payload.collectionId];
            let newIndex = action.payload.newIndex;

            if (collection !== undefined) {
                let index = collection.findIndex(item => item.id === action.payload.itemId);
                // Remove the item from the current position
                let [item] = collection.splice(index, 1);
                // Insert the item at the new position
                collection.splice(newIndex, 0, item);
            }
        },

        changeItemParent(state, action) {
            let index, item;
            let collection = state[action.payload.collectionId];
            let nextCollection = state[action.payload.parentCollectionId];

            if (nextCollection === undefined) {
                // If the next collection does not exist, create it
                nextCollection = [];
                state[action.payload.parentCollectionId] = nextCollection;
            }

            if (collection !== undefined && nextCollection !== undefined) {
                index = collection.findIndex(item => item.id === action.payload.itemId);
                // Remove the item from the current collection
                item = collection.splice(index, 1)[0];
                // Add the item to the new collection
                nextCollection.push(item);
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

        changeItemUrl(state, action) {
            let collection = state[action.payload.collectionId];

            if (collection !== undefined) {
                let item = collection.find(item => item.id === action.payload.itemId);
                if (item !== undefined) {
                    // Update the URL of the item
                    item.url = action.payload.url;
                }
            }
        },

        deleteItemsByCollectionId(state, action) {
            let collectionId = action.payload.collectionId;

            if (state[collectionId] !== undefined) {
                delete state[collectionId];
            }
        },

        hydrateItems(state, action) {
            // This action is used to hydrate the items state from persisted data
            // It replaces the current state with the provided payload
            return action.payload;
        }
    }
});

export const { addItem, changeItemDescription, changeItemOrder, changeItemParent, changeItemTitle, changeItemUrl, deleteItemsByCollectionId, hydrateItems } = itemsSlice.actions;
