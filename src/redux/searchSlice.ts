import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../types/redux";

const initialState: SearchState = {
    data: null
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                data: action.payload,
            };
        },
        clearSearchResult: (state, action: PayloadAction<any>) => {
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

export default SearchSlice.reducer;
