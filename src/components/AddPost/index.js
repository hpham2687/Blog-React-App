import { Button } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import PostForm from "../Manage/PostForm";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function AddPost() {
  let loading;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitAddPost = ({ title, content, image }) => {
    console.log({
      title,
      content,
      image,
    });
    // TODO: Add dispatch action
    // dispatch(
    //   loginAction({
    //     title,
    //     content,
    //   })
    // );
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
