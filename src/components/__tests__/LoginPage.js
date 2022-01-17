import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import * as React from "react";
import { renderWithWrapper } from "../../utils/test-utils";
import Login from "../Login";
const apiURL = process.env.REACT_APP_API_ENDPOINT;

const buildLoginForm = () => {
  return { username: "chucknorris", password: "i need no password" };
};

test(`logging in displays the manage option`, async () => {
  const { username, password } = buildLoginForm();

  const endpoint = "login";
  const mockResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      console.log(req.body);
      console.log("vao post controller");
      console.log(ctx.json(mockResult));
      return res(ctx.json(mockResult));
    })
  );

  renderWithWrapper(<Login />);
  await act(() =>
    userEvent.type(
      screen.getByRole("textbox", {
        name: /username/i,
      }),
      username
    )
  );

  await act(() => userEvent.type(screen.getByLabelText(/password/i), password));
  await act(async () => await userEvent.click(screen.getByTestId("login-btn")));

  // expect loading to be shown
  expect(
    screen.getByRole("button", {
      name: /loading\.\.\./i,
    })
  ).toBeInTheDocument();
  screen.debug();
});
