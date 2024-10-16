import { createSlice } from "@reduxjs/toolkit";
import OtherUsers from "../../components/OtherUsers";

const userSlice = createSlice({
    name   : "user",
    initialState : {
        authuser : null,
        OtherUsers : null,
        selectedUser : null,
    },
    reducers : {
        setAuthUser : (state,action) => {
            state.authuser = action.payload;
        },
        setOtherUsers : (state,action) => {
            state.OtherUsers = action.payload;
        },
        setSelecteduser : (state,action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const {setAuthUser,setOtherUsers,setSelecteduser} = userSlice.actions;
export default userSlice.reducer;
