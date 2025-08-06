import {configureStore} from "@reduxjs/toolkit";
import usrProfileSlice from "./profileSlice";
export const store = configureStore({
    reducer:{
        userProfile:usrProfileSlice.reducer
    }
});