import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./../Banner/Banner";
import Layout from "../common/Layout";
import LoadMoreBtn from "./LoadMoreBtn";
import PostList from "./Post/PostList";
import PostListSkeleton from "./Post/PostListSkeleton";
import { getPostsAction } from "../../store/reducers/postsReducer";
export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error, page, maximunNumOfPages } = useSelector(
    (state) => state.posts
  );
  const canLoadMore = page < maximunNumOfPages;

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, items_per_page: 6 }));
  }, []);

  if (error) {
    return error;
  }

  return (
    <Layout>
      <Banner />
      {data && data.length > 0 ? <PostList data={data} /> : null}
      {loading && <PostListSkeleton num={5} />}
      {canLoadMore && <LoadMoreBtn loading={loading} />}
    </Layout>
  );
}
