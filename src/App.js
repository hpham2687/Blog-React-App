import { ToastContainer } from "@ahaui/react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import ErrorFallback from "./components/common/ErrorFallback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import * as theme from "./config/theme";
import { useTheme } from "./context/ThemeContext";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import ManagePage from "./components/Manage";
import RegisterPage from "./components/Register";
import AddPostPage from "./components/AddPost";
import EditPostPage from "./components/EditPost";
import PostDetail from "./components/PostDetail";
import { history } from "./utils/history";

import { useEffect } from "react";
import axios from "axios";
import { axiosClient } from "./api/axiosClient";
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
  //get post test settings
  // useEffect(() => {
  //   try {
  //     axiosClient.get("/posts", {
  //       params: {
  //         page: 4,
  //         limit: 3,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  // add post test
  // useEffect(() => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer MTYzNDM5MzQ5Mw==",
  //   };
  //   try {
  //     axiosClient.post(
  //       "/posts",
  //       {
  //         title: "this is title 14 by user 4 real",
  //         content: "lorem lorem ipsum...",
  //         picture: "https://picsum.photos/seed/picsum/300/250",
  //       },
  //       {
  //         headers: headers,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  //  get specific user post test
  // useEffect(() => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer MzIyNzU3NTA1",
  //   };
  //   try {
  //     axiosClient.get("user/posts", {
  //       params: {
  //         page: 1,
  //         items_per_page: 3,
  //       },
  //       headers: headers,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);
  return (
    <>
      <GlobalStyle theme={isDarkMode ? theme.darkTheme : theme.lightTheme} />
      <div className="App">
        <ToastContainer />

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router navigator={history}>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
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
              <Route element={<>Not found</>}></Route>
            </Routes>
          </Router>
        </ErrorBoundary>

        {/* routing */}
      </div>
    </>
  );
}

export default App;
