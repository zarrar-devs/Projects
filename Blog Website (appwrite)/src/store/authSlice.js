import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status: false,
    userInfo: null,

}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
       login(state,action){
          state.status = true;
          state.userInfo = action.payload;
       },
       logout(state){
          state.status = false;
          state.userInfo = null;
       }

    }
})

export default authSlice.reducer;
export const {login,logout} = authSlice.actions
