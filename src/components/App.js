import { ToastContainer } from "@ahaui/react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as theme from "../config/theme";
import { useTheme } from "../context/ThemeContext";
import AddPostPage from "./AddPost";
import ErrorFallback from "./common/ErrorFallback";
import { GlobalStyle } from "./common/GlobalStyle";
import ProtectedRoute from "./common/ProtectedRoute";
import EditPostPage from "./EditPost";
import Home from "./Home";
import LoginPage from "./Login";
import ManagePage from "./Manage";
import PostDetail from "./PostDetail";
import RegisterPage from "./Register";

function App() {
  const [isDarkMode] = useTheme();
  return (
    <>
      <GlobalStyle theme={isDarkMode ? theme.darkTheme : theme.lightTheme} />
      <div className="App">
        <ToastContainer />

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
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
