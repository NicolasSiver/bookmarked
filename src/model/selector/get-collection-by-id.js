import { createSelector } from "@reduxjs/toolkit";

import { getCollections } from "../selectors";

export function getCollectionById(id) {
    return createSelector(
        getCollections,
        collections => {
            let collection = collections.find(collection => collection.id === id);
            return collection || null;
        }
    );
}
