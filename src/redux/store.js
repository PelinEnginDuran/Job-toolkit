import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./slices/JobSlice";


export default configureStore({
    reducer:{JobSlice},
})