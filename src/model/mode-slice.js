import { createSlice } from '@reduxjs/toolkit';

import * as Modes from './modes';

let initialState = Modes.VIEW;

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeMode(state, action) {
            return action.payload;
        }
    }
});

export const { changeMode } = modeSlice.actions;
