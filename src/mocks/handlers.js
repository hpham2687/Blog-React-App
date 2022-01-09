import { rest } from "msw";
import {
  createUserPostCtrl,
  editUserPostCtrl,
  getPostDetailCtrl,
  getPostsCtrl,
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
  rest.put("/posts/:postId", editUserPostCtrl),
  rest.delete("/posts/:postId", removeUserPostCtrl),

  // Get posts of specific user
  rest.get("/user/posts", getUserPosts),
];
