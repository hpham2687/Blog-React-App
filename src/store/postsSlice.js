/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyNegative, notifyPositive } from "utils/toast";
import * as PostApi from "api/postApi";
import * as UserApi from "api/userApi";
import { ADD_POST_SUCCESS_MESSAGES } from "constants/AddPost/Message";
import { getUserPostsAction } from "./userPostsSlice";
import { ADD_POST_ERROR_MESSAGES } from "../constants/AddPost/Message";

export const createPostsAction = createAsyncThunk(
  "posts/createPosts",
  async (postData, thunkAPI) => {
    return PostApi.createPost(postData)
      .then((response) => {
        notifyPositive({ message: ADD_POST_SUCCESS_MESSAGES.ADD_POST_SUCCESS });
        return response;
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        notifyNegative({ message: ADD_POST_ERROR_MESSAGES.ADD_POST_FAIL });
        return thunkAPI.rejectWithValue(message);
      });
  }
);

export const removePostAction = createAsyncThunk(
  "posts/removePost",
  async ({ postId }, thunkAPI) => {
    return PostApi.removePost(postId)
      .then((response) => {
        notifyPositive({ message: `Delete post ${postId} successfully.` });
        thunkAPI.dispatch(getUserPostsAction({ page: 1, items_per_page: 6 }));
        return response;
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        notifyNegative({ message });
        return thunkAPI.rejectWithValue(message);
      });
  }
);

export const getPostsAction = createAsyncThunk(
  "posts/getPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    return UserApi.getPosts(page, items_per_page, search)
      .then((data) => {
        return data;
      })
      .catch((error) => {
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

export const loadMorePostsAction = createAsyncThunk(
  "posts/loadMorePostsAction",
  async ({}, thunkAPI) => {
    let {
      posts: { items_per_page, page, search },
    } = thunkAPI.getState();
    let newPage = ++page;
    return UserApi.getPosts(newPage, items_per_page, search).catch((error) => {
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
  items_per_page: 6,
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
      state.data = null;
    },
  },
});

const { actions } = postsSlice;
export const { resetState } = actions;

export default postsSlice.reducer;
