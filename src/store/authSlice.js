import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "api/userApi";

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }, thunkAPI) => {
    return UserApi.register({ email, username, password }).catch((error) => {
      const message =
        error?.response?.data?.message || error?.message || "UNKNOWN ERROR";
      return thunkAPI.rejectWithValue(message);
    });
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    return UserApi.login({ username, password }).catch((error) => {
      const message =
        error?.response?.data?.message || error?.message || "UNKNOWN ERROR";
      return thunkAPI.rejectWithValue(message);
    });
  }
);

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    loading: false,
    ...initialState,
  },
  reducers: {
    resetErrorAction(state, action) {
      state.error = null;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [registerAction.pending]: (state, action) => {
      state.loading = true;
    },
    [registerAction.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    [registerAction.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
    },
    [loginAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    [loginAction.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const { resetErrorAction, logout } = authSlice.actions;

export default authSlice.reducer;
