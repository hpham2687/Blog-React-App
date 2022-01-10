import { Button } from "@ahaui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPostsAction } from "store/reducers/postsReducer";
import Layout from "components/common/Layout";
import PostForm from "components/common/PostForm";

export default function AddPost(props) {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [loadingEditPost, setLoadingEditPost] = useState(false);

  const onSubmitAddPost = async ({ title, content, picture }) => {
    setLoadingEditPost(true);
    await dispatch(
      createPostsAction({
        title,
        content,
        picture,
      })
    ).unwrap();
    setLoadingEditPost(false);

    history("/manage");
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
        submitText="Add"
        onSubmit={onSubmitAddPost}
      />
    </Layout>
  );
}

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;
