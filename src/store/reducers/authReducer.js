import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_SUCCESS_MESSAGES } from "../../constants/Auth/Message";
import { notifyNegative, notifyPositive } from "../../utils/toast";
import * as UserApi from "./../../api/userApi";
export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }, thunkAPI) => {
    try {
      console.log(`onSubmit register thunk`, { email, username, password });

      const response = await UserApi.register({ email, username, password });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      notifyPositive({ message: AUTH_SUCCESS_MESSAGES.REGISTER_SUCCESS });
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "UNKNOWN ERROR";
      notifyNegative({ message: message });
      // thunkAPI.dispatch(registerFailure(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      console.log("vao thunk login");
      // thunkAPI.dispatch(loginStart());
      const response = await UserApi.login({ username, password });
      console.log("vao day login");
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      notifyPositive({ message: AUTH_SUCCESS_MESSAGES.LOGIN_SUCCESS });

      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "UNKNOWN ERROR";
      notifyNegative({ message: message });
      // thunkAPI.dispatch(loginFailure(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
// const initialState = { isLoggedIn: true, user: { username: "sfs" } };

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
      console.log(action.payload);
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload.user;
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
      state.user = action.payload.user;
    },
    [loginAction.rejected]: (state, action) => {
      console.log({ actionPayload: action.payload });
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const { resetErrorAction, logout } = authSlice.actions;

export default authSlice.reducer;
