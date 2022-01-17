import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import userPostsReducer from "./userPostsReducer";

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  userPosts: userPostsReducer,
});
