import { Icon } from "@ahaui/react";
import Banner from "components/common/Banner";
import Layout from "components/common/Layout";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostsAction, loadMorePostsAction } from "store/postsSlice";
import styled from "styled-components";
import { notifyNegative } from "utils/toast";
import { AddIcon } from "../AddPost/AddIcon";
import LoadMoreBtn from "../common/LoadMoreBtn";
import PostList from "../common/Post/PostList";
export default function Home() {
  const dispatch = useDispatch();
  const pageEndRef = useRef(null);
  const { data, loading, error, page, maximumNumOfPages, search } = useSelector(
    (state) => state.posts
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const canLoadMore = page < maximumNumOfPages;
  const onLoadMore = () => {
    dispatch(loadMorePostsAction({}))
      .unwrap()
      .catch((error) => {
        return notifyNegative({ message: error.message });
      });
  };

  useEffect(() => {
    if (page !== 1) pageEndRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, items_per_page: 10 }))
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
      <h4>No posts {search && `with keyword "${search}" `}to show.</h4>
      {!isLoggedIn ? (
        <p>
          <Link to="/login">Login</Link> to create posts
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
          aria-label="Loading..."
          style={{ width: "100px", height: "100px", margin: "100px auto" }}
          alt="spinner"
          src="/assets/images/spiner.gif"
        />
      ) : (
        noPost2Show
      )}

      {canLoadMore && <LoadMoreBtn onLoadMore={onLoadMore} loading={loading} />}

      <Link to="/add-post">
        <AddIcon aria-label="add-icon-btn">
          <Icon size="large" name="plus" />
        </AddIcon>
      </Link>

      <div ref={pageEndRef} />
    </Layout>
  );
}

const NoPostToShowWrapper = styled.div`
  margin: 24px auto;
`;
