import { Button, Card, Form, Loader } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { AUTH_ERROR_MESSAGES } from "constants/Auth/Message";
import { useAuth } from "hooks/useAuth";
import { registerAction, resetErrorAction } from "store/reducers/authReducer";
import Layout from "components/common/Layout";

export default function Register() {
  const { isLoggedIn, loading, error: errorApi } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = ({ email, username, password }) => {
    dispatch(
      registerAction({
        email,
        username,
        password,
      })
    );
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const isHasEmailError = errorApi?.email || errors?.email;
  if (isHasEmailError) {
    console.log("vao day isHasEmailError");
  }
  const isHasUsernameError = errorApi?.username || errors?.username;
  const isHasPasswordError = errorApi?.password || errors?.password;

  return (
    <Layout>
      <RegisterWrapper>
        <Card style={{ height: "fit-content" }} size={"medium"}>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Form.Group controlId="registerForm.email">
                  <Form.Label>Email</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Enter email"
                    isInvalid={isHasEmailError}
                    {...register("email", {
                      required: AUTH_ERROR_MESSAGES.EMAIL_REQUIRED,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: AUTH_ERROR_MESSAGES.EMAIL_INVALID,
                      },
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasEmailError && (
                    <Form.Feedback type="invalid">
                      {errorApi?.email || errors?.email.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="registerForm.username">
                  <Form.Label>Username</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Enter text"
                    isInvalid={isHasUsernameError}
                    {...register("username", {
                      required: AUTH_ERROR_MESSAGES.USERNAME_REQUIRED,
                      minLength: {
                        value: 6,
                        message: AUTH_ERROR_MESSAGES.USERNAME_INVALID_LENGTH,
                      },
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasUsernameError && (
                    <Form.Feedback type="invalid">
                      {errorApi?.username || errors?.username.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="registerForm.password">
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    type="password"
                    placeholder="Enter password"
                    isInvalid={isHasPasswordError}
                    {...register("password", {
                      required: AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED,
                      minLength: {
                        value: 6,
                        message: AUTH_ERROR_MESSAGES.PASSWORD_INVALID_LENGTH,
                      },
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasPasswordError && (
                    <Form.Feedback type="invalid">
                      {errorApi?.password || errors?.password.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <Button
                  size={"small"}
                  variant="primary"
                  className="u-marginRightSmall"
                >
                  <Button.Label>
                    {loading ? <Loader size="small" /> : "Register"}
                  </Button.Label>
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </RegisterWrapper>
    </Layout>
  );
}

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 88px);
  background: url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;
