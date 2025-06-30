import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    accessToken: null, // Dropbox access token
    busy: false, // Is Dropbox syncing
    codeVerifier: null, // Code verifier for Dropbox OAuth
    error: null, // Error message if any
};

export const dropboxSyncSlice = createSlice({
    name: 'dropboxSync',
    initialState,
    reducers: {
        setCodeVerifier: (state, action) => {
            state.codeVerifier = action.payload;
        }
    }
});

export const { setCodeVerifier } = dropboxSyncSlice.actions;
