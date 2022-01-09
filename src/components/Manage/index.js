import { Icon } from "@ahaui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserPostsAction } from "../../store/reducers/userPostsReducer";
import { device } from "../../utils/mediaQuery";
import Layout from "../common/Layout";
import PostList from "../Home/Post/PostList";
import PostListSkeleton from "../Home/Post/PostListSkeleton";

export default function Manage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userPosts);
  const { user } = useSelector((state) => state.auth);
  console.log({ data });

  useEffect(() => {
    // get posts list of user
    dispatch(getUserPostsAction({ page: 1, items_per_page: 6 }));
  }, []);

  if (error) {
    return error;
  }

  const noPost2Show = (
    <NoPostToShowWrapper>
      <h4>No posts to show.</h4>
      <Link to="/add-post">Create post</Link>
    </NoPostToShowWrapper>
  );

  return (
    <Layout>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      {/* <WrapperPostManage> */}

      {loading && <PostListSkeleton num={5} />}
      {data && data.length > 0 ? (
        <PostList isManagePost={true} data={data} />
      ) : (
        noPost2Show
      )}

      <Link to="/add-post">
        <AddIcon>
          <Icon size="large" name="plus" />
        </AddIcon>
      </Link>
      {/* </WrapperPostManage> */}
    </Layout>
  );
}

const NoPostToShowWrapper = styled.div`
  margin: 24px auto;
`;

const AddIcon = styled.div`
  box-shadow: 0 10px 6px -6px #777;

  cursor: pointer;
  border: 1px solid var(--colorPrimary);
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: white;
  z-index: 2;

  transition: all 0.2s ease-out;
  &:hover {
    &:before {
      left: 0;
    }
  }
  &:before {
    transition: all 0.2s ease-out;

    z-index: 1;
    content: "";
    border-radius: 50%;

    position: absolute;
    top: 0;
    left: 10px;
    right: 0;
    bottom: 0;
    background: var(--colorPrimary);
    opacity: 0.2;
  }

  @media ${device.mobileL} {
    width: 50px;
    height: 50px;
  }
`;
