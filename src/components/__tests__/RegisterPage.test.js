import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import { logout } from "store/reducers/authReducer";
import { renderApp, store } from "../../utils/test-utils";
const apiURL = process.env.REACT_APP_API_ENDPOINT;

afterEach(() => {
  store.dispatch(logout());
});

jest.setTimeout(30000);
const buildLoginForm = () => {
  return {
    email: "kriss@abc.com",
    username: "chucknorris",
    password: "i need no password",
  };
};

const { username, password, email } = buildLoginForm();

const mockApi = () => {
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
  // mock register

  const registerEndpoint = "register";
  const mockLoginResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${registerEndpoint}`, async (req, res, ctx) => {
      console.log(req.body);
      return res(ctx.json(mockLoginResult));
    })
  );
};
test(`register in displays the manage option, success register message`, async () => {
  mockApi();

  renderApp();
  userEvent.click(screen.getByText(/register/i));

  userEvent.type(
    screen.getByRole("textbox", {
      name: /email/i,
    }),
    email
  );
  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("register-btn"));

  // expect loading to be show
  expect(
    await screen.findByRole("button", {
      name: /loading/i,
    })
  ).toBeInTheDocument();
  // expect alert success message to be show
  expect(
    (await screen.findByTestId("toast-alert")).textContent
  ).toMatchInlineSnapshot(`"Register Successfully"`);
  // expect page to be redirected to /
  expect(global.window.location.pathname).toEqual("/");
  // expect alert manage button to be show
  await screen.findByText(/manage posts/i);
});

test(`display error register message when server is down`, async () => {
  // mock register

  const registerEndpoint = "register";
  const mockLoginResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${registerEndpoint}`, async (req, res, ctx) => {
      console.log(req.body);
      return res(ctx.status(400), ctx.json(mockLoginResult));
    })
  );

  renderApp();
  userEvent.click(screen.getByText(/register/i));

  userEvent.type(
    screen.getByRole("textbox", {
      name: /email/i,
    }),
    email
  );
  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByTestId("register-btn"));

  // expect loading to be show
  expect(
    await screen.findByRole("button", {
      name: /loading/i,
    })
  ).toBeInTheDocument();
  // expect alert success message to be show
  expect(
    (await screen.findByTestId("toast-alert")).textContent
  ).toMatchInlineSnapshot(`"UNKNOWN ERROR"`);
  // expect page to be redirected to /
  expect(global.window.location.pathname).toEqual("/register");
});
