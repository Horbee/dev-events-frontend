import { RootState } from "store";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state) => {},
    login: (state) => {},
    logout: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    checkAuthState: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload;
    }
  }
});

export const { register, login, logout, checkAuthState } = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;

export const userReducer = userSlice.reducer;
