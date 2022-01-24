import React, { useState } from "react";
import { notifyNegative } from "utils/toast";
import { getUserPostDetail } from "../api/postApi";

export default function useUserPostDetail(postId) {
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchUserPostDetail() {
      setLoading(true);
      getUserPostDetail(postId)
        .then((response) => {
          setPostData(response);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          notifyNegative({ message: error });
          setLoading(false);
        });
    }

    fetchUserPostDetail();
  }, [postId]);
  return { postData, loading, error };
}
