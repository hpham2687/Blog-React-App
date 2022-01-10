import { Button } from "@ahaui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostDetail } from "../../api/postApi";
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
        notifyPositive({ message: "Edit post sucessfully." });
      }
      setLoadingEditPost(false);
    } catch (error) {
      setLoadingEditPost(false);
      notifyNegative({ message: `Cannot edit post with id ${postId} ` });
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
