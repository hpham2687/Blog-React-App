import { Button } from "@ahaui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostDetail } from "../../api/postApi";
import { notifyNegative, notifyPositive } from "../../utils/toast";
import Layout from "../common/Layout";
import PostForm from "../common/PostForm";
import { editPost } from "./../../api/postApi";
import EditPostSkeleton from "./EditPostSkeleton";

export default function EditPost() {
  const { postId } = useParams();

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState({});

  React.useEffect(() => {
    async function fetchPostDetail() {
      setLoading(true);
      let response = await getPostDetail(postId);
      setPostData(response.data);
      setLoading(false);
    }

    fetchPostDetail();
  }, [postId]);

  const onSubmitEditPost = async (postData) => {
    try {
      const editedPost = await editPost({ ...postData, id: postId });
      if (editedPost) {
        notifyPositive({ message: "Edit post sucessfully." });
      }
    } catch (error) {
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
      <PostForm submitText="Save" data={postData} onSubmit={onSubmitEditPost} />
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
