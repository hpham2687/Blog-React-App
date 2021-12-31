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

async function create({ username, password }) {
  validateUserForm({ username, password });
  const id = hash(username);
  const passwordHash = hash(password);
  if (users[id]) {
    const error = new Error(
      `Cannot create a new user with the username "${username}"`
    );
    error.status = 400;
    error.custom = 123;
    throw error;
  }
  users[id] = { id, username, passwordHash };
  persist();
  return read(id);
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
export { authenticate, create };
