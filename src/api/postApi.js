import { getToken } from "../utils/api";
import { axiosClient } from "./axiosClient";

function getPostDetail(postId) {
  return axiosClient.get(`/posts/${postId}`);
}
function createPost(postData) {
  console.log({ postData });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  console.log({ headers });

  return axiosClient.post("/posts", postData, {
    headers,
  });
}

export { getPostDetail, createPost };
