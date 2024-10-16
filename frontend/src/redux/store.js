import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice/Userslice.js";
import messageReducer from './messageSlice/messageSlice.js'
import socketReducers from './socketSlice/socketSlice.js';

const store = configureStore({
    reducer : {
user : userReducer,
message : messageReducer,
socket : socketReducers
    }
})
export default store;
