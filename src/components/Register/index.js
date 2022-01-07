import { Button, Card, Form } from "@ahaui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { AUTH_ERROR_MESSAGES } from "../../constants/Auth/Message";
import { useAuth } from "../../hooks/useAuth";
import {
  registerAction,
  resetErrorAction,
} from "../../store/reducers/authReducer";
import Layout from "../common/Layout";
export default function Register() {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, username, password }) => {
    console.log(`onSubmit`, { email, username, password });
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
                    {...register("email", {
                      required: AUTH_ERROR_MESSAGES.EMAIL_REQUIRED,
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                </Form.Group>
                <Form.Group controlId="registerForm.username">
                  <Form.Label>Username</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Enter text"
                    {...register("username", {
                      required: AUTH_ERROR_MESSAGES.USERNAME_REQUIRED,
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                </Form.Group>
                <Form.Group controlId="registerForm.password">
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    type="password"
                    placeholder="Enter password"
                    {...register("password", {
                      required: AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED,
                      onChange: () => {
                        dispatch(resetErrorAction());
                      },
                    })}
                  />
                </Form.Group>
                <Button
                  size={"small"}
                  variant="primary"
                  className="u-marginRightSmall"
                >
                  <Button.Label>Register</Button.Label>
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
