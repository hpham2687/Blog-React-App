import React, { useState } from "react";
import { notifyNegative } from "utils/toast";
import { getPostDetail } from "../api/postApi";

export default function usePostDetail(postId) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchPostDetail() {
      setLoading(true);
      getPostDetail(postId)
        .then((response) => {
          setPostData(response);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          notifyNegative({ message: error.message });
        });
    }

    fetchPostDetail();
  }, [postId]);
  return { postData, loading };
}
