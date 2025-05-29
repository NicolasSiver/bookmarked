import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    target: null,
    type: null
};

let dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        changeDialogTarget(state, action) {
            state.target = action.payload;
        },

        openDialog(state, action) {
            state.target = action.payload.target;
            state.type = action.payload.type;
        }
    }
});

export const { changeDialogTarget, openDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
