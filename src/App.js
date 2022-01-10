import { ToastContainer } from "@ahaui/react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import AddPostPage from "./components/AddPost";
import ErrorFallback from "./components/common/ErrorFallback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import EditPostPage from "./components/EditPost";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import ManagePage from "./components/Manage";
import PostDetail from "./components/PostDetail";
import RegisterPage from "./components/Register";
import * as theme from "./config/theme";
import { useTheme } from "./context/ThemeContext";
import { history } from "./utils/history";

// TODO: Add not found page
const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
   

    @media (min-width: 768px) {
    }

    @media (min-width: 1024px) {
    }
  }
  body, #page-container-body, .Card, .Header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
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
          <Router navigator={history}>
            <Routes>
              <Route path="*" element={<>Not found page</>}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route
                path="/manage"
                exact
                element={
                  <ProtectedRoute>
                    <ManagePage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/add-post"
                element={
                  <ProtectedRoute>
                    <AddPostPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/edit-post/:postId"
                exact
                element={
                  <ProtectedRoute>
                    <EditPostPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/posts/:postId"
                exact
                element={<PostDetail />}
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
