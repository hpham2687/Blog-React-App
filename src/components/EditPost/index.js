import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import PostForm from "../common/PostForm";
import { Button } from "@ahaui/react";
import styled from "styled-components";
import { getPostDetail } from "../../api/postApi";
import { useState } from "react";
import { editPost } from "./../../api/postApi";
import { notifyNegative, notifyPositive } from "../../utils/toast";
export default function EditPost() {
  const { postId } = useParams();

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState({});

  let { id } = postData;

  React.useEffect(() => {
    // TODO: fetch post detail
    async function fetchPostDetail() {
      setLoading(true);
      let response = await getPostDetail(postId);
      // console.log(response.data);
      setPostData(response.data);
      setLoading(false);
    }

    fetchPostDetail();
  }, []);

  const onSubmitEditPost = async (postData) => {
    try {
      const editedPost = await editPost({ ...postData, id });
      if (editedPost) {
        notifyPositive({ message: "Edit post sucessfully." });
      }
    } catch (error) {
      notifyNegative({ message: `Cannot delete post with id ${id} ` });
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
    </Layout>
  );
}

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;
