import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "store";
import { ThemeProvider } from "../../context/ThemeContext";
import Home from "../Home";

test("switch to the dark styles when toggle button", async () => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>
        <ThemeProvider>{children}</ThemeProvider>
      </Router>
    </Provider>
  );
  render(<Home />, { wrapper: Wrapper });
  const SwitchBtnWrapper = screen.getByTestId("theme-toggle-btn");
  const SwitchButton = within(SwitchBtnWrapper).getByRole("button");

  await act(async () => await userEvent.click(SwitchButton));
  const header = screen.getByTestId("header");
  expect(header).toHaveClass("u-backgroundDark");
});
