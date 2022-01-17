import { getHeadersWithToken } from "../utils/api";
import { client } from "./fetchClient";

function login({ username, password }) {
  return client("login", {
    data: {
      username,
      password,
    },
  });
}
function register({ username, password }) {
  return client("register", {
    data: {
      username,
      password,
    },
  });
}

function getPosts(page, items_per_page, search = null) {
  return client("posts", {
    params: {
      page,
      items_per_page,
      search,
    },
  });
}

function getUserPosts(page, items_per_page, search = null) {
  return client("user/posts", {
    params: {
      page,
      items_per_page,
      search,
    },
    headers: getHeadersWithToken(),
  });
}

export { login, register, getPosts, getUserPosts };
