import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    query: '',
    results: null
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch(state) {
            state.query = '';
            state.results = null;
        },

        changeQuery(state, action) {
            state.query = action.payload.query;
        },

        setResults(state, action) {
            state.results = action.payload.results;
        }
    }
});

export const { clearSearch, changeQuery, setResults } = searchSlice.actions;
