import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    mode: 'dark', // 'dark' or 'light'
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeTheme(state, action) {
            state.mode = action.payload.mode;
        },

        hydrateSettings(state, action) {
            return action.payload;
        }
    }
});

export const { changeTheme, hydrateSettings } = settingsSlice.actions;
