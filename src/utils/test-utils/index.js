import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { store } from "store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";

function renderWithWrapper(ui, { ...options } = {}) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>
        <ThemeProvider>{children}</ThemeProvider>
      </Router>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
// TODO: render App
export * from "@testing-library/react";
// override React Testing Library's render with our own
export { renderWithWrapper, store };
