import { combineReducers } from "redux";
import authReducer from "./authSlice";
import postsReducer from "./postsSlice";
import userPostsReducer from "./userPostsSlice";

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  userPosts: userPostsReducer,
});
