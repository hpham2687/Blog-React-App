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

export { validatePostForm };
