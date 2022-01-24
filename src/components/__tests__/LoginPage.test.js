import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import { logout } from "store/authSlice";
import { renderApp, store } from "../../utils/test-utils";
const apiURL = process.env.REACT_APP_API_ENDPOINT;

afterEach(() => {
  store.dispatch(logout());
});

const buildLoginForm = () => {
  return { username: "chucknorris", password: "i need no password" };
};

test(`logging in displays the manage option, success login message`, async () => {
  // mock home page posts
  const postsEndpoint = "posts";
  const mockPostsResult = {
    posts: [],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 10,
  };
  server.use(
    rest.get(`${apiURL}/${postsEndpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockPostsResult));
    })
  );
  // mock login
  const { username, password } = buildLoginForm();

  const loginEndpoint = "login";
  const mockLoginResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${loginEndpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockLoginResult));
    })
  );

  renderApp();
  userEvent.click(
    screen.getByRole("button", {
      name: /login/i,
    })
  );
  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);

  act(() => userEvent.click(screen.getByTestId("login-btn")));

  // expect loading to be show

  await screen.findByRole("button", {
    name: /loading/i,
  });

  // expect alert success message to be show
  expect((await screen.findByTestId("toast-alert")).textContent).toBe(
    "Login Successfully"
  );
  // expect page to be redirected to /
  expect(global.window.location.pathname).toEqual("/");
  // expect alert manage button to be show
  await screen.findByText(/manage posts/i);
});

test(`dispay error login message when server is down`, async () => {
  // mock home page posts
  const postsEndpoint = "posts";
  const mockPostsResult = {
    posts: [],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 10,
  };
  server.use(
    rest.get(`${apiURL}/${postsEndpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockPostsResult));
    })
  );
  // mock login
  const { username, password } = buildLoginForm();

  const loginEndpoint = "login";
  const mockLoginResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${loginEndpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(mockLoginResult));
    })
  );

  renderApp();
  userEvent.click(
    screen.getByRole("button", {
      name: /login/i,
    })
  );
  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);

  act(() => userEvent.click(screen.getByTestId("login-btn")));

  // expect loading to be show
  await screen.findByRole("button", {
    name: /loading/i,
  });
  // expect alert success message to be show
  expect(
    (await screen.findByTestId("toast-alert")).textContent
  ).toMatchInlineSnapshot(`"UNKNOWN ERROR"`);
  // expect page to be redirected to /
  expect(global.window.location.pathname).toEqual("/login");
});
