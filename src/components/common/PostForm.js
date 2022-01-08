import { Button, Card, Form, Loader } from "@ahaui/react";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { ADD_POST_ERROR_MESSAGES } from "../../constants/AddPost/Message";
// TODO: fill all data to input - edit case

export default function PostForm({ submitText, onSubmit, data = {}, ...rest }) {
  let loading;
  let title = data.title;
  console.log({ title });
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return data;
    }, [data]),
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  const isHasTitlenameError = errors?.title;
  const isHasContentError = errors?.content;
  const isHasPictureError = errors?.picture;
  return (
    <PostFormWrapper>
      <Card style={{ height: "fit-content" }} size={"medium"}>
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
                      isInvalid={isHasTitlenameError}
                      placeholder="Enter title"
                      {...register("title", {
                        required: ADD_POST_ERROR_MESSAGES.TITLE_REQUIRED,
                      })}
                      {...field}
                    />
                  )}
                />
                {isHasTitlenameError && (
                  <Form.Feedback type="invalid">
                    {errors?.title.message}
                    {/* {errorApi?.username || errors?.username.message} */}
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
