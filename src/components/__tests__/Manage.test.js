import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import { logout } from "store/authSlice";
import { resetState as resetPostsState } from "store/postsSlice";
import { resetState as resetUserPostsState } from "store/userPostsSlice";
import { renderApp, store } from "utils/test-utils";
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
  store.dispatch(logout());
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
  const mockPostsInitial = {
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
    maximumNumOfPages: 2,
    items_per_page: 1,
  };
  const mockPostsLoadMore = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ7K322Zjg2",
        authorId: "4113925073",
        authorName: "krisspham123",
        title: "post title user posts load more 2",
        content:
          "post content demo post content demo post content demo post content demo ",
        picture: "https://picsum.photos/seed/picsum/300/250",
        createdAt: "1/10/2022",
      },
    ],
    page: 2,
    maximumNumOfPages: 2,
    items_per_page: 1,
  };

  server.use(
    rest.get(`${apiURL}/user/posts`, async (req, res, ctx) => {
      let page = req.url.searchParams.get("page");
      if (page == 1) {
        return res(ctx.json(mockPostsInitial));
      }
      return res(ctx.json(mockPostsLoadMore));
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

test("show list post of user", async () => {
  mockApi();
  renderApp();
  userEvent.click(
    screen.getAllByRole("link", {
      name: /login/i,
    })[0]
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
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  // expect manage button to be show
  userEvent.click(await screen.findByText(/manage posts/i));
  expect(global.window.location.pathname).toEqual("/manage");
  await screen.findByText("post title user posts");

  userEvent.click(
    screen.getByRole("button", {
      name: /load more/i,
    })
  );

  // assert loading icon in load more button to be removed
  screen.getByLabelText(/loading/i);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  // assert new post to be added

  await screen.findByText("post title user posts load more 2");
});

test("create new post", async () => {
  mockApi();

  // mock create post

  const mockCreatePostResult = {
    status: "ok",
    post: {
      id: "2GwKhwp68KgFnJ7K322Zjg",
      authorId: "4113925073",
      authorName: "krisspham 123",
      title: "created post title user posts, posts posts posts123",
      content:
        "post content demo post content demo post content demo post content demo ,post content demo post content demo post content demo post content demo ,post content demo post content demo post content demo post content demo ",
      picture: "https://picsum.photos/seed/picsum/300/250",
      createdAt: "1/10/2022",
    },
  };

  server.use(
    rest.post(`${apiURL}/posts`, async (req, res, ctx) => {
      return res(ctx.json(mockCreatePostResult));
    })
  );

  renderApp();
  userEvent.click(
    screen.getAllByRole("link", {
      name: /login/i,
    })[0]
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
  // expect loading to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  userEvent.click(await screen.findByText(/manage posts/i));
  // expect page to be redirected to /
  expect(global.window.location.pathname).toEqual("/manage");
  await screen.findByText("post title user posts");

  userEvent.click(
    screen.getByRole("button", {
      name: /load more/i,
    })
  );

  // assert loading icon in load more button to be removed
  screen.getByLabelText(/loading/i);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  userEvent.click(screen.getByTestId("add-icon-btn"));

  await screen.findByTestId("post-form-submit-btn");

  const titleTextBox = await screen.findByRole("textbox", { name: /title/i });
  const contentTextBox = await screen.findByRole("textbox", {
    name: /content/i,
  });

  userEvent.type(titleTextBox, mockCreatePostResult.post.title);
  userEvent.type(contentTextBox, mockCreatePostResult.post.content);
  userEvent.click(screen.getByTestId("post-form-submit-btn"));

  await screen.findByText(/add post successfully/i);
});

test("show success message when edit post of user", async () => {
  mockApi();
  // mock detail post
  const postData = {
    id: "2GwKhwp68KgFnJ7K322Zjg",
    authorId: "4113925073",
    authorName: "krisspham123",
    title: "initial to edit",
    content:
      " post content demo post content demo post content demo post content demo,post content dem post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demopost content demo post",
    picture:
      "https://cdn.dribbble.com/users/113499/screenshots/14451338/media/281c3ac5c2f9a4e16854b10710a02a7c.png?compress=1&resize=1600x1200&vertical=top",
    createdAt: "1/10/2022",
  };

  const editedPostData = {
    id: "2GwKhwp68KgFnJ7K322Zjg",
    authorId: "4113925073",
    authorName: "krisspham123",
    title: "post title demo to edited post content demo post content demo",
    content:
      "post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo",
    picture: "https://picsum.photos/seed/picsum/300/250",
    createdAt: "1/10/2022",
  };
  server.use(
    rest.put(`${apiURL}/posts/:postId`, async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "ok",
          post: editedPostData,
        })
      );
    })
  );

  // mock edit data
  server.use(
    rest.get(`${apiURL}/user-posts/:postId`, async (req, res, ctx) => {
      return res(ctx.json(postData));
    })
  );

  renderApp();
  userEvent.click(
    screen.getAllByRole("link", {
      name: /login/i,
    })[0]
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
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  // expect manage button to be show
  userEvent.click(await screen.findByText(/manage posts/i));
  expect(global.window.location.pathname).toEqual("/manage");
  await screen.findByText("post title user posts");

  userEvent.click(
    screen.getByRole("button", {
      name: /load more/i,
    })
  );

  // assert loading icon in load more button to be removed
  screen.getByLabelText(/loading/i);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  // assert new post to be added

  await screen.findByText("post title user posts load more 2");

  const editBtn = screen.getAllByRole("button", { name: /edit/i })[0];
  userEvent.click(editBtn);
  await screen.findByLabelText(/loading/i);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  // expect initial post data is loaded

  expect(screen.getByLabelText(/content/i).textContent).toBe(
    " post content demo post content demo post content demo post content demo,post content dem post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demo,post content demo post content demo post content demo post content demopost content demo post"
  );

  // change the title
  const newTitle = "post title demo to edited";
  userEvent.type(screen.getByRole("textbox", { name: /title/i }), newTitle);
  userEvent.click(
    screen.getByRole("button", {
      name: /save/i,
    })
  );

  expect((await screen.findByText(/edit post successfully/i)).textContent).toBe(
    "Edit post successfully"
  );
});
