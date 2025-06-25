import { collectionsSlice } from '../model/collections-slice';
import { itemsSlice } from '../model/items-slice';
import { settingsSlice } from '../model/settings-slice';
import { spacesSlice } from '../model/spaces-slice';

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
            const isSettingsAction = action.type.startsWith(`${settingsSlice.name}/`);
            const isSpaceAction = action.type.startsWith(`${spacesSlice.name}/`);

            if (isHydrationAction === false) {

                if (isCollectionAction === true) {
                    console.log(`Collection action detected: ${action.type}`);

                    this.storageService.persistCollections(store.getState()[collectionsSlice.name]);
                }

                if (isItemAction === true) {
                    console.log(`Item action detected: ${action.type}`);

                    this.storageService.persistItems(store.getState()[itemsSlice.name]);
                }

                if (isSettingsAction === true) {
                    console.log(`Settings action detected: ${action.type}`);

                    this.storageService.persistSettings(store.getState()[settingsSlice.name]);
                }

                if (isSpaceAction === true) {
                    console.log(`Space action detected: ${action.type}`);

                    this.storageService.persistSpaces(store.getState()[spacesSlice.name]);
                }
            }

            return result;
        };
    }
}
