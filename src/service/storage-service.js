import { hydrateCollections, collectionsSlice } from "../model/collections-slice";
import { composeDataFromBuckets } from "../util/compose-data-from-buckets";
import { createBucketKeys } from "../util/create-bucket-keys";
import { createStorageBuckets } from "../util/create-storage-buckets";
import { ExtensionStorage } from "./extension-storage";
import { hydrateItems, itemsSlice } from "../model/items-slice";
import { hydrateSettings, settingsSlice } from "../model/settings-slice";

export class StorageService {
    constructor() {
        this.isChromeEnvironment = window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage[this.storageType] !== undefined;
        this.storage = this.createStorage();
    }

    createStorage() {
        let storage = null;

        if (this.isChromeEnvironment === true) {
            console.log('Using Chrome storage API for persistence.');

            storage = new ExtensionStorage('sync');
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

    restore() {
        return this.restoreLocalState().then(({ collections, items, settings }) => {
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
        });
    }

    restoreLocalState() {
        let collections, items, result, settings;

        if (this.isChromeEnvironment === true) {
            result = Promise.all([
                this.storage.getValue([collectionsSlice.name]),
                this.storage.getValue(createBucketKeys(itemsSlice.name, Constants.STORAGE_BUCKETS_MAX)),
                this.storage.getValue([settingsSlice.name])
            ]).then(([collectionsData, itemsData, settingsData]) => {
                collections = collectionsData[collectionsSlice.name];
                items = composeDataFromBuckets(itemsData);
                settings = settingsData[settingsSlice.name];

                return { collections, items, settings };
            });
        } else {
            collections = JSON.parse(this.storage.getItem(collectionsSlice.name) || '[]');
            items = JSON.parse(this.storage.getItem(itemsSlice.name) || '{}');
            settings = JSON.parse(this.storage.getItem(settingsSlice.name));

            result = Promise.resolve({ collections, items, settings });
        }

        return result;
    }
}
