import { getCollections, getItems, getSpaces } from "../model/selectors";

export class StorageDocument {
    constructor() {
    }

    getJson(state) {
        const collections = getCollections(state);
        const items = getItems(state);
        const spaces = getSpaces(state);

        const json = { collections, items, spaces };

        return JSON.stringify(json, null, 2);
    }

}
