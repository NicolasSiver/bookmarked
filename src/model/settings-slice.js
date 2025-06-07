import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    open: false
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        openSettings(state, action) {
            state.open = true;
        },

        toggleSettings(state, action) {
            state.open = !state.open;
        }
    }
});

export const { openSettings, toggleSettings } = settingsSlice.actions;
