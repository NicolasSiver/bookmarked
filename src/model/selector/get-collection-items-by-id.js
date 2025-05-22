import { createSelector } from "@reduxjs/toolkit";

import { getItems } from "../selectors";

export function getCollectionItemsById(id) {
    return createSelector(
        getItems,
        items => {
            let collectionItems = items[id];
            return collectionItems !== undefined ? collectionItems : null;
        }
    );
}
