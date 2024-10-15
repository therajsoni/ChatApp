import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
    },
    reducers : {
        setAuthUser : (state,action) => {
            state.authUser = action.payload;
        }
    }
})

export const {setAuthUser} = UserSlice.actions;
export default UserSlice.reducer;

