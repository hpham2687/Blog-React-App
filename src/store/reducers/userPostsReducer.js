/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "api/userApi";

export const getUserPostsAction = createAsyncThunk(
  "posts/getUserPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    try {
      const response = await UserApi.getUserPosts(page, items_per_page, search);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(getPostsFailure(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadMoreUserPostsAction = createAsyncThunk(
  "posts/loadMoreUserPostsAction",
  async ({}, thunkAPI) => {
    try {
      let {
        userPosts: { items_per_page, page, maximunNumOfPages },
      } = thunkAPI.getState();
      console.log({ maximunNumOfPages });
      let newPage = ++page;
      console.log("xuong day");
      console.log({ newPage });
      const response = await UserApi.getUserPosts(newPage, items_per_page);
      console.log({ response });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(getPostsFailure(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: {
    data: [],
    items_per_page: 6,
    page: 1,
    maximunNumOfPages: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getUserPostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserPostsAction.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.data = action.payload.posts;
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.maximunNumOfPages = action.payload.maximunNumOfPages;
    },
    [getUserPostsAction.rejected]: (state, action) => {
      state.isLoggedIn = false;
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
export const {} = actions;

export default userPostsSlice.reducer;
