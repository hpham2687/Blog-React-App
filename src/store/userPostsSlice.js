/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "api/userApi";

export const getUserPostsAction = createAsyncThunk(
  "posts/getUserPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    return UserApi.getUserPosts(page, items_per_page, search).catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    });
  }
);

export const loadMoreUserPostsAction = createAsyncThunk(
  "posts/loadMoreUserPostsAction",
  async ({}, thunkAPI) => {
    let {
      userPosts: { items_per_page, page },
    } = thunkAPI.getState();
    let newPage = ++page;

    return UserApi.getUserPosts(newPage, items_per_page).catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    });
  }
);
const initialState = {
  data: [],
  items_per_page: 10,
  page: 1,
  maximumNumOfPages: null,
  loading: false,
  error: null,
};
const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [getUserPostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserPostsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.posts;
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.maximumNumOfPages = action.payload.maximumNumOfPages;
    },
    [getUserPostsAction.rejected]: (state, action) => {
      state.loading = false;
      state.data = null;
    },
    [loadMoreUserPostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loadMoreUserPostsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.posts];
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.search = action.payload.search;
    },
    [loadMoreUserPostsAction.rejected]: (state, action) => {
      state.loading = false;
      state.data = null;
    },
  },
});

const { actions } = userPostsSlice;
export const { resetState } = actions;

export default userPostsSlice.reducer;
