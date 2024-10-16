import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice/Userslice.js";
import messageReducer from './messageSlice/messageSlice.js'

const store = configureStore({
    reducer : {
user : userReducer,
message : messageReducer,
    }
})
export default store;
