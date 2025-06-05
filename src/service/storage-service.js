import { hydrateCollections } from "../model/collections-slice";
import { hydrateItems } from "../model/items-slice";
import { restoreLocalState } from "../model/store";

export class StorageService {
    constructor() {
    }

    initWithStore(store) {
        this.store = store;
    }

    restore() {
        return restoreLocalState().then(({ collections, items }) => {
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
}
