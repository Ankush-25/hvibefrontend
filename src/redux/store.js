import {configureStore} from "@reduxjs/toolkit";
import usrProfileSliceReducer from "./profileSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
    reducer: {
        usrProfile: usrProfileSliceReducer,
        search: searchReducer
    }
});