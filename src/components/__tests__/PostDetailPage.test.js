import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { rest, server } from "mocks/test-server";
import * as React from "react";
import { renderWithWrapper } from "utils/test-utils";
import PostDetail from "../PostDetail";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    postId: "11029933",
  }),
}));

test("load post detail content at initial", async () => {
  const postData = {
    id: "2GwKhwp68KgFnJ7K322Zjg",
    authorId: "4113925073",
    authorName: "krisspham123",
    title: "post title demo",
    content:
      "post content demo post content demo post content demo post content demo",
    picture: "https://picsum.photos/seed/picsum/300/250",
    createdAt: "1/10/2022",
  };
  server.use(
    rest.get(`*/posts/:postId`, async (req, res, ctx) => {
      return res(ctx.json(postData));
    })
  );

  renderWithWrapper(<PostDetail />);
  await waitForElementToBeRemoved(() => screen.getByTestId("Loading"));
  screen.getByText(/post title demo/i);

  screen.getByText(
    /post content demo post content demo post content demo post content demo/i
  );
});
