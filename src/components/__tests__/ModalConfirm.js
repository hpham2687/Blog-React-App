import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalConfirm from "components/Modal/ModalConfirm";
import * as React from "react";

beforeEach(() => {
  const div = document.createElement("div");
  div.setAttribute("id", "portal");
  document.body.appendChild(div);
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("onConfirm get call when click confirm button", async () => {
  let show = true;
  const handleClose = jest.fn();
  const onSubmitRemove = jest.fn();

  render(
    <ModalConfirm
      show={show}
      handleClose={handleClose}
      onConfirm={onSubmitRemove}
      setShow={() => {}}
    />
  );
  userEvent.click(screen.getByRole("button", { name: "Yes" }));
  expect(onSubmitRemove).toHaveBeenCalledTimes(1);
});

test("hide the modal when show props equal false", async () => {
  let show = false;
  const handleClose = jest.fn();
  const onSubmitRemove = jest.fn();

  render(
    <ModalConfirm
      show={show}
      handleClose={handleClose}
      onConfirm={onSubmitRemove}
      setShow={() => {}}
    />
  );
  expect(screen.queryByTestId("modal-confirm")).not.toBeInTheDocument();
  // screen.debug();
});
