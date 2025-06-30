import { DropboxAuth } from "dropbox";

import * as Constants from "../model/constants";
import { setCodeVerifier, setDropboxError } from "../model/dropbox-sync-slice";

export class DropboxController {
    constructor() {
        this.dbxAuth = null;
        this.store = null;
    }

    auth() {
        // Initialize Dropbox authentication
        console.log('Starting Dropbox authentication...');
        this.dbxAuth = new DropboxAuth({
            clientId: Constants.DROPBOX_CLIENT_ID,
        });
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

    initWithStore(store) {
        this.store = store;
    }
}
