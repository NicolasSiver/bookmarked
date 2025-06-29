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

        hydrateSpaces(state, action) {
            // This action is used to hydrate the spaces from persisted state
            return action.payload;
        },

        removeSpace(state, action) {
            state.list = state.list.filter(space => space.id !== action.payload);
        },

        setCurrentSpace(state, action) {
            state.current = action.payload;
        },

        shiftSpace(state, action) {
            let { fromIndex, toIndex } = action.payload;
            let space = state.list.splice(fromIndex, 1)[0];

            if (space !== undefined) {
                state.list.splice(toIndex, 0, space);
            }
        }
    }
});

export const { addSpace, changeCollectionSpaces, changeSpaceName, hydrateSpaces, removeSpace, setCurrentSpace, shiftSpace } = spacesSlice.actions;
