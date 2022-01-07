import { func } from "prop-types";

function validatePostForm({ title, content, picture }) {
  if (!title) {
    const error = new Error("A title is required");
    error.status = 400;
    throw error;
  }
  if (!content) {
    const error = new Error("A content is required");
    error.status = 400;
    throw error;
  }
  if (!picture) {
    const error = new Error("A picture is required");
    error.status = 400;
    throw error;
  }
}

function getFilterParams(req) {
  let page = req.url.searchParams.get("page");
  let items_per_page = req.url.searchParams.get("items_per_page");
  let search = req.url.searchParams.get("search") || null;
  return { page, items_per_page, search };
}
export { validatePostForm, getFilterParams };
