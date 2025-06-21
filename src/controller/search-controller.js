import { changeQuery } from "../model/search-slice";

export class SearchController {
    constructor(store, listenerMiddleware) {
        this.listenerMiddleware = listenerMiddleware;
        this.store = store;
    }

    init() {
        console.log('Initialising Search Controller...');

        this.subscribe();
    }

    subscribe() {
        this.listenerMiddleware.startListening({
            actionCreator: changeQuery,
            effect: (action, listenerApi) => {
                console.log(`Search query changed to "${action.payload.query}"`);
                // listenerApi.dispatch(searchItems(action.payload.query));
            }
        });
    }

}
