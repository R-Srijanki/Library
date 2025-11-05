import { configureStore } from "@reduxjs/toolkit";
import slicereducer from './slice.js';
const store=configureStore({
    reducer:{
        book:slicereducer,
    }
});
export default store;