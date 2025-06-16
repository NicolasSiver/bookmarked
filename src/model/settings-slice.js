import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    itemWidth: 3,
    mode: 'dark', // 'dark' or 'light'
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeItemWidth(state, action) {
            state.itemWidth = action.payload.itemWidth;
        },

        changeTheme(state, action) {
            state.mode = action.payload.mode;
        },

        hydrateSettings(state, action) {
            // Only update properties that exist in the current state
            Object.keys(action.payload).forEach(key => {
                if (state.hasOwnProperty(key) === true) {
                    state[key] = action.payload[key];
                }
            });
        }
    }
});

export const { changeItemWidth, changeTheme, hydrateSettings } = settingsSlice.actions;
