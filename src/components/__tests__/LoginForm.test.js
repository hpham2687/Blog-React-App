import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { renderWithWrapper } from "../../utils/test-utils";
import Login from "../Login";

test("show error message when omit required fields login form", async () => {
  const username = "";
  const password = "";

  renderWithWrapper(<Login />);

  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );

  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("login-btn"));

  expect(
    (await screen.findByTestId("error-username-msg")).textContent
  ).toMatchInlineSnapshot(`"Username is required"`);

  expect(
    (await screen.findByTestId("error-password-msg")).textContent
  ).toMatchInlineSnapshot(`"Password is required"`);
});

test("show error message when username and password is less than 6 character", async () => {
  const username = "lt6";
  const password = "lt6";

  renderWithWrapper(<Login />);

  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("login-btn"));

  const passwordErrorMessage = await screen.findByTestId("error-password-msg");
  const usernameErrorMessage = await screen.findByTestId("error-username-msg");

  expect(passwordErrorMessage.textContent).toMatchInlineSnapshot(
    `"Password must be at least 6 characters"`
  );
  expect(usernameErrorMessage.textContent).toMatchInlineSnapshot(
    `"Username must be at least 6 characters"`
  );
});
