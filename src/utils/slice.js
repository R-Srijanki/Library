import { createSlice } from "@reduxjs/toolkit";
import books from "./mockdata";

const slice=createSlice({
    name:"book",
    initialState:{
        items: books,//from mockdata
    },
    //when to add book to items
    reducers:{
        addBook:(state,action)=>{
            state.items.unshift(action.payload);
        }
    }
});

export default slice.reducer; //reducer
export const {addBook} = slice.actions; //actions