import MiniSearch from 'minisearch';

import { addItem, changeItemDescription, changeItemTitle, changeItemUrl, deleteItem, deleteItemsByCollectionId } from "../model/items-slice";
import { changeQuery, setResults } from "../model/search-slice";
import { getItems } from '../model/selectors';
import { isAnyOf } from '@reduxjs/toolkit';

export class SearchController {
    constructor(store, listenerMiddleware) {
        this.listenerMiddleware = listenerMiddleware;
        this.store = store;
        this.miniSearch = null;
    }

    // FIXME: Remove search panel when query is empty
    createIndexIfNeeded() {
        let items, itemsData;

        if (this.miniSearch === null) {
            console.log('Creating search index...');

            this.miniSearch = new MiniSearch({
                fields: ['title', 'desc', 'url'] // Fields to index for full-text search
            });

            items = [];
            itemsData = getItems(this.store.getState());

            // Convert the data object into an array of items
            for (const [collectionIndex, key] of Object.keys(itemsData).entries()) {
                items = items.concat(itemsData[key]);
            }

            this.miniSearch.addAll(items);
        }

    }

    init() {
        console.log('Initialising Search Controller...');

        // TODO: Implement early indexing logic
        this.subscribe();
    }

    processSearchResult(searchResult) {
        let item, itemsData, itemRegistry;
        let items = [];
        let ids = searchResult.map(item => item.id);

        if (ids.length > 0) {
            // Build a registry of items for quick access
            itemRegistry = [];
            itemsData = getItems(this.store.getState());

            // Convert the data object into an array of items
            for (const [collectionIndex, key] of Object.keys(itemsData).entries()) {
                itemRegistry = itemRegistry.concat(itemsData[key]);
            }
        }

        ids.forEach(id => {
            item = itemRegistry.find(item => item.id === id);
            items.push(item);
        });

        this.store.dispatch(setResults({ results: items }));
    }

    subscribe() {
        this.listenerMiddleware.startListening({
            actionCreator: changeQuery,
            effect: (action, listenerApi) => {
                let searchResult = null;

                console.log(`Search query changed to "${action.payload.query}"`);

                this.createIndexIfNeeded();
                searchResult = this.miniSearch.search(action.payload.query, {
                    prefix: true, // Enable prefix search
                    fuzzy: 0.2, // Enable fuzzy search with a distance of 0.2
                });

                this.processSearchResult(searchResult);
            }
        });

        this.listenerMiddleware.startListening({
            matcher: isAnyOf(addItem, changeItemDescription, changeItemTitle, changeItemUrl, deleteItem, deleteItemsByCollectionId),
            effect: (action, listenerApi) => {
                if (this.miniSearch !== null) {
                    console.log('Items changed, dropping search index...');

                    // Clear the search index
                    this.miniSearch.removeAll();
                    this.miniSearch = null;
                }
            }
        });
    }

}
