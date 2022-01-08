import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "./../../api/userApi";

export const getPostsAction = createAsyncThunk(
  "posts/getPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    try {
      console.log(page, search);
      const response = await UserApi.getPosts(page, items_per_page, search);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log({ message });
      // thunkAPI.dispatch(getPostsFailure(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadMorePostsAction = createAsyncThunk(
  "posts/loadMorePostsAction",
  async ({}, thunkAPI) => {
    try {
      let {
        posts: { items_per_page, page, search, maximunNumOfPages },
      } = thunkAPI.getState();
      console.log({ maximunNumOfPages });
      let newPage = ++page;
      console.log("xuong day");
      console.log({ newPage });
      const response = await UserApi.getPosts(newPage, items_per_page, search);
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
    items_per_page: 6,
    page: 1,
    search: null,
    maximunNumOfPages: null,
    error: null,
    loading: false,
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
      state.isLoggedIn = true;
      state.loading = false;
      state.data = action.payload.posts;
      state.items_per_page = action.payload.items_per_page;
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.maximunNumOfPages = action.payload.maximunNumOfPages;
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
export const {} = actions;

export default postsSlice.reducer;
