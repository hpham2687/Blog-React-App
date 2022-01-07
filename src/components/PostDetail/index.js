import { Avatar, Button, Card, Separator, Tag } from "@ahaui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../common/Layout";
import PostDetailSkeleton from "./PostDetailSkeleton";

export default function PostDetail() {
  const { postId } = useParams();
  let loading;
  React.useEffect(() => {
    // TODO: fetch post detail
  });
  let { title, content, picture } = {
    _id: "lorem lorme lorem mot hai ba boon nam sau",
    title: "lorem lorme lorem mot hai ba boon nam sau",
    content:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum,    ",
    picture:
      "https://huwng.files.wordpress.com/2017/10/qxf2-gun-decorator1.jpg",
  };
  console.log(postId);
  const ThumbnailBackground = styled.div`
    width: 100%;
    min-height: 200px;
    background: url(${picture});
    background-size: contain;
    background-repeat: none;
    position: absolute;
    filter: blur(1px);
  `;
  const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 200px;
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
        ) : (
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
                  <span className="u-block">Kriss pham</span>
                  <Tag variant="primary">27/2/2021</Tag>
                </div>
              </CardFooterWrapper>
            </StyledCard.Body>
          </StyledCard>
        )}
      </PostListWrapper>
    </Layout>
  );
}

const ThumbnailTitle = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  z-index: 100;
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
  min-width: 275px;
  margin: 0 auto;
  max-width: 700px;
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
  }
`;
