import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import { renderApp, store } from "utils/test-utils";
import { resetState as resetPostsState } from "store/postsSlice";
import { resetState as resetUserPostsState } from "store/userPostsSlice";

const apiURL = process.env.REACT_APP_API_ENDPOINT;
jest.setTimeout(30000);

const buildLoginForm = () => {
  return { username: "chucknorris", password: "i need no password" };
};

beforeEach(() => {
  const div = document.createElement("div");
  div.setAttribute("id", "portal");
  document.body.appendChild(div);
});

afterEach(() => {
  document.body.innerHTML = "";
  store.dispatch(resetPostsState());
  store.dispatch(resetUserPostsState());
});

const { username, password } = buildLoginForm();

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
  // mock login

  const loginEndpoint = "login";
  const mockLoginResult = { id: "323993", token: "fake_token", username };

  server.use(
    rest.post(`${apiURL}/${loginEndpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockLoginResult));
    })
  );

  // mock user posts
  const mockResult = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ7K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham123",
        title: "post title user posts",
        content:
          "post content demo post content demo post content demo post content demo ",
        picture: "https://picsum.photos/seed/picsum/300/250",
        createdAt: "1/10/2022",
      },
    ],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 10,
  };

  server.use(
    rest.get(`${apiURL}/user/posts`, (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );
  // mock delete posts
  server.use(
    rest.delete(
      `${apiURL}/posts/2GwKhwp68KgFnJ7K322Zjg`,
      async (req, res, ctx) => {
        return res(ctx.json({ status: "ok" }));
      }
    )
  );
};
test("Success message notification when  click confirm remove post button", async () => {
  mockApi();

  const { container } = renderApp();
  userEvent.click(screen.getByText(/login/i));
  userEvent.type(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
    username
  );
  userEvent.type(screen.getByLabelText(/password/i), password);

  act(() => userEvent.click(screen.getByTestId("login-btn")));

  // expect loading to be show
  expect(
    await screen.findByRole("button", {
      name: /loading/i,
    })
  ).toBeInTheDocument();
  // expect alert success message to be show
  expect(
    (await screen.findByTestId("toast-alert")).textContent
  ).toMatchInlineSnapshot(`"Login Successfully"`);
  // expect page to be redirected to /
  // expect alert manage button to be show
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  userEvent.click(await screen.findByText(/manage posts/i));
  expect(global.window.location.pathname).toEqual("/manage");
  expect(await screen.findByText("post title user posts")).toBeInTheDocument();
  const removeIcon = container.querySelector(
    "#page-container-body .remove-icon"
  );
  userEvent.click(removeIcon);
  expect(await screen.findByTestId("modal-confirm")).toBeInTheDocument();

  const yesButton = screen.getByRole("button", {
    name: /yes/i,
  });
  userEvent.click(yesButton);

  expect(await screen.findByText(/delete post/i)).toBeInTheDocument();
});
