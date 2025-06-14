import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import * as Constants from '../model/constants';
import { getShortTitle } from '../util/get-short-title';
import { addItem } from '../model/items-slice';
import { PopupLayout } from '../view/widget/popup-layout';
import { StorageService } from '../service/storage-service';
import { createInitState, createNewStore } from '../model/store';
import { getTabFavIconUrl, getTabTitle, getTabUrl } from '../model/selectors';
import { changeTab } from '../model/tab-slice';

export class PopupController {
    constructor() {
        this.storageService = new StorageService();
        this.store = createNewStore(createInitState(), this.storageService);
        this.storageService.initWithStore(this.store);
    }

    init() {
        console.log('Popup is initialising...');

        // TODO: Introduce Observer for Settings and render only when Settings are restored
        this.render();
        this.storageService.restore();
        this.getCurrentTab();
    }

    itemWillAdd(collectionId) {
        let item;
        let state = this.store.getState();
        let tabTitle = getTabTitle(state);
        let tabUrl = getTabUrl(state);
        let tabFavIconUrl = getTabFavIconUrl(state);
        let { title, description } = getShortTitle(tabTitle, Constants.MAX_ITEM_TITLE_LENGTH);

        console.log('Active tab will be added to collection:', collectionId);

        item = {
            desc: description,
            favUrl: tabFavIconUrl,
            title,
            url: tabUrl
        };

        this.store.dispatch(addItem({ collectionId, item }));
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
                <PopupLayout
                    addItem={collectionId => this.itemWillAdd(collectionId)} />
            </Provider>
        );
    }
}
