import * as postsData from "./../mockData/postData";
import * as authData from "../mockData/authData";

export const getAllPostsCtrl = async (req, res, ctx) => {
  try {
    // Persist user's authentication in the session
    let page = req.url.searchParams.get("page");
    let items_per_page = req.url.searchParams.get("items_per_page");
    let search = req.url.searchParams.get("search") || null;

    console.log({ search });
    const posts = await postsData.getPost(page, items_per_page, search);
    return res(ctx.json(posts));
    // return res(ctx.json(user));
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

    console.log({ user, title, content, picture });
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
