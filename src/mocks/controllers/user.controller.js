import * as authData from "../mockData/authData";

export const loginCtrl = async (req, res, ctx) => {
  // Persist user's authentication in the session
  const { username, password } = req.body;
  const user = await authData.authenticate({ username, password });
  return res(ctx.json({ user }));
  // return res(ctx.json(user));
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

//   // Persist user's authentication in the session
//   const {email, username, password } = req.body;
//   let user = authData.find((user) => user.username == username);
//   if (user) {
//     return res(
//       ctx.status(400),
//       ctx.json({
//         error: {
//           username: "Username is existed!",
//         },
//       })
//     );
//   }
//   let isPasswordMatch = password === user.password;
//   if (!isPasswordMatch) {
//     return res(
//       ctx.status(403),
//       ctx.json({
//         error: {
//           password: "Password not match!",
//         },
//       })
//     );
//   }

//   sessionStorage.setItem("user", JSON.stringify(user));
//   return res(ctx.json(user));
// };
