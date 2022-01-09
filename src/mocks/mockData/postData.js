import { validatePostForm } from "../utils/post";
import { v4 as uuidv4 } from "uuid";
const short = require("short-uuid");

// const { hash, validateUserForm, sanitizeUser } = authUtils;
const postsKey = "__all_post__";
let allPosts = {};
const persist = () =>
  window.localStorage.setItem(postsKey, JSON.stringify(allPosts));
const load = () =>
  Object.assign(allPosts, JSON.parse(window.localStorage.getItem(postsKey)));

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}

async function create({ user, title, content, picture }) {
  validatePostForm({ title, content, picture });
  const id = short.generate();
  allPosts[id] = {
    id,
    authorId: user.id,
    authorName: user.username,
    title,
    content,
    picture,
    createdAt: new Date().toLocaleDateString("en-US"),
  };
  persist();
  return read(id);
}

async function edit({ id, title, content, picture }) {
  validatePostForm({ title, content, picture });
  allPosts[id] = {
    ...allPosts[id],
    title,
    content,
    picture,
  };
  persist();
  return read(id);
}

async function read(id) {
  validatePost(id);
  return allPosts[id];
}

async function remove(id) {
  validatePost(id);
  delete allPosts[id];
  persist();
  return "ok";
}

function validatePost(id) {
  load();
  if (!allPosts[id]) {
    const error = new Error(`No posts with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}
function getArrayFromObjectPosts() {
  load();
  return Object.keys(allPosts).map((key) => ({ ...allPosts[key], id: key }));
  // return Object.keys(allPosts).map((key) => ({ [key]: allPosts[key] }));
}
async function getUserPosts(
  page = 1,
  items_per_page = 6,
  search = null,
  authorId
) {
  let posts = [...getArrayFromObjectPosts()];
  let { filteredPosts, maximunNumOfPages } = postFilter(
    posts,
    page,
    items_per_page,
    search,
    authorId
  );
  return { posts: filteredPosts, items_per_page, page, maximunNumOfPages };
}

function postFilter(
  posts,
  page = 1,
  items_per_page = 6,
  search = null,
  authorId = null
) {
  let filteredPosts = [...posts];
  if (page < 1) {
    const error = new Error(`Page number must be >=1`);
    error.status = 400;
    throw error;
  }
  if (authorId) {
    filteredPosts = filteredPosts.filter((post) => post.authorId == authorId);
  }
  if (search) {
    filteredPosts = filteredPosts.filter((post) => post.title.includes(search));
  }

  let maximunNumOfPages = Math.ceil(filteredPosts.length / items_per_page);

  if (page > maximunNumOfPages) {
    return { filteredPosts: [], items_per_page };
  }
  const indexFrom = (page - 1) * items_per_page;
  const maximunIndex = filteredPosts.length - 1;
  const indexTo =
    page * items_per_page - 1 <= maximunIndex
      ? page * items_per_page - 1
      : maximunIndex;
  filteredPosts = filteredPosts.slice(indexFrom, indexTo + 1);

  return { filteredPosts, maximunNumOfPages };
}

async function getPosts(page = 1, items_per_page = 6, search = null) {
  let posts = [...getArrayFromObjectPosts()];
  let { filteredPosts, maximunNumOfPages } = postFilter(
    posts,
    page,
    items_per_page,
    search
  );
  return {
    posts: filteredPosts,
    items_per_page,
    page,
    search,
    maximunNumOfPages,
  };
}
// async function read(id) {
//   validateUser(id);
//   return sanitizeUser(users[id]);
// }
export { getPosts, create, getUserPosts, read, edit, remove };
