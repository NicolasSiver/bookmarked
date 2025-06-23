import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createListenerMiddleware } from '@reduxjs/toolkit';

import { addCollection, changeCollectionName, deleteCollection, shiftColleciton } from '../model/collections-slice';
import * as Constants from '../model/constants';
import { changeDialogTarget, closeDialog, openDialog } from '../model/dialog-slice';
import * as DialogTypes from '../model/dialog-types';
import { getStorageUsageRatio } from '../util/get-storage-usage-ratio';
import { changeItemDescription, changeItemOrder, changeItemParent, changeItemTitle, changeItemUrl, deleteItem, deleteItemsByCollectionId } from '../model/items-slice';
import * as ItemProperties from '../model/item-properties';
import { closeMenu, toggleMenu } from '../model/menu-slice';
import { changeMode } from '../model/mode-slice';
import * as Modes from '../model/modes';
import { RootLayout } from "../view/widget/root-layout";
import { SearchController } from './search-controller';
import { clearSearch, changeQuery } from '../model/search-slice';
import { getDialogTarget, getMode } from '../model/selectors';
import { changeStorageQuota, openSettings, toggleSettings } from '../model/settings-panel-slice';
import { changeItemWidth, changeTheme } from '../model/settings-slice';
import { addSpace, changeCollectionSpaces, setCurrentSpace } from '../model/spaces-slice';
import { StorageService } from '../service/storage-service';
import { createInitState, createNewStore } from '../model/store';

export class MainController {
    constructor() {
        this.listenerMiddleware = createListenerMiddleware();
        this.storageService = new StorageService();
        this.store = createNewStore(createInitState(), this.storageService, this.listenerMiddleware);
        this.searchController = new SearchController(this.store, this.listenerMiddleware);
        this.storageService.initWithStore(this.store);

        this.searchController.init();
    }

    init() {
        console.log('Extension is initialising...');

        this.render();
        this.storageService.restore();
        getStorageUsageRatio().then(ratio => {
            console.log(`Storage usage ratio: ${ratio}`);
            this.store.dispatch(changeStorageQuota({ ratio }));
        }).catch(error => {
            console.error('Error getting storage usage ratio:', error);
        });
    }

    changeCollectionName(collectionId, name) {
        console.log(`Changing collection name for ${collectionId} to ${name}`);

        this.store.dispatch(changeCollectionName({ collectionId, name }));
    }

    changeCollectionSpaces(collectionId, spaceIds) {
        console.log(`Changing spaces for collection ${collectionId} to ${spaceIds}`);

        this.store.dispatch(changeCollectionSpaces({ collectionId, spaceIds }));
    }

    changeDialogTarget(value) {
        console.log(`Changing dialog target to ${value}`);

        this.store.dispatch(changeDialogTarget(value));
    }

    changeItemWidth(itemWidth) {
        console.log(`Changing item width to ${itemWidth}`);

        this.store.dispatch(changeItemWidth({ itemWidth }));
    }

    changeMode() {
        let mode = getMode(this.store.getState());

        this.store.dispatch(changeMode(mode === Modes.VIEW ? Modes.EDIT : Modes.VIEW));
        // Ensure that the menu is closed when the mode changes
        this.store.dispatch(closeMenu());
    }

    changeSearchQuery(query) {
        console.log(`Changing search query to "${query}"`);

        this.store.dispatch(changeQuery({ query }));
    }

    changeSpace(spaceId) {
        let switchSpace = spaceId === Constants.DEFAULT_SPACE ? null : spaceId;

        console.log(`Changing current space to ${switchSpace}`);

        this.store.dispatch(setCurrentSpace(switchSpace));
    }

    changeTheme(theme) {
        console.log(`Changing theme to ${theme}`);

        this.store.dispatch(changeTheme({ mode: theme }));
    }

    closeDialog() {
        console.log('Closing dialog');

        this.store.dispatch(closeDialog());
    }

    closeSearch() {
        console.log('Closing search panel');

        this.store.dispatch(clearSearch());
    }

    createCollection() {
        let collectionName = getDialogTarget(this.store.getState()) || 'Untitled collection';

        console.log(`Creating new collection with name: ${collectionName}`);

        this.store.dispatch(addCollection({ name: collectionName }));
        this.closeDialog();
    }

    createSpace() {
        let spaceName = getDialogTarget(this.store.getState()) || 'Untitled space';

        console.log(`Creating new space with name: ${spaceName}`);

        this.store.dispatch(addSpace({ name: spaceName }));
        this.closeDialog();
    }

    collectionWillDelete(collectionId) {
        console.log(`Collection with ID ${collectionId} will be deleted`);

        this.openDialog(DialogTypes.COLLECTION_DELETE_CONFIRMATION, collectionId);
    }

