import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { renderWithWrapper } from "../../utils/test-utils";
import Register from "../Register";

test("show error message when omit required fields register form", async () => {
  const email = "";
  const username = "";
  const password = "";

  renderWithWrapper(<Register />);

  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );

  userEvent.type(
    screen.getByRole("textbox", {
      name: /email/i,
    }),
    email
  );

  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );

  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("register-btn"));

  expect(
    (await screen.findByTestId("error-email-msg")).textContent
  ).toMatchInlineSnapshot(`"Email is required"`);

  expect(
    (await screen.findByTestId("error-username-msg")).textContent
  ).toMatchInlineSnapshot(`"Username is required"`);

  expect(
    (await screen.findByTestId("error-password-msg")).textContent
  ).toMatchInlineSnapshot(`"Password is required"`);
});

test("show error message when email is in wrong format", async () => {
  const email = "wrong@email";

  renderWithWrapper(<Register />);

  userEvent.type(
    screen.getByRole("textbox", {
      name: /email/i,
    }),
    email
  );

  userEvent.click(screen.getByTestId("register-btn"));

  expect(
    (await screen.findByTestId("error-email-msg")).textContent
  ).toMatchInlineSnapshot(`"Email is invalid"`);
});

test("show error message when username and password is less than 6 character", async () => {
  const username = "lt6";
  const password = "lt6";

  renderWithWrapper(<Register />);

  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("register-btn"));

  expect(
    (await screen.findByTestId("error-password-msg")).textContent
  ).toMatchInlineSnapshot(`"Password must be at least 6 characters"`);
  expect(
    (await screen.findByTestId("error-username-msg")).textContent
  ).toMatchInlineSnapshot(`"Username must be at least 6 characters"`);
});
