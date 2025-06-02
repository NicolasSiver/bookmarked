import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { addCollection, changeCollectionName, deleteCollection, shiftColleciton } from '../model/collections-slice';
import { changeDialogTarget, closeDialog, openDialog } from '../model/dialog-slice';
import * as DialogTypes from '../model/dialog-types';
import { changeItemDescription, changeItemTitle, changeItemUrl, deleteItemsByCollectionId } from '../model/items-slice';
import * as ItemProperties from '../model/item-properties';
import { closeMenu, toggleMenu } from '../model/menu-slice';
import { changeMode } from '../model/mode-slice';
import * as Modes from '../model/modes';
import { RootLayout } from "../view/display/root-layout";
import { getDialogTarget, getMode } from '../model/selectors';
import { createInitState, createNewStore } from '../model/store';

export class MainController {
    constructor() {
        this.store = createNewStore(createInitState());
    }

    init() {
        console.log('Extension is initialising...');

        this.render();
    }

    changeCollectionName(collectionId, name) {
        console.log(`Changing collection name for ${collectionId} to ${name}`);

        this.store.dispatch(changeCollectionName({ collectionId, name }));
    }

    changeDialogTarget(value) {
        console.log(`Changing dialog target to ${value}`);

        this.store.dispatch(changeDialogTarget(value));
    }

    changeMode() {
        let mode = getMode(this.store.getState());

        this.store.dispatch(changeMode(mode === Modes.VIEW ? Modes.EDIT : Modes.VIEW));
        // Ensure that the menu is closed when the mode changes
        this.store.dispatch(closeMenu());
    }

    closeDialog() {
        console.log('Closing dialog');

        this.store.dispatch(closeDialog());
    }

    createCollection() {
        let collectionName = getDialogTarget(this.store.getState()) || 'Untitled collection';

        console.log(`Creating new collection with name: ${collectionName}`);

        this.store.dispatch(addCollection({ name: collectionName }));
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
            case ItemProperties.DESCRIPTION:
                this.store.dispatch(changeItemDescription({ collectionId, itemId, description: value }));
                break;
            default:
                console.warn(`Unknown property "${property}" for item with ID "${itemId}" in collection "${collectionId}"`);
        }
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

    render() {
        let root = createRoot(document.getElementsByClassName('root')[0]);
        root.render(
            <Provider store={this.store}>
                <RootLayout
                    changeCollectionName={(id, name) => this.changeCollectionName(id, name)}
                    changeDialogTarget={value => this.changeDialogTarget(value)}
                    changeMode={() => this.changeMode()}
                    closeDialog={() => this.closeDialog()}
                    collectionWillDelete={id => this.collectionWillDelete(id)}
                    createCollection={() => this.createCollection()}
                    deleteCollection={id => this.deleteCollection(id)}
                    editCollectionItem={(collectionId, itemId) => this.editCollectionItem(collectionId, itemId)}
                    editItemProperty={(collectionId, itemId, property, value) => this.editItemProperty(collectionId, itemId, property, value)}
                    menuDidSelect={element => this.menuDidSelect(element)}
                    openDialog={(type, target) => this.openDialog(type, target)}
                    shiftCollection={(from, to) => this.shiftCollection(from, to)} />
            </Provider>
        );
    }

    shiftCollection(fromIndex, toIndex) {
        console.log(`Shifting collection from ${fromIndex} to ${toIndex}`);

        this.store.dispatch(shiftColleciton({ fromIndex, toIndex }));
    }
}
