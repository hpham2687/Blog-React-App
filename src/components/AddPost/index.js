import { Button, Breadcrumb } from "@ahaui/react";
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
        setLoadingEditPost(false);
        notifyNegative({ message: ADD_POST_ERROR_MESSAGES.ADD_POST_FAIL });
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
        <Breadcrumb.Item href="#">Add Post</Breadcrumb.Item>
      </Breadcrumb>
      <PostForm
        loading={loadingEditPost}
        submitText="Add"
        onSubmit={onSubmitAddPost}
      />
    </Layout>
  );
}
