import * as postsData from "./../mockData/postData";
import * as authData from "../mockData/authData";
import { getFilterParams } from "../utils/post";

export const getPostsCtrl = async (req, res, ctx) => {
  try {
    let { page, items_per_page, search } = getFilterParams(req);

    const posts = await postsData.getPosts(page, items_per_page, search);
    return res(ctx.json(posts));
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        status: "fail",
        message: error.message,
      })
    );
  }
};

export const getUserPosts = async (req, res, ctx) => {
  try {
    // Validate user
    const user = await authData.getUser(req);
    let { page, items_per_page, search } = getFilterParams(req);

    const posts = await postsData.getUserPosts(
      page,
      items_per_page,
      search,
      user.id
    );

    return res(ctx.json(posts));
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        status: "fail",
        message: error.message,
      })
    );
  }
};

export const createUserPostCtrl = async (req, res, ctx) => {
  try {
    const { title, content, picture } = req.body;
    const user = await authData.getUser(req);

    const createdPost = await postsData.create({
      user,
      title,
      content,
      picture,
    });
    return res(
      ctx.status(200),
      ctx.json({
        status: "ok",
        post: createdPost,
      })
    );
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        status: "fail",
        message: error.message,
      })
    );
  }
  // Persist user's authentication in the session

  // const posts = await postsData.getAll();
  // return res(ctx.json(posts));
  // return res(ctx.json(user));
};
