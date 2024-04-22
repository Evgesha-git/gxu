import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from './dataSlice';
import lineReducer from './lineSlice';
import formReducer from './formSlice';

export const rootReducer = combineReducers({
    data: dataReducer,
    lines: lineReducer,
    form: formReducer,
});