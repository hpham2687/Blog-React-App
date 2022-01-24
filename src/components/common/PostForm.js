import { Button, Card, Form, Loader } from "@ahaui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_POST_ERROR_MESSAGES } from "constants/AddPost/Message";
import { FORM_VALIDATOR } from "constants/common";
import PropTypes from "prop-types"; // ES6
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { device } from "utils/mediaQuery";
import * as Yup from "yup";

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
  Yup.addMethod(Yup.string, "imageUrlValidation", function (errorMessage) {
    return this.test(`test-format`, errorMessage, function (value) {
      const { path, createError } = this;
      if (!value) return true;
      return (
        /(https?:\/\/.*\.(?:png|jpg))/i.test(value) ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(ADD_POST_ERROR_MESSAGES.TITLE_REQUIRED)
      .min(
        FORM_VALIDATOR.MIN_TITLE_LENGTH,
        ADD_POST_ERROR_MESSAGES.TITLE_LENGTH_SHORT
      )
      .max(
        FORM_VALIDATOR.MAX_TITLE_LENGTH,
        ADD_POST_ERROR_MESSAGES.TITLE_LENGTH_EXCEED
      ),
    content: Yup.string()
      .required(ADD_POST_ERROR_MESSAGES.CONTENT_REQUIRED)
      .min(
        FORM_VALIDATOR.MIN_CONTENT_LENGTH,
        ADD_POST_ERROR_MESSAGES.CONTENT_LENGTH_SHORT
      )
      .max(
        FORM_VALIDATOR.MAX_CONTENT_LENGTH,
        ADD_POST_ERROR_MESSAGES.CONTENT_LENGTH_EXCEED
      ),
    picture: Yup.string().imageUrlValidation(
      ADD_POST_ERROR_MESSAGES.INVALID_IMAGE_URL
    ),
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: data,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const isHasTitleNameError = errors?.title;
  const isHasContentError = errors?.content;
  const isHasPictureError = errors?.picture;

  return (
    <PostFormWrapper className="post-form-wrapper">
      <StyledCard className="u-borderLight" size={"medium"}>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                      {...register("title")}
                      {...field}
                    />
                  )}
                />
                {isHasTitleNameError && (
                  <Form.Feedback data-testid="error-title-msg" type="invalid">
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
                      rows={5}
                      type="text"
                      isInvalid={isHasContentError}
                      placeholder="Enter content"
                      {...register("content")}
                      {...field}
                    />
                  )}
                />
                {isHasContentError && (
                  <Form.Feedback data-testid="error-content-msg" type="invalid">
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
                      {...register("picture")}
                    />
                  )}
                />

                {isHasPictureError && (
                  <Form.Feedback data-testid="error-picture-msg" type="invalid">
                    {errors?.picture.message}
                  </Form.Feedback>
                )}
              </Form.Group>
              <Button
                disabled={isSubmitting}
                size={"small"}
                type="submit"
                variant="primary"
                style={{ marginLeft: "auto" }}
              >
                <Button.Label>
                  {loading ? (
                    <Loader aria-label="loading..." size="small" />
                  ) : (
                    submitText
                  )}
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
  padding: 12px 8px;
  padding-top: 64px;
  height: calc(100vh - 152px);
`;

const StyledCard = styled(Card)`
  min-width: 400px;
  height: fit-content;
  @media ${device.mobileL} {
    min-width: 80%;
  }
`;
