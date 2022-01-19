import { Avatar, Button, Card, Separator, Tag } from "@ahaui/react";
import Layout from "components/common/Layout";
import { useAuth } from "hooks/useAuth";
import usePostDetail from "hooks/usePostDetail";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "utils/mediaQuery";
import PostDetailSkeleton from "./PostDetailSkeleton";

export default function PostDetail() {
  const { postId } = useParams();
  const { postData, loading } = usePostDetail(postId);

  let userId = null;
  const { user = null } = useAuth();
  if (user) {
    userId = user?.id;
  }
  let { title, content, picture, authorName, createdAt, authorId, id } =
    postData || {};

  const isUserPost = userId === authorId;

  const ThumbnailBackground = styled.div`
    width: 100%;
    min-height: 200px;
    background: url(${picture});
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    filter: blur(1px);
  `;

  return (
    <Layout>
      <BackButton variant="primary">
        <Link style={{ display: "block", width: "100%" }} to={`/`}>
          Back
        </Link>
      </BackButton>
      <PostListWrapper>
        {loading ? (
          <PostDetailSkeleton />
        ) : postData ? (
          <StyledCard>
            <ThumbnailWrapper>
              <ThumbnailBackground></ThumbnailBackground>
              <ThumbnailTitle>{title}</ThumbnailTitle>
            </ThumbnailWrapper>
            <StyledCard.Body className="Card-body">
              <p>{content}</p>
            </StyledCard.Body>
            <Separator />
            <StyledCard.Body className="Card-footer">
              <CardFooterWrapper>
                <Avatar
                  className="u-backgroundPrimaryLight u-text200"
                  text="KT"
                />
                <div className="Card-footer__desc">
                  <span className="u-block">{authorName}</span>
                  <Tag variant="primary">{createdAt}</Tag>
                </div>
                {isUserPost && (
                  <Link style={{ marginLeft: "auto" }} to={`/edit-post/${id}`}>
                    <StyledViewButton size={"small"} variant="primary">
                      {"Edit"}
                    </StyledViewButton>
                  </Link>
                )}
              </CardFooterWrapper>
            </StyledCard.Body>
          </StyledCard>
        ) : (
          <StyledNotExist>Post does not exist!</StyledNotExist>
        )}
      </PostListWrapper>
    </Layout>
  );
}
const StyledNotExist = styled.p`
  margin: 12px auto;
  text-align: center;
`;
const ThumbnailTitle = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  z-index: 30;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/opacity/see-through */
  border: 3px solid #f1f1f1;
  color: white;
  padding: 6px 8px;
`;

const BackButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
  }
`;

const CardFooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostListWrapper = styled.div`
  flex: 1;
  max-width: 275px;
  min-width: 500px;
  margin: 0 auto;
  max-width: 700px;
  @media ${device.mobileL} {
    min-width: 70%;
    margin: 0;
  }
`;

const StyledCard = styled(Card)`
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  overflow: hidden;
  margin: 16px;

  a {
    text-decoration: none;
  }
  img {
    width: 100%;

    display: block;
  }
  .Card-footer {
    padding: 8px 12px;
  }
  .Card-footer__desc {
    margin: 0px 0px 0px 8px;
  }
  .Card-body {
    padding-bottom: 0;
    margin-bottom: 16px;
    p {
      text-align: left;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 200px;
`;

const StyledViewButton = styled(Button)`
  align-self: center;
  margin-left: auto;
`;
