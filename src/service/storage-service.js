import { hydrateCollections, collectionsSlice } from "../model/collections-slice";
import { composeDataFromBuckets } from "../util/compose-data-from-buckets";
import * as Constants from "../model/constants";
import { createBucketKeys } from "../util/create-bucket-keys";
import { createStorageBuckets } from "../util/create-storage-buckets";
import { ExtensionStorage } from "./extension-storage";
import { hydrateDropboxSync, dropboxSyncSlice } from "../model/dropbox-sync-slice";
import { hydrateItems, itemsSlice } from "../model/items-slice";
import { hydrateSettings, settingsSlice } from "../model/settings-slice";
import { hydrateSpaces, spacesSlice } from "../model/spaces-slice";

export class StorageService {
    constructor() {
        const storageType = 'sync'; // Default to sync storage for Chrome extensions

        this.isChromeEnvironment = window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage[storageType] !== undefined;
        this.storage = this.createStorage(storageType);
    }

    createStorage(storageType) {
        let storage = null;

        if (this.isChromeEnvironment === true) {
            console.log('Using Chrome storage API for persistence.');

            storage = new ExtensionStorage(storageType);
        } else {
            console.log('Using localStorage for persistence (development mode).');

            storage = window.localStorage;
        }

        return storage;
    }

    initWithStore(store) {
        this.store = store;
    }

    persistCollections(collections) {
        console.log('Persisting collections:', collections);

        if (this.isChromeEnvironment === true) {
            this.storage
                .setValue({ [collectionsSlice.name]: collections })
                .then(() => {
                    console.log('Collections persisted successfully.');
                });
        } else {
            this.storage.setItem(collectionsSlice.name, JSON.stringify(collections));
        }
    }

    persistDropboxSync(dropboxSync) {
        console.log('Persisting Dropbox sync state:', dropboxSync);

        if (this.isChromeEnvironment === true) {
            this.storage
                .setValue({ [dropboxSyncSlice.name]: dropboxSync })
                .then(() => {
                    console.log('Dropbox sync state persisted successfully.');
                });
        } else {
            this.storage.setItem(dropboxSyncSlice.name, JSON.stringify(dropboxSync));
        }
    }

    persistItems(items) {
        let itemBuckets;

        console.log('Persisting items:', items);

        if (this.isChromeEnvironment === true) {
            itemBuckets = createStorageBuckets(items, itemsSlice.name, Constants.STORAGE_BUCKETS_MAX);
            this.storage
                .setValue(itemBuckets)
                .then(() => {
                    console.log('Items persisted successfully.');
                });
        } else {
            this.storage.setItem(itemsSlice.name, JSON.stringify(items));
        }
    }

    persistSettings(settings) {
        console.log('Persisting settings:', settings);

        if (this.isChromeEnvironment === true) {
            this.storage
                .setValue({ [settingsSlice.name]: settings })
                .then(() => {
                    console.log('Settings persisted successfully.');
                });
        } else {
            this.storage.setItem(settingsSlice.name, JSON.stringify(settings));
        }
    }

    persistSpaces(spaces) {
        console.log('Persisting spaces:', spaces);

        if (this.isChromeEnvironment === true) {
            this.storage
                .setValue({ [spacesSlice.name]: spaces })
                .then(() => {
                    console.log('Spaces persisted successfully.');
                });
        } else {
            this.storage.setItem(spacesSlice.name, JSON.stringify(spaces));
        }
    }

    restore() {
        return this.restoreLocalState().then(({ collections, dropboxSync, items, settings, spaces }) => {
            console.log('Restoring persisted state...');

            if (Array.isArray(collections) === true && collections.length > 0) {
                console.log('Hydrating collections:', collections);
                this.store.dispatch(hydrateCollections(collections));
            }

            if (items !== undefined) {
                console.log('Hydrating items:', items);
                this.store.dispatch(hydrateItems(items));
            }

            if (typeof settings === 'object' && settings !== null) {
                console.log('Hydrating settings:', settings);
                this.store.dispatch(hydrateSettings(settings));
            }

            if (typeof spaces === 'object' && spaces !== null) {
                console.log('Hydrating spaces:', spaces);
                this.store.dispatch(hydrateSpaces(spaces));
            }

            if (typeof dropboxSync === 'object' && dropboxSync !== null) {
                console.log('Hydrating Dropbox sync state:', dropboxSync);
                this.store.dispatch(hydrateDropboxSync(dropboxSync));
            }
        });
    }

    restoreLocalState() {
        let collections, dropboxSync, items, result, settings, spaces;

        if (this.isChromeEnvironment === true) {
            result = Promise.all([
                this.storage.getValue([collectionsSlice.name]),
                this.storage.getValue(createBucketKeys(itemsSlice.name, Constants.STORAGE_BUCKETS_MAX)),
                this.storage.getValue([settingsSlice.name]),
                this.storage.getValue([spacesSlice.name]),
                this.storage.getValue([dropboxSyncSlice.name])
            ]).then(([collectionsData, itemsData, settingsData, spacesData, dropboxSyncData]) => {
                collections = collectionsData[collectionsSlice.name];
                items = composeDataFromBuckets(itemsData);
                settings = settingsData[settingsSlice.name];
                spaces = spacesData[spacesSlice.name];
                dropboxSync = dropboxSyncData[dropboxSyncSlice.name];

                return { collections, dropboxSync, items, settings, spaces };
            });
        } else {
            collections = JSON.parse(this.storage.getItem(collectionsSlice.name) || '[]');
            dropboxSync = JSON.parse(this.storage.getItem(dropboxSyncSlice.name));
            items = JSON.parse(this.storage.getItem(itemsSlice.name) || '{}');
            settings = JSON.parse(this.storage.getItem(settingsSlice.name));
            spaces = JSON.parse(this.storage.getItem(spacesSlice.name));

            result = Promise.resolve({ collections, dropboxSync, items, settings, spaces });
        }

        return result;
    }
}
