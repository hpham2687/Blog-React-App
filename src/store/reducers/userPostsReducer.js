import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "./../../api/userApi";

export const getUserPostsAction = createAsyncThunk(
  "posts/getUserPosts",
  async ({ page = 1, items_per_page = 6, search = null }, thunkAPI) => {
    try {
      const response = await UserApi.getUserPosts(page, items_per_page, search);
      // console.log({ getUserPosts: response });
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

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: {
    data: [],
    items_per_page: null,
    page: null,
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
    },
    [getUserPostsAction.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.data = null;
    },
    //   [loadMorePostsAction.pending]: (state, action) => {
    //     state.loading = true;
    //   },
    //   [loadMorePostsAction.fulfilled]: (state, action) => {
    //     state.loading = false;
    //     //   console.log({ actionData: action.payload });
    //     state.data = [...state.data, ...action.payload.posts];
    //     state.items_per_page = action.payload.items_per_page;
    //     state.page = action.payload.page;
    //   },
    //   [loadMorePostsAction.rejected]: (state, action) => {
    //     state.loading = false;
    //     state.data = null;
    //   },
  },
});

const { actions } = userPostsSlice;
export const {} = actions;

export default userPostsSlice.reducer;
