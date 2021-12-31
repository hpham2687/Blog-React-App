import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
import Layout from "../components/common/Layout";
import LoadMoreBtn from "../components/Home/LoadMoreBtn";
import PostList from "../components/Home/Post/PostList";
import PostListSkeleton from "../components/Home/Post/PostListSkeleton";
import { getPostsAction } from "../store/reducers/postsReducer";
export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // throw Error("loi roi");
    dispatch(getPostsAction({}));
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
