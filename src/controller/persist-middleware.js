import CollectionsSlice from '../slice/collections-slice';
import { ExtensionStorage } from '../service/extension-storage';
import ItemsSlice from '../slice/items-slice';

export class PersistMiddleware {
    constructor() {
        this.storage = new ExtensionStorage();
    }

    createMiddleware() {
        return store => next => action => {
            const result = next(action);

            // Only persist if collections or items changed
            if (action.type.startsWith(`${CollectionsSlice.name}/`) || action.type.startsWith(`${ItemsSlice.name}/`)) {
                console.log(`Persisting state for action: ${action.type}`);

                this.storage.set(CollectionsSlice.name, store.getState()[CollectionsSlice.name]);
                this.storage.set(ItemsSlice.name, store.getState()[ItemsSlice.name]);
            }

            return result;
        };
    }
}
