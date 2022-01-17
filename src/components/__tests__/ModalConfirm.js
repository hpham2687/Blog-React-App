import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalConfirm from "components/Modal/ModalConfirm";
import { rest, server } from "mocks/test-server";
import * as React from "react";
import { renderApp } from "utils/test-utils";
const apiURL = process.env.REACT_APP_API_ENDPOINT;

// var localStorageMock = (function () {
//   var store = {
//     user: {
//       error: null,
//       loading: false,
//       isLoggedIn: true,
//       user: {
//         username: "krisspham",
//         token: "abcxyztoken",
//         id: "334422323",
//       },
//     },
//   };
//   return {
//     getItem: function (key) {
//       console.log("vao day");
//       return store[key] || null;
//     },
//     setItem: function (key, value) {
//       store[key] = value.toString();
//     },
//     clear: function () {
//       store = {};
//     },
//   };
// })();
// beforeAll(() => {
//   Object.defineProperty(window, "localStorage", {
//     value: localStorageMock,
//   });
// });
var store = {
  user: {
    error: null,
    loading: false,
    isLoggedIn: true,
    user: {
      username: "krisspham",
      token: "abcxyztoken",
      id: "334422323",
    },
  },
};
// beforeAll(() => {
//   global.Storage.prototype.setItem = jest.fn((key, value) => {
//     store[key] = value;
//   });
//   global.Storage.prototype.getItem = jest.fn((key) => {
//     console.log("vao mock getItem");
//     return store[key];
//   });
// });
// const localStorageMock = {
//   getItem: jest.fn().mockImplementation((key) => {
//     console.log("vaoday");
//     return localStorage[key];
//   }),
// };

// window.localStorage = localStorageMock;

beforeEach(() => {
  const div = document.createElement("div");
  div.setAttribute("id", "portal");
  document.body.appendChild(div);
});

afterEach(() => {
  document.body.innerHTML = "";
});
beforeAll(() => {
  localStorage.setItem("user", JSON.stringify(store.user));
});
test("onConfirm get call when click confirm button", async () => {
  // mock auths
  const endpoint = "posts";
  const mockResult = {
    posts: [],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 10,
  };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );
  renderApp();
  const spyLoStoRemove = jest.spyOn(localStorage, "getItem");
  expect(spyLoStoRemove).toHaveBeenCalled();

  expect(screen.getByText(/manage posts/i)).toBeInTheDocument();
  screen.debug(undefined, 3000000);
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
