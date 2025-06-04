import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    anchorElement: null,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openMenu(state, action) {
            state.anchorElement = action.payload;
        },
        closeMenu(state, action) {
            state.anchorElement = null;
        },
        toggleMenu(state, action) {
            if (state.anchorElement === null) {
                state.anchorElement = action.payload;
            } else {
                state.anchorElement = null;
            }
        }
    }
});

export const { closeMenu, openMenu, toggleMenu } = menuSlice.actions;
