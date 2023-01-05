import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme:"light",
};

export const counterSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
       toggleTheme:(state,action)=>{
            state.theme = action.payload;
       },
    }
});

export const { toggleTheme } = counterSlice.actions;
export default counterSlice.reducer