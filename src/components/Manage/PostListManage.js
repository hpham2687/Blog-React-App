import React from "react";
import { Card, Button } from "@ahaui/react";
import styled from "styled-components";
import PostWithAction from "./PostWithAction";

export default function PostListManage({ data }) {
  return (
    <>
      <PostListWrapper>
        {data.map((item, index) => (
          <PostWithAction {...item} key={item._id} />
        ))}
      </PostListWrapper>
    </>
  );
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  margin-right: -16px;
  margin-left: -16px;
`;
