import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value : 0,
}

export const homeSlice = createSlice({
    name: "home",
    initialState :{
        url :{},
        genres : {},
    },
    reducers :{
        getApiConfiguration :(state , action) =>{
            state.url =action.payload;
        },
        getGeneres :(state, action)=>{
            state.genres =action.payload;
        },
    },
});

export const {getApiConfiguration, getGeneres} = homeSlice.actions

export default homeSlice.reducer