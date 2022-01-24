import { Avatar, Button, Card, Icon, Separator, Tag } from "@ahaui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removePostAction } from "store/postsSlice";
import ModalConfirm from "components/Modal/ModalConfirm";
import PropTypes from "prop-types"; // ES6
import { notifyNegative, notifyPositive } from "utils/toast";
import { useTheme } from "context/ThemeContext";
import { getUserPostsAction } from "store/userPostsSlice";

Post.propTypes = {
  authorId: PropTypes.string,
  authorName: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  picture: PropTypes.string,
  title: PropTypes.string,
};
Post.defaultProps = {};

export default function Post(props) {
  let { id, title, authorName, createdAt, picture, isManagePost } = props;
  const [isDarkMode] = useTheme();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitRemove = async () => {
    dispatch(removePostAction({ postId: id }))
      .unwrap()
      .then((response) => {
        dispatch(getUserPostsAction({ page: 1, items_per_page: 10 }));
        notifyPositive({ message: `Delete post ${id} successfully.` });
      })
      .catch((error) => {
        notifyNegative({ message: error.message });
      });
  };
  return (
    <PostListWrapper>
      {show && (
        <ModalConfirm
          content={
            <>
              Do you want to delete post with id <b>{id}</b>?
            </>
          }
          onConfirm={onSubmitRemove}
          show={show}
          handleClose={handleClose}
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
                className={`${
                  isDarkMode ? "" : "u-backgroundPrimaryLight"
                } u-text200`}
                text={authorName.substring(0, 2).toUpperCase()}
              />
            )}
            <div className="Card-footer__desc">
              {!isManagePost && <span className="u-block">{authorName}</span>}
              <Tag variant="primary">{createdAt}</Tag>
            </div>

            <Link
              data-testid="action-btn"
              style={{ marginLeft: "auto" }}
              to={isManagePost ? `/edit-post/${id}` : `posts/${id}`}
            >
              <StyledViewButton size={"small"} variant="primary">
                {isManagePost ? "Edit" : "View"}
              </StyledViewButton>
            </Link>
          </CardFooterWrapper>
        </StyledCard.Body>
        {isManagePost && (
          <RemoveIcon
            className="remove-icon"
            onClick={handleShow}
            size="medium"
            name="closeCircle"
          />
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
  color: var(--colorNegative);
`;
const CardFooterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostListWrapper = styled.div`
  display: flex;
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

  border: 1px solid #a5adba;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }
  img {
    width: 100%;
    display: block;

    height: 70%;
  }
  .Card-footer {
    padding: 8px 12px;
  }
  .Card-footer__desc {
    margin: 0px 0px 0px 8px;

    cursor: default;
    span {
      text-align: left;
    }
  }
  .Card-body {
    padding-bottom: 4px;

    cursor: default;
    margin-bottom: 16px;
    p {
      margin-bottom: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

const StyledViewButton = styled(Button)`
  align-self: center;
  margin-left: auto;
`;
