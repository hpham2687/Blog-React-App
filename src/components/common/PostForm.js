import { Button, Card, Form, Loader } from "@ahaui/react";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { ADD_POST_ERROR_MESSAGES } from "constants/AddPost/Message";
import PropTypes from "prop-types"; // ES6
import { device } from "utils/mediaQuery";
import { FORM_VALIDATOR } from "constants/common";

PostForm.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    authorId: PropTypes.string,
    authorName: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
  }),
};
export default function PostForm({
  submitText,
  onSubmit,
  loading,
  data = null,
  ...rest
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return data ? data : {};
    }, [data]),
  });

  useEffect(() => {
    if (!data) return;
    reset(data);
  }, [data, reset]);

  const isHasTitleNameError = errors?.title;
  const isHasContentError = errors?.content;
  const isHasPictureError = errors?.picture;

  return (
    <PostFormWrapper>
      <StyledCard size={"medium"}>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Form.Group controlId="addPostForm.title">
                <Form.Label>Title</Form.Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      type="text"
                      isInvalid={isHasTitleNameError}
                      placeholder="Enter title"
                      {...register("title", {
                        required: ADD_POST_ERROR_MESSAGES.TITLE_REQUIRED,
                        maxLength: {
                          value: FORM_VALIDATOR.MAX_TITLE_LENGTH,
                          message: ADD_POST_ERROR_MESSAGES.TITLE_LENGTH_EXCEED,
                        },
                        minLength: {
                          value: FORM_VALIDATOR.MIN_TITLE_LENGTH,
                          message: ADD_POST_ERROR_MESSAGES.TITLE_LENGTH_SHORT,
                        },
                      })}
                      {...field}
                    />
                  )}
                />
                {isHasTitleNameError && (
                  <Form.Feedback type="invalid">
                    {errors?.title.message}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="addPostForm.content">
                <Form.Label>Content</Form.Label>

                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      as="textarea"
                      rows={3}
                      type="text"
                      isInvalid={isHasContentError}
                      placeholder="Enter content"
                      {...register("content", {
                        maxLength: {
                          value: FORM_VALIDATOR.MAX_CONTENT_LENGTH,
                          message:
                            ADD_POST_ERROR_MESSAGES.CONTENT_LENGTH_EXCEED,
                        },
                        minLength: {
                          value: FORM_VALIDATOR.MIN_CONTENT_LENGTH,
                          message: ADD_POST_ERROR_MESSAGES.CONTENT_LENGTH_SHORT,
                        },
                        required: ADD_POST_ERROR_MESSAGES.CONTENT_REQUIRED,
                      })}
                      {...field}
                    />
                  )}
                />
                {isHasContentError && (
                  <Form.Feedback type="invalid">
                    {errors?.content.message}
                    {/* {errorApi?.password || errors?.password.message} */}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="addPostForm.picture">
                <Form.Label>Image</Form.Label>
                <Controller
                  name="picture"
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="text"
                      isInvalid={isHasPictureError}
                      placeholder="Enter image url"
                      {...register("picture", {
                        required: ADD_POST_ERROR_MESSAGES.IMAGE_REQUIRED,
                        pattern: {
                          value:
                            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                          message: ADD_POST_ERROR_MESSAGES.INVALID_IMAGE_URL,
                        },
                      })}
                    />
                  )}
                />

                {isHasPictureError && (
                  <Form.Feedback type="invalid">
                    {errors?.picture.message}
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
      </StyledCard>
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 88px);
  background: url(/assets/images/background.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledCard = styled(Card)`
  min-width: 400px;
  height: fit-content;
  @media ${device.mobileL} {
    min-width: 80%;
  }
`;