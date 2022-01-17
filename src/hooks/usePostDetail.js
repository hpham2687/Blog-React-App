import React, { useState } from "react";
import { getPostDetail } from "../api/postApi";

export default function usePostDetail(postId) {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchPostDetail() {
      setLoading(true);
      let response = await getPostDetail(postId);
      setPostData(response);
      setLoading(false);
    }

    fetchPostDetail();
  }, [postId]);
  return { postData, loading };
}
