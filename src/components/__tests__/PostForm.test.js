import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import PostForm from "../common/PostForm";

function buildPostForm() {
  return {
    title: "How the project will run executed executed",
    content:
      "The code when executed will use the faker.js library to generate the data needed several times. It will store each value generated in a local database. We’ll then see the results in a web browser as a webpage from the database.We’ll then see the results in a web browser as a webpage from the database",
  };
}

test("should display error message when input is too short", async () => {
  let submitText = "Add";
  const onSubmitAdd = jest.fn();

  render(<PostForm submitText={submitText} onSubmit={onSubmitAdd} />);
  const titleTextBox = screen.getByRole("textbox", { name: /title/i });
  const contentTextBox = screen.getByRole("textbox", { name: /content/i });
  userEvent.type(titleTextBox, "df");
  userEvent.type(contentTextBox, "dsf");
  userEvent.click(screen.getByTestId("post-form-submit-btn"));

  expect((await screen.findByTestId("error-title-msg")).textContent).toBe(
    "Title must be at least 40 characters."
  );

  expect((await screen.findByTestId("error-content-msg")).textContent).toBe(
    "Content must be at least 200 characters."
  );
});

test("should call onSubmit function when click Add button", async () => {
  let submitText = "Add";
  const onSubmitAdd = jest.fn();

  render(<PostForm submitText={submitText} onSubmit={onSubmitAdd} />);
  const titleTextBox = await screen.findByRole("textbox", { name: /title/i });
  const contentTextBox = await screen.findByRole("textbox", {
    name: /content/i,
  });
  const { title, content } = buildPostForm();
  await act(async () => userEvent.type(titleTextBox, title));
  await act(async () => userEvent.type(contentTextBox, content));
  await act(async () =>
    userEvent.click(screen.getByTestId("post-form-submit-btn"))
  );
  expect(onSubmitAdd).toBeCalled();
});

test("should display error message when picture url is in wrong format", async () => {
  let submitText = "Add";
  const pictureUrl = "http://dsf";
  const onSubmitAdd = jest.fn();

  render(<PostForm submitText={submitText} onSubmit={onSubmitAdd} />);
  const pictureTextBox = screen.getByRole("textbox", {
    name: /image/i,
  });
  userEvent.type(pictureTextBox, pictureUrl);
  userEvent.click(screen.getByTestId("post-form-submit-btn"));

  expect((await screen.findByTestId("error-picture-msg")).textContent).toBe(
    "Image url is invalid"
  );
});
