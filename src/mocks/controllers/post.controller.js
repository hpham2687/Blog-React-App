import * as postsData from "./../mockData/postData";
import * as authData from "../mockData/authData";

export const getAllPostsCtrl = async (req, res, ctx) => {
  // Persist user's authentication in the session
  const posts = await postsData.getAll();
  return res(ctx.json(posts));
  // return res(ctx.json(user));
};

export const createUserPostCtrl = async (req, res, ctx) => {
  // Persist user's authentication in the session
  const user = await authData.getUser(req);

  console.log(user);
  // const posts = await postsData.getAll();
  // return res(ctx.json(posts));
  // return res(ctx.json(user));
};
