import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./ReducerSlice/userSlices"

const store = configureStore({
    user: userReducer
})