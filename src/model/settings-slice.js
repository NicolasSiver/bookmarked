import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    open: false,
    storageQuota: 0
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeStorageQuota(state, action) {
            state.storageQuota = action.payload.ratio * 100;
        },

        openSettings(state, action) {
            state.open = true;
        },

        toggleSettings(state, action) {
            state.open = !state.open;
        }
    }
});

export const { changeStorageQuota, openSettings, toggleSettings } = settingsSlice.actions;
