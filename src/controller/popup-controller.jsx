import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { addCollection, changeCollectionName, deleteCollection, hydrateCollections, shiftColleciton } from '../model/collections-slice';
import { changeItemDescription, changeItemOrder, changeItemParent, changeItemTitle, changeItemUrl, deleteItemsByCollectionId, hydrateItems } from '../model/items-slice';
import { PopupLayout } from '../view/display/popup-layout';
import { getDialogTarget, getMode } from '../model/selectors';
import { StorageService } from '../service/storage-service';
import { createInitState, createNewStore, restoreLocalState } from '../model/store';

export class PopupController {
    constructor() {
        this.store = createNewStore(createInitState());
        this.storageService = new StorageService();
        this.storageService.initWithStore(this.store);
    }

    init() {
        console.log('Popup is initialising...');

        this.render();
        this.storageService.restore();
    }

    render() {
        let root = createRoot(document.getElementsByClassName('root')[0]);
        root.render(
            <Provider store={this.store}>
                <PopupLayout />
            </Provider>
        );
    }
}
