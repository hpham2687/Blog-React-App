/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PostApi from "api/postApi";
import * as UserApi from "api/userApi";

export const createPostsAction = createAsyncThunk(
  "posts/createPosts",
  async (postData, thunkAPI) => {
    return PostApi.createPost(postData);
  }
);

export const removePostAction = createAsyncThunk(
  "posts/removePost",
  async ({ postId }, thunkAPI) => {
    return PostApi.removePost(postId);
  }
);

export const getPostsAction = createAsyncThunk(
  "posts/getPosts",
  async ({ page = 1, items_per_page = 10, search = null }, thunkAPI) => {
    return UserApi.getPosts(page, items_per_page, search);
  }
);

export const loadMorePostsAction = createAsyncThunk(
  "posts/loadMorePostsAction",
  async ({}, thunkAPI) => {
    let {
      posts: { items_per_page, page, search },
    } = thunkAPI.getState();
    let newPage = ++page;
    return UserApi.getPosts(newPage, items_per_page, search);
  }
);

const initialState = {
  data: [],
  items_per_page: 10,
  page: 1,
  search: null,
  maximumNumOfPages: null,
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [getPostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.posts;
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.maximumNumOfPages = action.payload.maximumNumOfPages;
    },
    [getPostsAction.rejected]: (state, action) => {
      state.loading = false;
      state.data = null;
    },

    [loadMorePostsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loadMorePostsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.posts];
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.search = action.payload.search;
    },
    [loadMorePostsAction.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { actions } = postsSlice;
export const { resetState } = actions;

export default postsSlice.reducer;
