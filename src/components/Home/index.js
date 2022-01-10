import { Icon } from "@ahaui/react";
import Banner from "components/Banner/Banner";
import Layout from "components/common/Layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPostsAction,
  loadMorePostsAction,
} from "store/reducers/postsReducer";
import styled from "styled-components";
import { AddIcon } from "../AddPost/AddIcon";
import LoadMoreBtn from "./LoadMoreBtn";
import PostList from "./Post/PostList";
export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error, page, maximunNumOfPages } = useSelector(
    (state) => state.posts
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  const canLoadMore = page < maximunNumOfPages;
  const onLoadMore = () => {
    dispatch(loadMorePostsAction({}));
  };

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, items_per_page: 10 }));
  }, [dispatch]);

  if (error) {
    return error;
  }

  const noPost2Show = (
    <NoPostToShowWrapper>
      <h4>No posts to show.</h4>
      {!isLoggedIn ? (
        <p>
          <Link style={{ display: "inlines" }} to="/login">
            Login
          </Link>{" "}
          to create posts
        </p>
      ) : (
        <Link to="/add-post">Create post</Link>
      )}
    </NoPostToShowWrapper>
  );

  return (
    <Layout>
      <Banner />
      {data && data.length > 0 ? (
        <PostList data={data} />
      ) : loading ? (
        <img
          style={{ width: "100px", height: "100px", margin: "100px auto" }}
          alt="spinner"
          src="/assets/images/spiner.gif"
        />
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
