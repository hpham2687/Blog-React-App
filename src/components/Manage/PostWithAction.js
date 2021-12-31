import React from "react";
import { Card, Dropdown, Separator, Button } from "@ahaui/react";
import styled from "styled-components";
import { Tag } from "@ahaui/react";
import { Icon } from "@ahaui/react";
import { Link } from "react-router-dom";

export default function PostWithAction(props) {
  let { _id, title, content, picture } = props;

  return (
    <PostWrapper>
      <StyledCard>
        <img className="u-maxWidthFull" sizes={"small"} src={picture} alt="" />
        <StyledCard.Body className="Card-body">
          <p>{content}</p>
        </StyledCard.Body>
        <Separator />
        <StyledCard.Body className="Card-footer">
          <CardFooterWrapper>
            <div className="Card-footer__desc">
              <Tag variant="primary">27/2/2021</Tag>
            </div>

            <Link style={{ marginLeft: "auto" }} to={`posts/${_id}`}>
              <StyledViewButton size={"small"} variant="primary">
                Edit
              </StyledViewButton>
            </Link>
            {/* <Button variant="primary">Button</Button> */}
          </CardFooterWrapper>
        </StyledCard.Body>
        <StyledIcon size="medium" name="closeCircle" />
      </StyledCard>
    </PostWrapper>
  );
}

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const CardFooterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostWrapper = styled.div`
  flex: 1;
  max-width: 275px;
  min-width: 275px;
`;

const StyledCard = styled(Card)`
  position: relative;
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
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 16px;
  }
`;

const StyledViewButton = styled(Button)`
  align-self: center;
  margin-left: auto;
`;
