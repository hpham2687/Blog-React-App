import * as authData from "../mockData/authData";

export const loginCtrl = async (req, res, ctx) => {
  const { username, password } = req.body;
  const user = await authData.authenticate({ username, password });
  return res(ctx.json(user));
};

export const registerCtrl = async (req, res, ctx) => {
  const { email, username, password } = req.body;
  const userFields = { email, username, password };
  await authData.create(userFields);
  let user;
  try {
    user = await authData.authenticate(userFields);
  } catch (error) {
    return res(
      ctx.status(400),
      ctx.json({ status: 400, message: error.message })
    );
  }
  return res(ctx.json(user));
};
