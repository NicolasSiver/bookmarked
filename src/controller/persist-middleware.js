import { collectionsSlice } from '../model/collections-slice';
import { ExtensionStorage } from '../service/extension-storage';
import { itemsSlice } from '../model/items-slice';

import * as Constants from '../model/constants';
import { createStorageBuckets } from '../util/create-storage-buckets';

export class PersistMiddleware {
    constructor() {
        this.storage = new ExtensionStorage('sync');
    }

    createMiddleware() {
        return store => next => action => {
            let itemBuckets;
            const result = next(action);

            // Only persist if collections or items changed, and exclude any action containing 'hydrate'
            const isCollectionAction = action.type.startsWith(`${collectionsSlice.name}/`);
            const isItemAction = action.type.startsWith(`${itemsSlice.name}/`);
            const isHydrationAction = action.type.includes('hydrate');

            if (isHydrationAction === false) {

                if (isCollectionAction === true) {
                    console.log(`Collection action detected: ${action.type}`);

                    this.storage.setValue({ [collectionsSlice.name]: store.getState()[collectionsSlice.name] });
                }

                if (isItemAction === true) {
                    console.log(`Item action detected: ${action.type}`);

                    itemBuckets = createStorageBuckets(store.getState()[itemsSlice.name], itemsSlice.name, Constants.STORAGE_BUCKETS);
                    this.storage.setValue(itemBuckets);
                }
            }

            return result;
        };
    }
}
