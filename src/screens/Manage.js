import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import LoadMoreBtn from "../components/Home/LoadMoreBtn";
// import PostList from "../components/Home/PostList";
import PostListManage from "../components/Manage/PostListManage";
import { getPostsAction } from "../store/reducers/postsReducer";
export default function Manage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  console.log({ user });

  useEffect(() => {
    // get posts list of user
  }, []);

  if (error) {
    return error;
  }

  const WrapperPostManage = styled.div`
    max-height: calc(100vh - 150px);
    overflow: auto;

    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
  `;
  return (
    <Layout>
      <WrapperPostManage>
        <PostListManage
          data={[
            {
              content:
                "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
              gender: "male",
              name: "Pitts Shaw",
              picture: "https://picsum.photos/seed/picsum/300/250",
              posted_date: "2015-07-16T11:52:12 -07:00",
              title: "Dorothy Chase",
              _id: "61ab37f8aba0176343688b99",
            },
          ]}
        />
      </WrapperPostManage>
    </Layout>
  );
}
