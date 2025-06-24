import { init } from "@paralleldrive/cuid2";
import { createSlice } from '@reduxjs/toolkit';

let cuid = init({ length: 8 });
let initialState = {
    current: null, // Current space id
    list: []
};

export const spacesSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers: {
        addSpace(state, action) {
            let space = {
                collections: [],
                id: cuid(),
                name: action.payload.name
            };
            state.list.push(space);
        },

        changeCollectionSpaces(state, action) {
            let { collectionId, spaceIds } = action.payload;

            state.list.forEach(space => {
                space.collections = space.collections.filter(id => id !== collectionId);

                if (spaceIds.includes(space.id) === true) {
                    space.collections.push(collectionId);
                }
            });
        },

        changeSpaceName(state, action) {
            let { id, name } = action.payload;
            let space = state.list.find(space => space.id === id);

            if (space !== undefined) {
                space.name = name;
            }
        },

        removeSpace(state, action) {
            state.list = state.list.filter(space => space.id !== action.payload);
        },

        setCurrentSpace(state, action) {
            state.current = action.payload;
        }
    }
});

export const { addSpace, changeCollectionSpaces, changeSpaceName, removeSpace, setCurrentSpace } = spacesSlice.actions;
