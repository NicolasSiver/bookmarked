import { DropboxAuth } from "dropbox";

import * as Constants from "../model/constants";
import { resetAuthorizationCodeFlow, setCodeVerifier, setDropboxError, setRefreshToken } from "../model/dropbox-sync-slice";
import { getDropboxSyncCodeChallenge, getDropboxSyncCodeVerifier, getDropboxSyncRefreshToken } from "../model/selectors";

export class DropboxController {
    constructor() {
        this.dbxAuth = null;
        this.store = null;
    }

    auth() {
        // Initialize Dropbox authentication
        console.log('Starting Dropbox authentication...');

        this.createAuthIfNeeded();;
        this.dbxAuth.getAuthenticationUrl('', undefined, 'code', 'offline', undefined, undefined, true)
            .then(url => {
                this.store.dispatch(setCodeVerifier(this.dbxAuth.getCodeVerifier()));
                // Redirect to Dropbox authentication URL
                window.location.href = url;
            })
            .catch(error => {
                console.error('Error during Dropbox authentication:', error);

                this.store.dispatch(setDropboxError(error.message || 'Unknown error during Dropbox authentication'));
            });
    }

    createAuthIfNeeded() {
        if (this.dbxAuth === null) {
            console.log('Creating new Dropbox Auth instance...');

            this.dbxAuth = new DropboxAuth({
                clientId: Constants.DROPBOX_CLIENT_ID,
            });
        }
    }

    initWithStore(store) {
        this.store = store;
    }

    isConnected() {
        const state = this.store.getState();
        const refreshToken = getDropboxSyncRefreshToken(state);

        // Check if Dropbox is connected by verifying the presence of a refresh token
        return refreshToken !== null && refreshToken.length > 0;
    }

    verifyCodeChallenge() {
        const state = this.store.getState();
        const codeChallenge = getDropboxSyncCodeChallenge(state);
        const codeVerifier = getDropboxSyncCodeVerifier(state);

        // Verify the code challenge from Dropbox OAuth
        console.log('Verifying Dropbox code challenge:', codeChallenge);

        this.createAuthIfNeeded();

        this.dbxAuth.setCodeVerifier(codeVerifier);
        this.dbxAuth.getAccessTokenFromCode('', codeChallenge)
            .then(response => {
                console.log('Dropbox refresh token received:', response.result.refresh_token);

                this.store.dispatch(setRefreshToken(response.result.refresh_token));
                this.store.dispatch(resetAuthorizationCodeFlow());
            })
            .catch(error => {
                console.error('Error verifying Dropbox code challenge:', error);

                this.store.dispatch(setDropboxError(error.message || 'Unknown error during Dropbox code verification'));
            });
    }
}
