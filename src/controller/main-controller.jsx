import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { RootLayout } from "../view/display/root-layout";
import { createInitState, createNewStore } from '../model/store';

export class MainController {
    constructor() {
        this.store = createNewStore(createInitState());
    }

    init() {
        console.log('Expansion is initialising...');

        this.render();
    }

    render() {
        let root = createRoot(document.getElementsByClassName('root')[0]);
        root.render(
            <Provider store={this.store}>
                <RootLayout />
            </Provider>
        );
    }
}
