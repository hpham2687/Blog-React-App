import * as postsData from "./../mockData/postData";

export const getAllPostsCtrl = async (req, res, ctx) => {
  // Persist user's authentication in the session
  const posts = await postsData.getAll();
  return res(ctx.json(posts));
  // return res(ctx.json(user));
};
