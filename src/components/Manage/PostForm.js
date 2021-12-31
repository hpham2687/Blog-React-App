import { Button, Card, Form, Loader } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD_POST_ERROR_MESSAGES } from "../../constants/AddPost/Message";
import { resetErrorAction } from "../../store/reducers/authReducer";

export default function PostForm({ submitText, ...props }) {
  let loading;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ title, content, image }) => {
    console.log({
      title,
      content,
      image,
    });
    // TODO: Add dispatch action
    // dispatch(
    //   loginAction({
    //     title,
    //     content,
    //   })
    // );
  };

  //   const isHasUsernameError = errorApi?.username || errors?.username;
  const isHasUsernameError = errors?.title;
  const isHasContentError = errors?.content;
  const isHasImageError = errors?.image;
  return (
    <PostFormWrapper>
      <Card style={{ height: "fit-content" }} size={"medium"}>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Form.Group controlId="addPostForm.title">
                <Form.Label>Title</Form.Label>
                <Form.Input
                  type="text"
                  isInvalid={isHasUsernameError}
                  placeholder="Enter title"
                  {...register("title", {
                    required: ADD_POST_ERROR_MESSAGES.TITLE_REQUIRED,
                    onChange: () => {
                      dispatch(resetErrorAction());
                    },
                  })}
                />
                {isHasUsernameError && (
                  <Form.Feedback type="invalid">
                    {errors?.title.message}
                    {/* {errorApi?.username || errors?.username.message} */}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="addPostForm.content">
                <Form.Label>Content</Form.Label>
                <Form.Input
                  as="textarea"
                  rows={3}
                  type="text"
                  isInvalid={isHasContentError}
                  placeholder="Enter content"
                  {...register("content", {
                    required: ADD_POST_ERROR_MESSAGES.CONTENT_REQUIRED,
                    onChange: () => {
                      dispatch(resetErrorAction());
                    },
                  })}
                />
                {isHasContentError && (
                  <Form.Feedback type="invalid">
                    {errors?.content.message}
                    {/* {errorApi?.password || errors?.password.message} */}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="addPostForm.image">
                <Form.Label>Image</Form.Label>
                <Form.Input
                  type="text"
                  isInvalid={isHasImageError}
                  placeholder="Enter image url"
                  {...register("image", {
                    required: ADD_POST_ERROR_MESSAGES.IMAGE_REQUIRED,
                    onChange: () => {
                      dispatch(resetErrorAction());
                    },
                  })}
                />
                {isHasImageError && (
                  <Form.Feedback type="invalid">
                    {errors?.image.message}
                    {/* {errorApi?.password || errors?.password.message} */}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Button
                size={"small"}
                type="submit"
                variant="primary"
                className="u-marginRightSmall"
              >
                <Button.Label>
                  {loading ? <Loader size="small" /> : submitText}
                </Button.Label>
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 88px);
  background: url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;
