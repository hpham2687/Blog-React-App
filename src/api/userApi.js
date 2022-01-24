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
function register({ email, username, password }) {
  return client("register", {
    data: {
      email,
      username,
      password,
    },
  });
}

function getPosts(page, items_per_page, search = null) {
  const params = {
    page,
    items_per_page,
    search,
  };
  if (!search) delete params.search;

  return client("posts", {
    params,
  });
}

function getUserPosts(page, items_per_page, search = null) {
  const params = {
    page,
    items_per_page,
    search,
  };
  if (!search) delete params.search;

  return client("user/posts", {
    params,
    headers: getHeadersWithToken(),
  });
}

export { login, register, getPosts, getUserPosts };
