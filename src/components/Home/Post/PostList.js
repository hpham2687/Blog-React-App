import React from "react";
import Post from "./Post";
import styled from "styled-components";
import { device } from "../../../utils/mediaQuery";
export default React.memo(function PostList({
  data,
  isManagePost = false,
} = {}) {
  return (
    <PostListWrapper>
      {data.length > 0 &&
        data.map((item, index) => (
          <Post isManagePost={isManagePost} {...item} key={item.id} />
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
