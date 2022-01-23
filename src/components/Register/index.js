import { Button, Card, Form, Loader } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import {
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from "constants/Auth/Message";
import { useAuth } from "hooks/useAuth";
import { registerAction, resetErrorAction } from "store/authSlice";
import Layout from "components/common/Layout";
import { notifyNegative, notifyPositive } from "utils/toast";
import { AuthFormTitle } from "components/common/AuthFormTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Register() {
  const { isLoggedIn, loading, error: errorApi } = useAuth();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(AUTH_ERROR_MESSAGES.USERNAME_REQUIRED)
      .min(6, AUTH_ERROR_MESSAGES.USERNAME_INVALID_SHORT_LENGTH)
      .max(20, AUTH_ERROR_MESSAGES.USERNAME_INVALID_LONG_LENGTH),
    email: Yup.string()
      .required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED)
      .email(AUTH_ERROR_MESSAGES.EMAIL_INVALID),
    password: Yup.string()
      .required(AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED)
      .min(6, AUTH_ERROR_MESSAGES.PASSWORD_INVALID_SHORT_LENGTH)
      .max(40, AUTH_ERROR_MESSAGES.PASSWORD_INVALID_LONG_LENGTH),
    confirmPassword: Yup.string()
      .required(AUTH_ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
      .oneOf(
        [Yup.ref("password"), null],
        AUTH_ERROR_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ email, username, password }) => {
    dispatch(
      registerAction({
        email,
        username,
        password,
      })
    )
      .unwrap()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        notifyPositive({ message: AUTH_SUCCESS_MESSAGES.REGISTER_SUCCESS });
      })
      .catch((error) => {
        return notifyNegative({ message: error.message });
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const isHasEmailError = errorApi?.email || errors?.email;
  const isHasUsernameError = errorApi?.username || errors?.username;
  const isHasPasswordError = errorApi?.password || errors?.password;
  const isHasConfirmPasswordError =
    errorApi?.confirmPassword || errors?.confirmPassword;

  return (
    <Layout>
      <RegisterWrapper>
        <Card style={{ height: "fit-content" }} size={"medium"}>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroupWrapper>
                <Form.Group>
                  <AuthFormTitle>Register</AuthFormTitle>
                </Form.Group>
                <Form.Group controlId="registerForm.email">
                  <Form.Label>Email</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Enter email"
                    isInvalid={isHasEmailError}
                    {...register("email", {
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasEmailError && (
                    <Form.Feedback data-testid="error-email-msg" type="invalid">
                      {errorApi?.email || errors?.email.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="registerForm.username">
                  <Form.Label>Username</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Enter username"
                    isInvalid={isHasUsernameError}
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
                <Form.Group controlId="registerForm.password">
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    type="password"
                    placeholder="Enter password"
                    isInvalid={isHasPasswordError}
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
                <Form.Group controlId="registerForm.confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Input
                    type="password"
                    placeholder="Enter password"
                    isInvalid={isHasConfirmPasswordError}
                    {...register("confirmPassword", {
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                  {isHasConfirmPasswordError && (
                    <Form.Feedback
                      data-testid="error-confirm-password-msg"
                      type="invalid"
                    >
                      {errorApi?.confirmPassword ||
                        errors?.confirmPassword.message}
                    </Form.Feedback>
                  )}
                </Form.Group>
                <StyledSubmitBtn
                  size={"small"}
                  variant="primary"
                  className="u-marginRightSmall"
                  data-testid="register-btn"
                  style={{ width: "100%" }}
                >
                  <Button.Label style={{ fontWeight: "500" }}>
                    {loading ? (
                      <Loader aria-label="Loading" size="small" />
                    ) : (
                      "Register"
                    )}
                  </Button.Label>
                </StyledSubmitBtn>
              </FormGroupWrapper>
            </form>
          </Card.Body>
        </Card>
      </RegisterWrapper>
    </Layout>
  );
}

const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubmitBtn = styled(Button)`
  margin-left: auto;
  margin-right: 0;
`;

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
  height: calc(100vh - 112px);
  background: url(/assets/images/background.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
`;
