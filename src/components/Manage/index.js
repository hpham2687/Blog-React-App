import { Icon } from "@ahaui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  getUserPostsAction,
  loadMoreUserPostsAction,
} from "store/reducers/userPostsReducer";
import Layout from "components/common/Layout";
import LoadMoreBtn from "components/Home/LoadMoreBtn";
import PostList from "components/Home/Post/PostList";
import PostListSkeleton from "components/Home/Post/PostListSkeleton";
import { AddIcon } from "../AddPost/AddIcon";

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
