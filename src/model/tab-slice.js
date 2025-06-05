import { createSlice } from '@reduxjs/toolkit';

let initialState = null;

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        changeTab(state, action) {
            return action.payload;
        }
    }
});

export const { changeTab } = tabSlice.actions;
