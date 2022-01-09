import { getHeadersWithToken } from "../utils/api";
import { axiosClient } from "./axiosClient";

function getPostDetail(postId) {
  return axiosClient.get(`/posts/${postId}`);
}
function createPost(postData) {
  return axiosClient.post("/posts", postData, {
    headers: getHeadersWithToken(),
  });
}

function editPost(postData) {
  return axiosClient.put(`/posts/${postData.id}`, postData, {
    headers: getHeadersWithToken(),
  });
}

function removePost(postId) {
  return axiosClient.delete(`/posts/${postId}`, {
    headers: getHeadersWithToken(),
  });
}

export { getPostDetail, createPost, editPost, removePost };
