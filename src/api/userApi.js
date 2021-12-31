import { axiosClient } from "./axiosClient";

function login({ username, password }) {
  return axiosClient.post("/login", { username, password });
}
function register({ username, password }) {
  return axiosClient.post("/register", { username, password });
}

function getPosts() {
  return axiosClient.get("/posts");
}

export { login, register, getPosts };