    deleteCollection(collectionId) {
        console.log(`Deleting collection with ID ${collectionId}`);
        let payload = { collectionId };

        this.store.dispatch(deleteCollection(payload));
        this.store.dispatch(deleteItemsByCollectionId(payload));
        this.closeDialog();
    }

    deleteItem(collectionId, itemId) {
        console.log(`Deleting item with ID "${itemId}" from collection "${collectionId}"`);

        this.closeDialog();
        this.store.dispatch(deleteItem({ collectionId, itemId }));
    }

    editCollectionItem(collectionId, itemId) {
        console.log(`Editing item with ID "${itemId}" in collection "${collectionId}"`);

        this.openDialog(DialogTypes.COLLECTION_ITEM_EDIT, { collectionId, itemId });
    }

    editItemProperty(collectionId, itemId, property, value) {
        console.log(`Editing property "${property}" of item with ID "${itemId}" in collection "${collectionId}" to value "${value}"`);

        switch (property) {
            case ItemProperties.URL:
                this.store.dispatch(changeItemUrl({ collectionId, itemId, url: value }));
                break;
            case ItemProperties.TITLE:
                this.store.dispatch(changeItemTitle({ collectionId, itemId, title: value }));
                break;
            case ItemProperties.ORDER:
                this.store.dispatch(changeItemOrder({ collectionId, itemId, newIndex: value }));
                break;
            case ItemProperties.DESCRIPTION:
                this.store.dispatch(changeItemDescription({ collectionId, itemId, description: value }));
                break;
            case ItemProperties.PARENT:
                // TODO Update dialog target to keep the dialog open for further editing
                this.closeDialog();
                this.store.dispatch(changeItemParent({ collectionId, itemId, parentCollectionId: value }));
                break;
            default:
                console.warn(`Unknown property "${property}" for item with ID "${itemId}" in collection "${collectionId}"`);
        }
    }

    itemDidClick(item) {
        console.log(`Item clicked: ${item}`);

        window.open(item.url, '_self');
    }

    menuDidSelect(element) {
        console.log('Menu item selected: ' + element);

        if (element !== null) {
            this.store.dispatch(toggleMenu(element));
        } else {
            this.store.dispatch(closeMenu());
        }
    }

    openDialog(type, target) {
        console.log(`Opening dialog of type ${type} with target:`, target);

        this.store.dispatch(openDialog({ type, target }));
        this.store.dispatch(closeMenu());
    }

    openSettings() {
        console.log('Opening settings dwawer');

        this.store.dispatch(openSettings());
    }

    render() {
        let root = createRoot(document.getElementsByClassName('root')[0]);
        root.render(
            <Provider store={this.store}>
                <RootLayout
                    changeCollectionName={(id, name) => this.changeCollectionName(id, name)}
                    changeCollectionSpaces={(id, spaces) => this.changeCollectionSpaces(id, spaces)}
                    changeDialogTarget={value => this.changeDialogTarget(value)}
                    changeItemWidth={itemWidth => this.changeItemWidth(itemWidth)}
                    changeMode={() => this.changeMode()}
                    changeSearchQuery={query => this.changeSearchQuery(query)}
                    changeSpace={spaceId => this.changeSpace(spaceId)}
                    changeTheme={theme => this.changeTheme(theme)}
                    closeSearch={() => this.closeSearch()}
                    closeDialog={() => this.closeDialog()}
                    collectionWillDelete={id => this.collectionWillDelete(id)}
                    createCollection={() => this.createCollection()}
                    createSpace={() => this.createSpace()}
                    deleteCollection={id => this.deleteCollection(id)}
                    deleteItem={(collectionId, itemId) => this.deleteItem(collectionId, itemId)}
                    editCollectionItem={(collectionId, itemId) => this.editCollectionItem(collectionId, itemId)}
                    editItemProperty={(collectionId, itemId, property, value) => this.editItemProperty(collectionId, itemId, property, value)}
                    itemDidClick={item => this.itemDidClick(item)}
                    menuDidSelect={element => this.menuDidSelect(element)}
                    openDialog={(type, target) => this.openDialog(type, target)}
                    openSettings={() => this.openSettings()}
                    shiftCollection={(from, to) => this.shiftCollection(from, to)}
                    toggleSettings={() => this.toggleSettings()} />
            </Provider>
        );
    }

    shiftCollection(fromIndex, toIndex) {
        console.log(`Shifting collection from ${fromIndex} to ${toIndex}`);

        this.store.dispatch(shiftColleciton({ fromIndex, toIndex }));
    }

    toggleSettings() {
        console.log('Toggling settings drawer');

        this.store.dispatch(toggleSettings());
    }
}
