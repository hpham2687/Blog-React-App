import React, { useState } from "react";
import { Card, Icon, Separator, Button } from "@ahaui/react";
import styled from "styled-components";
import { Tag } from "@ahaui/react";
import { Avatar } from "@ahaui/react";
import { Link } from "react-router-dom";
import ModalConfirm from "../../Modal/ModalConfirm";
import { timestampToDate } from "../../../utils/datetime";

export default function Post(props) {
  let { id, title, authorName, createdAt, picture, isManagePost } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitRemove = () => {
    console.log("removing " + id);
  };
  return (
    <PostListWrapper>
      {show && (
        <ModalConfirm
          onSubmitRemove={onSubmitRemove}
          show={show}
          onClose={handleClose}
          setShow={setShow}
        />
      )}
      <StyledCard>
        <img className="u-maxWidthFull" sizes={"small"} src={picture} alt="" />
        <StyledCard.Body className="Card-body">
          <p>{title}</p>
        </StyledCard.Body>
        <Separator />
        <StyledCard.Body className="Card-footer">
          <CardFooterWrapper>
            {!isManagePost && (
              <Avatar
                className="u-backgroundPrimaryLight u-text200"
                text="KT"
              />
            )}
            <div className="Card-footer__desc">
              {!isManagePost && <span className="u-block">{authorName}</span>}
              <Tag variant="primary">{timestampToDate(createdAt)}</Tag>
            </div>

            <Link
              style={{ marginLeft: "auto" }}
              to={isManagePost ? `/edit-post/${id}` : `posts/${id}`}
            >
              <StyledViewButton size={"small"} variant="primary">
                {isManagePost ? "Edit" : "View"}
              </StyledViewButton>
            </Link>
            {/* <Button variant="primary">Button</Button> */}
          </CardFooterWrapper>
        </StyledCard.Body>
        {isManagePost && (
          <RemoveIcon onClick={handleShow} size="medium" name="closeCircle" />
        )}
      </StyledCard>
    </PostListWrapper>
  );
}

const RemoveIcon = styled(Icon)`
  transition: all 0.2s ease-out;
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

const PostListWrapper = styled.div`
  flex: 1;
  min-width: 275px;
  max-width: 300px;
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
    p {
      margin-bottom: 0;
    }
  }
`;

const StyledViewButton = styled(Button)`
  align-self: center;
  margin-left: auto;
`;
