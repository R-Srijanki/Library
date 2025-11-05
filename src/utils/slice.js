import { createSlice } from "@reduxjs/toolkit";
import books from "./mockdata";

const slice=createSlice({
    name:"book",
    initialState:{
        items: books,
    },
    reducers:{
        addBook:(state,action)=>{
            state.items.unshift(action.payload);
        }
    }
});

export default slice.reducer;
export const {addBook} = slice.actions;