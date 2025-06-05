import { collectionsSlice } from '../model/collections-slice';
import { ExtensionStorage } from '../service/extension-storage';
import { itemsSlice } from '../model/items-slice';

export class PersistMiddleware {
    constructor() {
        this.storage = new ExtensionStorage();
    }

    createMiddleware() {
        return store => next => action => {
            const result = next(action);

            // Only persist if collections or items changed, and exclude any action containing 'hydrate'
            const isCollectionAction = action.type.startsWith(`${collectionsSlice.name}/`);
            const isItemAction = action.type.startsWith(`${itemsSlice.name}/`);
            const isHydrationAction = action.type.includes('hydrate');

            if ((isCollectionAction || isItemAction) && isHydrationAction === false) {
                console.log(`Persisting state for action: ${action.type}`);

                this.storage.setValue(collectionsSlice.name, store.getState()[collectionsSlice.name]);
                this.storage.setValue(itemsSlice.name, store.getState()[itemsSlice.name]);
            }

            return result;
        };
    }
}
