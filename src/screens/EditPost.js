import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import PostForm from "../components/Manage/PostForm";

export default function EditPost() {
  const { postId } = useParams();
  console.log(postId);
  let postData = {
    title: "abcd",
  };
  useEffect(() => {
    // TODO: fetch post detail
  }, [postId]);
  const onSubmitEditPost = ({ title, content, image }) => {
    console.log({
      title,
      content,
      image,
    });
    // TODO: Add dispatch action edit
    // dispatch(
    //   loginAction({
    //     title,
    //     content,
    //   })
    // );
  };

  return (
    <Layout>
      <PostForm submitText="Edit" data={postData} onSubmit={onSubmitEditPost} />
    </Layout>
  );
}
