import React from "react";
import Post from "./Post";
import styled from "styled-components";
export default React.memo(function PostList({ data }) {
  return (
    <PostListWrapper>
      {data.map((item, index) => (
        <Post {...item} key={item._id} />
      ))}
    </PostListWrapper>
  );
});

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  margin-right: -16px;
  margin-left: -16px;
`;
