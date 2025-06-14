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
        }
    }
});

export const { changeTheme } = settingsSlice.actions;
