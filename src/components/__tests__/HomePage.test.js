import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "mocks/test-server";
import * as React from "react";
import { resetState as resetPostsState } from "store/reducers/postsReducer";
import { resetState as resetUserPostsState } from "store/reducers/userPostsReducer";
import { renderWithWrapper, store } from "utils/test-utils";
import Home from "../Home";
const apiURL = process.env.REACT_APP_API_ENDPOINT;
const endpoint = "posts";

afterEach(() => {
  store.dispatch(resetPostsState());
  store.dispatch(resetUserPostsState());
});

afterEach(() => {
  jest.useRealTimers();
});

test("show message no post to show when posts are empty", async () => {
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

  renderWithWrapper(<Home />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText("No posts to show.")).toBeInTheDocument();
});

test("show posts list to view", async () => {
  const mockResult = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ7K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham123",
        title: "post title demo",
        content:
          "post content demo post content demo post content demo post content demo ",
        picture: "https://picsum.photos/seed/picsum/300/250",
        createdAt: "1/10/2022",
      },
    ],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 6,
  };

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  renderWithWrapper(<Home />);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText("post title demo")).toBeInTheDocument();
});

test("show load more button when page less than maximum number of pages", async () => {
  const mockResult = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ5K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham123",
        title: "post title demo show load more btn",
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

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  renderWithWrapper(<Home />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(
    screen.getByRole("button", {
      name: /load more/i,
    })
  ).toBeInTheDocument();
});

test("load more posts when click load more button", async () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  const mockPostsInitial = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ5K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham133",
        title: "post title demo ",
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
        id: "2GwKhw368KgFnJ5K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham133",
        title: "post title demo load more",
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
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      let page = req.url.searchParams.get("page");
      if (page == 1) {
        return res(ctx.json(mockPostsInitial));
      }
      return res(ctx.json(mockPostsLoadMore));
    })
  );

  renderWithWrapper(<Home />);
  // assert loading to be removed
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // assert load more button to be existed
  expect(
    screen.getByRole("button", {
      name: /load more/i,
    })
  ).toBeInTheDocument();

  userEvent.click(
    screen.getByRole("button", {
      name: /load more/i,
    })
  );

  // assert loading icon in load more button to be removed
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // assert new post to be added
  expect(
    await screen.findByText(mockPostsLoadMore.posts[0].title)
  ).toBeInTheDocument();

  expect(window.HTMLElement.prototype.scrollIntoView).toBeCalled();
});

test("execute search when type in search box", async () => {
  const mockPostsInitial = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ5K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham133",
        title: "post title demo ",
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
  const mockPostsSearch = {
    posts: [
      {
        id: "2GwKhw368KgFnJ5K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham133",
        title: "post title demo mockPostsSearch",
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
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      let search = req.url.searchParams.get("search");
      console.log({ search });
      if (!search) {
        return res(ctx.json(mockPostsInitial));
      }
      return res(ctx.json(mockPostsSearch));
    })
  );

  renderWithWrapper(<Home />);
  const searchBox = screen.getByRole("searchbox");
  // assert loading to be removed
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  userEvent.type(searchBox, "title 1");
  console.log(searchBox.value);
  // assert new post to be added
  expect(
    await screen.findByText(mockPostsSearch.posts[0].title)
  ).toBeInTheDocument();
});

test("click add post icon and redirect to add post page", async () => {
  const mockResult = {
    posts: [
      {
        id: "2GwKhwp68KgFnJ7K322Zjg",
        authorId: "4113925073",
        authorName: "krisspham123",
        title: "post title demo",
        content:
          "post content demo post content demo post content demo post content demo ",
        picture: "https://picsum.photos/seed/picsum/300/250",
        createdAt: "1/10/2022",
      },
    ],
    page: 1,
    maximumNumOfPages: 1,
    items_per_page: 6,
  };

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );
  renderWithWrapper(<Home />);
  // assert loading to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByLabelText(/add-icon-btn/i)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText(/add-icon-btn/i));
  expect(global.window.location.pathname).toEqual("/add-post");
});
