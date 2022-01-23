import * as authUtils from "./../utils/auth";
const usersKey = "__blog_users__";

const { hash, validateUserForm, sanitizeUser } = authUtils;
let users = {};
const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));
const load = () =>
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey)));

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}

async function authenticate({ username, password }) {
  validateUserForm({ username, password });
  const id = hash(username);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), token: btoa(user.id) };
  }
  const error = new Error("Invalid username or password");
  error.status = 400;
  throw error;
}

async function create({ email, username, password }) {
  validateUserForm({ username, password });
  const id = hash(username);
  const passwordHash = hash(password);
  // check if username existed
  if (users[id]) {
    const error = new Error(`User with the username "${username}" is existed`);
    error.status = 400;
    throw error;
  }
  // check if email existed
  const isEmailExisted = isEmailRegistered(email);
  if (isEmailExisted) {
    const error = new Error(`Email "${email}" has already been registered`);
    error.status = 400;
    throw error;
  }

  users[id] = { id, email, username, passwordHash };
  console.log(users[id]);
  persist();
  return read(id);
}

function isEmailRegistered(email) {
  for (var id of Object.keys(users)) {
    if (email === users[id]?.email) {
      return true;
    }
  }
  return false;
}

async function read(id) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

function validateUser(id) {
  load();
  if (!users[id]) {
    const error = new Error(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

const getToken = (req) =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

async function getUser(req) {
  const token = getToken(req);
  if (!token) {
    const error = new Error("A token must be provided");
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error = new Error("Invalid token. Please login again.");
    error.status = 401;
    throw error;
  }
  const user = await read(userId);
  return user;
}
export { authenticate, create, getUser };
