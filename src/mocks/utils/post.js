function validatePostForm({ title, content }) {
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
}

function getFilterParams(req) {
  let page = parseInt(req.url.searchParams.get("page"));
  let items_per_page = parseInt(req.url.searchParams.get("items_per_page"));
  let search = req.url.searchParams.get("search") || null;
  return { page, items_per_page, search };
}
export { validatePostForm, getFilterParams };
