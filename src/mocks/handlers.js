// src/mocks/handlers.js
import { rest } from "msw";
import { getAllPostsCtrl } from "./controllers/post.controller";
import { loginCtrl, registerCtrl } from "./controllers/user.controller";

import { posts } from "./mockData/postData";

export const handlers = [
  rest.post("/login", loginCtrl),
  rest.post("/register", registerCtrl),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
  rest.get("/posts", getAllPostsCtrl),
];