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

export const getPostDetailCtrl = async (req, res, ctx) => {
  try {
    let { postId } = req.params;

    const post = await postsData.read(postId);
    return res(ctx.json(post));
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
      picture: picture ? picture : "/assets/images/default_thumbnail.png",
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
};

export const editUserPostCtrl = async (req, res, ctx) => {
  try {
    // Validate user
    await authData.getUser(req);

    let { postId } = req.params;
    const { title, content, picture } = req.body;

    const editedPost = await postsData.edit({
      id: postId,
      title,
      content,
      picture,
    });

    return res(
      ctx.status(200),
      ctx.json({
        status: "ok",
        post: editedPost,
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
};

export const removeUserPostCtrl = async (req, res, ctx) => {
  try {
    // Validate user
    await authData.getUser(req);

    let { postId } = req.params;
    const status = await postsData.remove(postId);

    return res(
      ctx.status(200),
      ctx.json({
        status,
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
};
