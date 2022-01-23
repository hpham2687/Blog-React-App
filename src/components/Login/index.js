import { Button, Card, Form, Loader } from "@ahaui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "components/common/Layout";
import { useAuth } from "hooks/useAuth";
import { loginAction, resetErrorAction } from "store/authSlice";
import { useForm } from "react-hook-form";
import {
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from "constants/Auth/Message";
import { notifyNegative, notifyPositive } from "utils/toast";
import { AuthFormTitle } from "components/common/AuthFormTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Login() {
  const { isLoggedIn, loading, error: errorApi } = useAuth();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(AUTH_ERROR_MESSAGES.USERNAME_REQUIRED)
      .min(6, AUTH_ERROR_MESSAGES.USERNAME_INVALID_SHORT_LENGTH)
      .max(20, AUTH_ERROR_MESSAGES.USERNAME_INVALID_LONG_LENGTH),
    password: Yup.string()
      .required(AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED)
      .min(6, AUTH_ERROR_MESSAGES.PASSWORD_INVALID_SHORT_LENGTH)
      .max(40, AUTH_ERROR_MESSAGES.PASSWORD_INVALID_LONG_LENGTH),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ username, password }) => {
    dispatch(
      loginAction({
        username,
        password,
      })
    )
      .unwrap()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        notifyPositive({ message: AUTH_SUCCESS_MESSAGES.LOGIN_SUCCESS });
      })
      .catch((error) => {
        return notifyNegative({ message: error.message });
      });
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
              <FormGroupWrapper>
                <Form.Group>
                  <AuthFormTitle>Login</AuthFormTitle>
                </Form.Group>
                <Form.Group controlId="loginForm.username">
                  <Form.Label>Username</Form.Label>
                  <Form.Input
                    type="text"
                    isInvalid={isHasUsernameError}
                    placeholder="Enter username"
                    {...register("username", {
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasUsernameError && (
                    <Form.Feedback
                      data-testid="error-username-msg"
                      type="invalid"
                    >
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
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasPasswordError && (
                    <Form.Feedback
                      data-testid="error-password-msg"
                      type="invalid"
                    >
                      {errorApi?.password || errors?.password.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <StyledSubmitBtn
                  data-testid="login-btn"
                  size={"small"}
                  type="submit"
                  variant="primary"
                  className="u-marginRightSmall"
                  style={{ width: "100%" }}
                >
                  <Button.Label style={{ fontWeight: "500" }}>
                    {loading ? (
                      <Loader aria-label="Loading" size="small" />
                    ) : (
                      "Login"
                    )}
                  </Button.Label>
                </StyledSubmitBtn>
                <Form.Group>
                  <HasAccountContainer>
                    Don't have an account? <Link to="/register">Register</Link>
                  </HasAccountContainer>
                </Form.Group>
              </FormGroupWrapper>
            </form>
          </Card.Body>
        </Card>
      </LoginWrapper>
    </Layout>
  );
}

const HasAccountContainer = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 0.9rem;
  a {
    color: blue;
  }
`;

const StyledSubmitBtn = styled(Button)`
  margin-left: auto;
  margin-right: 0;
`;

const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 88px);
  background: url(/assets/images/background.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
`;
