import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import PostForm from "../common/PostForm";
import { Button } from "@ahaui/react";
import styled from "styled-components";

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
      <BackButton variant="primary">
        <Link style={{ display: "block", width: "100%" }} to={`/manage`}>
          Back
        </Link>
      </BackButton>
      <PostForm submitText="Edit" data={postData} onSubmit={onSubmitEditPost} />
    </Layout>
  );
}

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;
