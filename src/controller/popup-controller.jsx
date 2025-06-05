import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { PopupLayout } from '../view/display/popup-layout';
import { StorageService } from '../service/storage-service';
import { createInitState, createNewStore } from '../model/store';

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
