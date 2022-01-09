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

function editPost(postData) {
  console.log({ postData });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  console.log({ headers });

  return axiosClient.put(`/posts/${postData.id}`, postData, {
    headers,
  });
}

function removePost(postId) {
  console.log({ postId });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  console.log({ headers });

  return axiosClient.delete(`/posts/${postId}`, {
    headers,
  });
}

export { getPostDetail, createPost, editPost, removePost };
