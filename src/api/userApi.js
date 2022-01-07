import { axiosClient } from "./axiosClient";

function login({ username, password }) {
  return axiosClient.post("/login", { username, password });
}
function register({ username, password }) {
  return axiosClient.post("/register", { username, password });
}

function getPosts(page = 1, items_per_page = 3, search = null) {
  return axiosClient.get("/posts", {
    params: {
      page,
      items_per_page,
      search,
    },
  });
}

export { login, register, getPosts };
