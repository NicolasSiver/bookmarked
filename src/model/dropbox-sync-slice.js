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
        hydrateDropboxSync(state, action) {
            // Only update properties that exist in the current state
            Object.keys(action.payload).forEach(key => {
                if (state.hasOwnProperty(key) === true) {
                    // Ignore busy state and error state during hydration
                    if (key !== 'busy' || key !== 'error') {
                        state[key] = action.payload[key];
                    }
                }
            });
        },

        setCodeVerifier: (state, action) => {
            state.codeVerifier = action.payload;
        },

        setDropboxError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { hydrateDropboxSync, setCodeVerifier, setDropboxError } = dropboxSyncSlice.actions;
