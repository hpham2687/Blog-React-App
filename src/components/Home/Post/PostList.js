import React from "react";
import Post from "./Post";
import styled from "styled-components";
import { device } from "../../../utils/mediaQuery";
export default React.memo(function PostList({ data }) {
  return (
    <PostListWrapper id="dsfs">
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

  @media ${device.mobileL} {
    padding: 0;

    justify-content: center;
  }
`;
