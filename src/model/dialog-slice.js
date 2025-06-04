import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    target: null,
    type: null
};

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        changeDialogTarget(state, action) {
            state.target = action.payload;
        },

        closeDialog(state) {
            state.target = null;
            state.type = null;
        },

        openDialog(state, action) {
            state.target = action.payload.target;
            state.type = action.payload.type;
        }
    }
});

export const { changeDialogTarget, closeDialog, openDialog } = dialogSlice.actions;
