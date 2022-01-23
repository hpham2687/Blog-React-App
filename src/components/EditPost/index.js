import { Button, Breadcrumb } from "@ahaui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  EDIT_POST_ERROR_MESSAGES,
  EDIT_POST_SUCCESS_MESSAGES,
} from "constants/EditPost/Message";
import usePostDetail from "hooks/usePostDetail";
import { notifyNegative, notifyPositive } from "utils/toast";
import Layout from "components/common/Layout";
import PostForm from "components/common/PostForm";
import { editPost } from "api/postApi";
import EditPostSkeleton from "./EditPostSkeleton";

export default function EditPost() {
  const { postId } = useParams();

  const { postData, loading } = usePostDetail(postId);
  const [loadingEditPost, setLoadingEditPost] = useState(false);

  const onSubmitEditPost = async (postData) => {
    setLoadingEditPost(true);
    editPost({ ...postData, id: postId })
      .then(() => {
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
