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
  const SwitchButton = screen.getByTestId("theme-toggle-btn");

  userEvent.click(SwitchButton);
  const header = screen.getByTestId("header");
  expect(header).toHaveStyle("background: rgba(10, 25, 41, 0.72);");
});
