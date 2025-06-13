import * as Constants from "../model/constants";
import { hydrateCollections, collectionsSlice } from "../model/collections-slice";
import { composeDataFromBuckets } from "../util/compose-data-from-buckets";
import { createBucketKeys } from "../util/create-bucket-keys";
import { createStorageBuckets } from "../util/create-storage-buckets";
import { ExtensionStorage } from "./extension-storage";
import { hydrateItems, itemsSlice } from "../model/items-slice";

export class StorageService {
    constructor() {
        this.storage = new ExtensionStorage('sync');
    }

    initWithStore(store) {
        this.store = store;
    }

    persistCollections(collections) {
        console.log('Persisting collections:', collections);

        this.storage.setValue({ [collectionsSlice.name]: collections });
    }

    persistItems(items) {
        console.log('Persisting items:', items);

        const itemBuckets = createStorageBuckets(items, itemsSlice.name, Constants.STORAGE_BUCKETS_MAX);
        this.storage.setValue(itemBuckets);
    }

    restore() {
        return this.restoreLocalState().then(({ collections, items }) => {
            console.log('Restoring persisted state...');

            if (Array.isArray(collections) === true && collections.length > 0) {
                console.log('Hydrating collections:', collections);
                this.store.dispatch(hydrateCollections(collections));
            }

            if (items !== undefined) {
                console.log('Hydrating items:', items);
                this.store.dispatch(hydrateItems(items));
            }
        });
    }

    restoreLocalState() {
        let collections, items;

        return Promise.all([
            this.storage.getValue([collectionsSlice.name]),
            this.storage.getValue(createBucketKeys(itemsSlice.name, Constants.STORAGE_BUCKETS_MAX))
        ]).then(([collectionsData, itemsData]) => {
            collections = collectionsData[collectionsSlice.name];
            items = composeDataFromBuckets(itemsData);

            return { collections, items };
        });
    }
}
