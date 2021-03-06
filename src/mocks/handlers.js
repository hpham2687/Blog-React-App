import { rest } from "msw";
import {
  createUserPostCtrl,
  editUserPostCtrl,
  getPostDetailCtrl,
  getPostsCtrl,
  getUserPostDetailCtrl,
  getUserPosts,
  removeUserPostCtrl,
} from "./controllers/post.controller";
import { loginCtrl, registerCtrl } from "./controllers/user.controller";

export const handlers = [
  rest.post("/login", loginCtrl),
  rest.post("/register", registerCtrl),
  rest.post("/posts", createUserPostCtrl),
  rest.get("/posts", getPostsCtrl),
  rest.get("/posts/:postId", getPostDetailCtrl),
  rest.get("/user-posts/:postId", getUserPostDetailCtrl),
  rest.put("/posts/:postId", editUserPostCtrl),
  rest.delete("/posts/:postId", removeUserPostCtrl),
  rest.get("/user/posts", getUserPosts),
];
