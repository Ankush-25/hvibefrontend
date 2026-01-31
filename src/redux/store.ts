import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import usrProfileSliceReducer from "./profileSlice";
import searchReducer from "./searchSlice";
import { RootState } from "../types/redux";

const storeOptions: ConfigureStoreOptions<RootState> = {
    reducer: {
        usrProfile: usrProfileSliceReducer,
        search: searchReducer
    }
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
