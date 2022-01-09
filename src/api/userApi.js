import { getHeadersWithToken } from "../utils/api";
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
  return axiosClient.get("user/posts", {
    params: {
      page,
      items_per_page,
      search,
    },
    headers: getHeadersWithToken(),
  });
}

export { login, register, getPosts, getUserPosts };
