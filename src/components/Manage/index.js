import { Icon } from "@ahaui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  getUserPostsAction,
  loadMoreUserPostsAction,
} from "../../store/reducers/userPostsReducer";
import { device } from "../../utils/mediaQuery";
import Layout from "../common/Layout";
import LoadMoreBtn from "../Home/LoadMoreBtn";
import PostList from "../Home/Post/PostList";
import PostListSkeleton from "../Home/Post/PostListSkeleton";

export default function Manage() {
  const dispatch = useDispatch();

  const { data, loading, error, page, maximunNumOfPages } = useSelector(
    (state) => state.userPosts
  );
  const canLoadMore = page < maximunNumOfPages;
  const onLoadMore = () => {
    dispatch(loadMoreUserPostsAction({}));
  };
  useEffect(() => {
    // get posts list of user
    dispatch(getUserPostsAction({ page: 1, items_per_page: 6 }));
  }, [dispatch]);

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
      {loading && <PostListSkeleton num={5} />}
      {data && data.length > 0 ? (
        <PostList isManagePost={true} data={data} />
      ) : (
        noPost2Show
      )}
      {canLoadMore && <LoadMoreBtn onLoadMore={onLoadMore} loading={loading} />}

      <Link to="/add-post">
        <AddIcon>
          <Icon size="large" name="plus" />
        </AddIcon>
      </Link>
    </Layout>
  );
}

const NoPostToShowWrapper = styled.div`
  margin: 24px auto;
`;

const AddIcon = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
    svg {
      color: blue;
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
