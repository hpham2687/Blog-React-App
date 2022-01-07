import { axiosClient } from "./axiosClient";

function getPostDetail(postId) {
  return axiosClient.get(`/posts/${postId}`);
}

export { getPostDetail };
