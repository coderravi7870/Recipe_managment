import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoding: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequest: (state) => {
      state.isLoding = true;
    },
    userGetSuccess: (state, action) => {
      state.isLoding = false;
      state.user = action.payload;
    },
    userGetFailed: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },

    cleareError: (state) => {
      state.error = null;
    },
  },
});


export const {userRequest,userGetSuccess,userGetFailed, clreareError} = userSlice.actions;

export default userSlice.reducer;


