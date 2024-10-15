import { configureStore } from "@reduxjs/toolkit";
import UserReducers from './Slice/userSlice.js';
const store = () => configureStore(
{reducers : {
    user : UserReducers
}
})
export default store