import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import LoadMoreBtn from "../components/Home/LoadMoreBtn";
import { Icon } from "@ahaui/react";
// import PostList from "../components/Home/PostList";
import PostListManage from "../components/Manage/PostListManage";
import { getPostsAction } from "../store/reducers/postsReducer";
import PostListSkeleton from "../components/Home/Post/PostListSkeleton";
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

  return (
    <Layout>
      {/* <WrapperPostManage> */}

      {/* {loading && <PostListSkeleton num={5} />} */}

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
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f8aba017634368899",
          },
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f8aba017634688b99",
          },
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f8aba076343688b99",
          },
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f8aba0f76343688b99",
          },
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f8aba01743688b99",
          },
          {
            content:
              "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
            gender: "male",
            name: "Pitts Shaw",
            picture: "https://picsum.photos/seed/picsum/300/250",
            posted_date: "2015-07-16T11:52:12 -07:00",
            title: "Dorothy Chase",
            _id: "61ab37f80176343688b99",
          },
        ]}
      />

      <AddIcon>
        <Icon size="large" name="plus" />
      </AddIcon>
      {/* </WrapperPostManage> */}
    </Layout>
  );
}

const AddIcon = styled.div`
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
`;
