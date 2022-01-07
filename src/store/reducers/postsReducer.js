import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "./../../api/userApi";

export const getPostsAction = createAsyncThunk(
  "posts/getPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    try {
      const response = await UserApi.getPosts(page, items_per_page, search);
      console.log(response);
      return response.data;
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

export const getUserPostsAction = createAsyncThunk(
  "posts/getUserPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    try {
      const response = await UserApi.getUserPosts(page, items_per_page, search);
      console.log({ getUserPosts: response });
      return response.data;
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
export const loadMorePostsAction = createAsyncThunk(
  "posts/loadMorePostsAction",
  async ({}, thunkAPI) => {
    try {
      const response = await UserApi.getPosts();
      console.log({ response });
      return response.data;
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

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    items_per_page: null,
    page: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state, action) {
      state.user = null;
    },
  },
  extraReducers: {
    [getPostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostsAction.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.loading = false;
      state.data = action.payload.posts;
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
    },
    [getPostsAction.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;

      state.data = null;
    },
    [loadMorePostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loadMorePostsAction.fulfilled]: (state, action) => {
      state.loading = false;
      //   console.log({ actionData: action.payload });
      state.data = [...state.data, ...action.payload.posts];
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
    },
    [loadMorePostsAction.rejected]: (state, action) => {
      state.loading = false;
      state.data = null;
    },
  },
});

const { actions } = postsSlice;
export const {} = actions;

export default postsSlice.reducer;
