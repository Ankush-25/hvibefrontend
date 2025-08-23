import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
        clearSearchResult: (state, action) => {
            return {
                ...state,
                data: action.payload
            };
        }
    }
})

export const {
    setSearchResult,
    clearSearchResult
} = SearchSlice.actions;

export default SearchSlice.reducer