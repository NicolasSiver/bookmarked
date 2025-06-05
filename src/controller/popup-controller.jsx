import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { PopupLayout } from '../view/display/popup-layout';
import { StorageService } from '../service/storage-service';
import { createInitState, createNewStore } from '../model/store';
import { changeTab } from '../model/tab-slice';

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
        this.getCurrentTab();
    }

    getCurrentTab() {
        let tab;

        console.log('Fetching current tab...');

        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    reject(chrome.runtime.lastError);
                } else if (tabs.length === 0) {
                    reject(new Error('No active tab found'));
                } else {
                    tab = tabs[0];
                    console.log('Current tab:', tab);

                    this.store.dispatch(changeTab({
                        favIconUrl: tab.favIconUrl || '',
                        status: tab.status || 'loading',
                        title: tab.title || '',
                        url: tab.url || ''
                    }));
                    resolve(tab);
                }
            });
        });
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
