import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./../Banner/Banner";
import Layout from "../common/Layout";
import LoadMoreBtn from "./LoadMoreBtn";
import PostList from "./Post/PostList";
import PostListSkeleton from "./Post/PostListSkeleton";
import {
  getPostsAction,
  getUserPostsAction,
} from "../../store/reducers/postsReducer";
export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, items_per_page: 6, search: "1" }));
  }, []);

  if (error) {
    return error;
  }

  // let PageBody = ;

  return (
    <Layout>
      <Banner />
      {data && data.length > 0 ? <PostList data={data} /> : null}

      {loading && <PostListSkeleton num={5} />}
      <LoadMoreBtn loading={loading} />
    </Layout>
  );
}
