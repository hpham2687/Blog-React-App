import { getToken } from "../utils/api";
import { axiosClient } from "./axiosClient";

function login({ username, password }) {
  return axiosClient.post("/login", { username, password });
}
function register({ username, password }) {
  return axiosClient.post("/register", { username, password });
}

function getPosts(page, items_per_page, search = null) {
  return axiosClient.get("/posts", {
    params: {
      page,
      items_per_page,
      search,
    },
  });
}

function getUserPosts(page, items_per_page, search = null) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };

  return axiosClient.get("user/posts", {
    params: {
      page,
      items_per_page,
      search,
    },
    headers,
  });
}

export { login, register, getPosts, getUserPosts };
