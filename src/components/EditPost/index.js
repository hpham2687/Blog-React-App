import { Button } from "@ahaui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  EDIT_POST_ERROR_MESSAGES,
  EDIT_POST_SUCCESS_MESSAGES,
} from "../../constants/EditPost/Message";
import usePostDetail from "../../hooks/usePostDetail";
import { notifyNegative, notifyPositive } from "../../utils/toast";
import Layout from "../common/Layout";
import PostForm from "../common/PostForm";
import { editPost } from "./../../api/postApi";
import EditPostSkeleton from "./EditPostSkeleton";

export default function EditPost() {
  const { postId } = useParams();

  const { postData, loading } = usePostDetail(postId);
  const [loadingEditPost, setLoadingEditPost] = useState(false);

  const onSubmitEditPost = async (postData) => {
    try {
      setLoadingEditPost(true);
      const editedPost = await editPost({ ...postData, id: postId });
      if (editedPost) {
        notifyPositive({
          message: EDIT_POST_SUCCESS_MESSAGES.EDIT_POST_SUCCESS,
        });
      }
      setLoadingEditPost(false);
    } catch (error) {
      setLoadingEditPost(false);
      notifyNegative({ message: EDIT_POST_ERROR_MESSAGES.EDIT_POST_FAIL });
    }
  };

  return (
    <Layout>
      <BackButton variant="primary">
        <Link style={{ display: "block", width: "100%" }} to={`/manage`}>
          Back
        </Link>
      </BackButton>
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

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;
