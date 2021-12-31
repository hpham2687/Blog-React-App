import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import PostForm from "../components/Manage/PostForm";

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
      <PostForm submitText="Add" onSubmit={onSubmitAddPost} />
    </Layout>
  );
}
