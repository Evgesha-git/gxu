import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redusers";

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}