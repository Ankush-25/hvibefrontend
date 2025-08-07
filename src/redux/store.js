import {configureStore} from "@reduxjs/toolkit";
import usrProfileSliceReducer from "./profileSlice";

export const store = configureStore({
    reducer:{
        usrProfile:usrProfileSliceReducer
    }
});