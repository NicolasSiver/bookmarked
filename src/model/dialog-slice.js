import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    target: null,
    type: null
};

let dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, action) {
            state.target = action.payload.target;
            state.type = action.payload.type;
        }
    }
});

export const { openDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
