import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { toggleMenu } from '../model/menu-slice';
import { changeMode } from '../model/mode-slice';
import * as Modes from '../model/modes';
import { RootLayout } from "../view/display/root-layout";
import { getMode } from '../model/selectors';
import { createInitState, createNewStore } from '../model/store';

export class MainController {
    constructor() {
        this.store = createNewStore(createInitState());
    }

    init() {
        console.log('Extension is initialising...');

        this.render();
    }

    changeMode() {
        let mode = getMode(this.store.getState());
        
        this.store.dispatch(changeMode(mode === Modes.VIEW ? Modes.EDIT : Modes.VIEW));
    }

    menuDidSelect(element) {
        console.log('Menu item selected: ' + element);

        this.store.dispatch(toggleMenu(element));
    }

    render() {
        let root = createRoot(document.getElementsByClassName('root')[0]);
        root.render(
            <Provider store={this.store}>
                <RootLayout
                    changeMode={() => this.changeMode()} 
                    menuDidSelect={element => this.menuDidSelect(element)}/>
            </Provider>
        );
    }
}
