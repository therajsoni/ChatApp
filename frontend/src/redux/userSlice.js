import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
    },
    reducers : {
        setAuthuser : (state,action) => {
            state.authUser = action.payload;
        }
    }
})

export const {setAuthuser} = userSlice.actions
export default userSlice.reducer;