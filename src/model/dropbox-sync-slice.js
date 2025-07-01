import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    busy: false, // Is Dropbox syncing
    codeChallenge: null, // Code challenge for Dropbox OAuth
    codeVerifier: null, // Code verifier for Dropbox OAuth
    error: null, // Error message if any
    refreshToken: null, // Dropbox refresh token
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

        resetAuthorizationCodeFlow: (state) => {
            state.codeChallenge = null;
            state.codeVerifier = null;
        },

        setCodeChallenge: (state, action) => {
            state.codeChallenge = action.payload;
        },

        setCodeVerifier: (state, action) => {
            state.codeVerifier = action.payload;
        },

        setDropboxError: (state, action) => {
            state.error = action.payload;
        },

        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
    }
});

export const { hydrateDropboxSync, resetAuthorizationCodeFlow, setCodeChallenge, setCodeVerifier, setDropboxError, setRefreshToken } = dropboxSyncSlice.actions;
