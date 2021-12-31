import { ToastContainer } from "@ahaui/react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import ErrorFallback from "./components/common/ErrorFallback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import * as theme from "./config/theme";
import { useTheme } from "./context/ThemeContext";
import Home from "./screens/Home";
import LoginPage from "./screens/Login";
import Manage from "./screens/Manage";
import Register from "./screens/Register";

const GlobalStyle = createGlobalStyle`
body {
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.background};
  
}
a {
  text-decoration: none;
}
`;

function App() {
  const [isDarkMode] = useTheme();

  return (
    <>
      <GlobalStyle theme={isDarkMode ? theme.darkTheme : theme.lightTheme} />
      <div className="App">
        <ToastContainer />

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/manage"
                element={
                  <ProtectedRoute>
                    <Manage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </Router>
        </ErrorBoundary>

        {/* routing */}
      </div>
    </>
  );
}

export default App;
