import { Icon, Breadcrumb } from "@ahaui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  getUserPostsAction,
  loadMoreUserPostsAction,
} from "store/userPostsSlice";
import Layout from "components/common/Layout";
import LoadMoreBtn from "components/common/LoadMoreBtn";
import PostList from "components/common/Post/PostList";
import PostListSkeleton from "components/common/Post/PostListSkeleton";
import { AddIcon } from "../AddPost/AddIcon";
import { notifyNegative } from "utils/toast";

export default function Manage() {
  const dispatch = useDispatch();

  const { data, loading, error, page, maximumNumOfPages } = useSelector(
    (state) => state.userPosts
  );
  const canLoadMore = page < maximumNumOfPages;

  const onLoadMore = () => {
    dispatch(loadMoreUserPostsAction({}))
      .unwrap()
      .catch((error) => {
        return notifyNegative({ message: error.message });
      });
  };

  useEffect(() => {
    dispatch(getUserPostsAction({ page: 1, items_per_page: 10 }))
      .unwrap()
      .catch((error) => {
        return notifyNegative({ message: error.message });
      });
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
      <Breadcrumb style={{ padding: "10px 12px", margin: "0 auto" }}>
        <Breadcrumb.Item>
          <Link to={`/`}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Manage Posts</Breadcrumb.Item>
      </Breadcrumb>
      {loading && <PostListSkeleton aria-label="loading" num={5} />}
      {data && data.length > 0 ? (
        <PostList isManagePost={true} data={data} />
      ) : (
        noPost2Show
      )}
      {canLoadMore && <LoadMoreBtn onLoadMore={onLoadMore} loading={loading} />}

      <Link to="/add-post">
        <AddIcon data-testid="add-icon-btn">
          <Icon size="large" name="plus" />
        </AddIcon>
      </Link>
    </Layout>
  );
}

const NoPostToShowWrapper = styled.div`
  margin: 24px auto;
`;
