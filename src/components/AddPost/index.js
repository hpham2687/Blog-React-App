import { Button } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import PostForm from "../common/PostForm";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createPostsAction } from "../../store/reducers/postsReducer";
import { useNavigate } from "react-router-dom";

export default function AddPost(props) {
  let loading;
  let history = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitAddPost = async ({ title, content, picture }) => {
    console.log({
      title,
      content,
      picture,
    });
    // TODO: Add dispatch action
    await dispatch(
      createPostsAction({
        title,
        content,
        picture,
      })
    ).unwrap();
    history("/manage");
  };

  return (
    <Layout>
      <BackButton variant="primary">
        <Link style={{ display: "block", width: "100%" }} to={`/manage`}>
          Back
        </Link>
      </BackButton>
      <PostForm submitText="Add" onSubmit={onSubmitAddPost} />
    </Layout>
  );
}

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;
