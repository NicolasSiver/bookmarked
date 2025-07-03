import { DropboxAuth } from "dropbox";
import debounce from "lodash/debounce";
import { isAnyOf } from "@reduxjs/toolkit";

import { addCollection, changeCollectionName, deleteCollection, shiftCollection } from "../model/collections-slice";
import * as Constants from "../model/constants";
import { resetAuthorizationCodeFlow, resetDropboxSync, setCodeVerifier, setDropboxError, setRefreshToken } from "../model/dropbox-sync-slice";
import { addItem, changeItemDescription, changeItemOrder, changeItemParent, changeItemTitle, changeItemUrl, deleteItem, deleteItemsByCollectionId } from "../model/items-slice";
import { getDropboxSyncCodeChallenge, getDropboxSyncCodeVerifier, getDropboxSyncRefreshToken } from "../model/selectors";
import { addSpace, changeCollectionSpaces, changeSpaceName, removeSpace, shiftSpace } from "../model/spaces-slice";
import { StorageDocument } from "../util/storage-document";

export class DropboxController {
    constructor() {
        this.dbxAuth = null;
        this.store = null;

        this.collectionsEvent = isAnyOf(addCollection, changeCollectionName, deleteCollection, shiftCollection);
        this.itemsEvent = isAnyOf(addItem, changeItemDescription, changeItemOrder, changeItemParent, changeItemTitle, changeItemUrl, deleteItem, deleteItemsByCollectionId);
        this.spacesEvent = isAnyOf(addSpace, changeCollectionSpaces, changeSpaceName, removeSpace, shiftSpace);
    }

    addListeners(listenerMiddleware) {
        this.listenerMiddleware = listenerMiddleware;

        this.listenerMiddleware.startListening({
            predicate: (action, currentState, previousState) => {
                return getDropboxSyncRefreshToken(currentState) !== getDropboxSyncRefreshToken(previousState);
            },
            effect: (action, listenerApi) => {
                console.log('Dropbox refresh token changed...');

                if (this.isConnected() === true) {
                    this.addStateListeners();
                    // this.updateRemote();
                } else {
                    // If not connected, remove all state listeners
                    console.log('Dropbox is disconnected, removing state listeners...');
                    this.removeStateListeners();
                }
            }
        });
    }

    addStateListeners() {
        const debouncedUpdateRemote = debounce(() => {
            this.updateRemote();
        }, 8000, { maxWait: 16000 });

        this.listenerMiddleware.startListening({
            matcher: this.collectionsEvent,
            effect: (action, listenerApi) => {
                debouncedUpdateRemote();
            }
        });

        this.listenerMiddleware.startListening({
            matcher: this.itemsEvent,
            effect: (action, listenerApi) => {
                debouncedUpdateRemote();
            }
        });

        this.listenerMiddleware.startListening({
            matcher: this.spacesEvent,
            effect: (action, listenerApi) => {
                debouncedUpdateRemote();
            }
        });
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

    removeStateListeners() {
        console.log('Removing all state listeners...');

        this.listenerMiddleware.stopListening({ matcher: this.collectionsEvent });
        this.listenerMiddleware.stopListening({ matcher: this.itemsEvent });
        this.listenerMiddleware.stopListening({ matcher: this.spacesEvent });
    }

    revoke() {
        this.dbxAuth = null;
        this.store.dispatch(resetDropboxSync());
    }

    updateRemote() {
        console.log('Updating remote Dropbox JSON file...');
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
