import { getHeadersWithToken } from "../utils/api";
import { client } from "./fetchClient";

function getPostDetail(postId) {
  return client(`posts/${postId}`);
}
function createPost(postData) {
  return client("posts", {
    data: postData,
    headers: getHeadersWithToken(),
  });
}

function editPost(postData) {
  return client(`posts/${postData.id}`, {
    data: postData,
    method: "PUT",
    headers: getHeadersWithToken(),
  });
}

function removePost(postId) {
  return client(`posts/${postId}`, {
    method: "DELETE",
    headers: getHeadersWithToken(),
  });
}

export { getPostDetail, createPost, editPost, removePost };
