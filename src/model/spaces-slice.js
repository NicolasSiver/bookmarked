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

        removeSpace(state, action) {
            state.list = state.list.filter(space => space.id !== action.payload);
        },

        setCurrentSpace(state, action) {
            state.current = action.payload;
        }
    }
});

export const { addSpace, removeSpace, setCurrentSpace } = spacesSlice.actions;
