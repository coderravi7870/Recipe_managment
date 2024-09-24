import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./ReducerSlice/userSlices";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
