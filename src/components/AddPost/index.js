import { Button } from "@ahaui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPostsAction } from "store/postsSlice";
import Layout from "components/common/Layout";
import PostForm from "components/common/PostForm";
import { notifyNegative, notifyPositive } from "utils/toast";
import {
  ADD_POST_ERROR_MESSAGES,
  ADD_POST_SUCCESS_MESSAGES,
} from "constants/AddPost/Message";

export default function AddPost(props) {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [loadingEditPost, setLoadingEditPost] = useState(false);

  const onSubmitAddPost = async (postData) => {
    setLoadingEditPost(true);
    dispatch(createPostsAction(postData))
      .unwrap()
      .then((response) => {
        setLoadingEditPost(false);
        history("/manage");
        notifyPositive({ message: ADD_POST_SUCCESS_MESSAGES.ADD_POST_SUCCESS });
      })
      .catch((error) => {
        notifyNegative({ message: ADD_POST_ERROR_MESSAGES.ADD_POST_FAIL });
      });
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
