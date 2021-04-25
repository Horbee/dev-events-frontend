import axios from "axios";
import { UserModel } from "models/user";
import { RootState } from "store/store";

import { LoginFormValues } from "@/config/form-config/login-form";
import { NEXT_URL } from "@/config/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: UserModel | null;
}

const initialState: UserState = {
  userData: null
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (loginFormValues: LoginFormValues, thunkAPI) => {
    try {
      const { data } = await axios.post<UserModel>(`${NEXT_URL}/api/login`, {
        identifier: loginFormValues.email,
        password: loginFormValues.password
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const checkAuthState = createAsyncThunk(
  "users/checkAuthState",
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.get<UserModel>(`${NEXT_URL}/api/user`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
    },
    logout: (state) => {
      state.userData = null;
    }
  },
  extraReducers: {
    [loginUser.fulfilled as any]: (state, action: PayloadAction<UserModel>) => {
      state.userData = action.payload;
    },
    [loginUser.rejected as any]: (state, action: PayloadAction<string>) => {
      //   state.userData = action.payload;
      //toast
    },
    [checkAuthState.fulfilled as any]: (
      state,
      action: PayloadAction<UserModel>
    ) => {
      state.userData = action.payload;
    },
    [checkAuthState.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.userData = null;
    }
  }
});

export const { register, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userData;

export const userReducer = userSlice.reducer;
