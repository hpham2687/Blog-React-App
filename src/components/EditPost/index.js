import { Breadcrumb } from "@ahaui/react";
import { editPost } from "api/postApi";
import Layout from "components/common/Layout";
import PostForm from "components/common/PostForm";
import {
  EDIT_POST_ERROR_MESSAGES,
  EDIT_POST_SUCCESS_MESSAGES,
} from "constants/EditPost/Message";
import useUserPostDetail from "hooks/useUserPostDetail";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { notifyNegative, notifyPositive } from "utils/toast";
import EditPostSkeleton from "./EditPostSkeleton";

export default function EditPost() {
  const { postId } = useParams();
  let history = useNavigate();
  const { postData, loading, error } = useUserPostDetail(postId);
  const [loadingEditPost, setLoadingEditPost] = useState(false);
  console.log({ postData });

  if (error) {
    return <Navigate to="/" />;
  }
  const onSubmitEditPost = async (postData) => {
    setLoadingEditPost(true);
    editPost({ ...postData, id: postId })
      .then(() => {
        history("/manage");
        notifyPositive({
          message: EDIT_POST_SUCCESS_MESSAGES.EDIT_POST_SUCCESS,
        });
      })
      .catch((err) => {
        notifyNegative({ message: EDIT_POST_ERROR_MESSAGES.EDIT_POST_FAIL });
      })
      .finally(() => {
        setLoadingEditPost(false);
      });
  };

  return (
    <Layout>
      <Breadcrumb style={{ padding: "10px 12px", margin: "0 auto" }}>
        <Breadcrumb.Item>
          <Link to={`/`}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/manage`}>Manage Posts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Edit Post</Breadcrumb.Item>
      </Breadcrumb>
      <PostForm
        loading={loadingEditPost}
        submitText="Save"
        data={postData}
        onSubmit={onSubmitEditPost}
      />
      {loading && <EditPostSkeleton />}
    </Layout>
  );
}
