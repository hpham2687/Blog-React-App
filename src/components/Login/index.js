import { Button, Card, Form, Loader } from "@ahaui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "components/common/Layout";
import { useAuth } from "hooks/useAuth";
import { loginAction, resetErrorAction } from "store/reducers/authReducer";
import { useForm } from "react-hook-form";
import { AUTH_ERROR_MESSAGES } from "constants/Auth/Message";

export default function Login() {
  const { isLoggedIn, loading, error: errorApi } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, password }) => {
    dispatch(
      loginAction({
        username,
        password,
      })
    );
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const isHasUsernameError = errorApi?.username || errors?.username;
  const isHasPasswordError = errors?.password || errorApi?.password;
  return (
    <Layout>
      <LoginWrapper>
        <Card style={{ height: "fit-content" }} size={"medium"}>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Form.Group controlId="loginForm.username">
                  <Form.Label>Username</Form.Label>
                  <Form.Input
                    type="text"
                    isInvalid={isHasUsernameError}
                    placeholder="Enter text"
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
                <Form.Group controlId="loginForm.password">
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    type="password"
                    isInvalid={isHasPasswordError}
                    placeholder="Enter password"
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
                  type="submit"
                  variant="primary"
                  className="u-marginRightSmall"
                >
                  <Button.Label>
                    {loading ? <Loader size="small" /> : "Login"}
                  </Button.Label>
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </LoginWrapper>
    </Layout>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 88px);
  background: url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;
