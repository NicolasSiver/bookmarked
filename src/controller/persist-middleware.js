import { collectionsSlice } from '../model/collections-slice';
import { itemsSlice } from '../model/items-slice';

export class PersistMiddleware {
    constructor(storageService) {
        this.storageService = storageService;
    }

    createMiddleware() {
        return store => next => action => {
            const result = next(action);

            // Only persist if collections or items changed, and exclude any action containing 'hydrate'
            const isCollectionAction = action.type.startsWith(`${collectionsSlice.name}/`);
            const isItemAction = action.type.startsWith(`${itemsSlice.name}/`);
            const isHydrationAction = action.type.includes('hydrate');

            if (isHydrationAction === false) {

                if (isCollectionAction === true) {
                    console.log(`Collection action detected: ${action.type}`);

                    this.storageService.persistCollections(store.getState()[collectionsSlice.name]);
                }

                if (isItemAction === true) {
                    console.log(`Item action detected: ${action.type}`);

                    this.storageService.persistItems(store.getState()[itemsSlice.name]);
                }
            }

            return result;
        };
    }
}
