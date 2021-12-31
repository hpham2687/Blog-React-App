import React, { useRef } from "react";
import { Button, Loader } from "@ahaui/react";
import { useDispatch } from "react-redux";
import { loadMorePostsAction } from "../../store/reducers/postsReducer";
import PropTypes from "prop-types"; // ES6

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool,
};
export default function LoadMoreBtn({ loading }) {
  const dispatch = useDispatch();
  // const pageYOffsetRef = useRef(window.pageYOffset);

  return (
    <div>
      <Button
        onClick={() => {
          // pageYOffsetRef.current = window.pageYOffset;
          dispatch(loadMorePostsAction({}));
        }}
        variant="primary"
      >
        <Button.Label>
          Load more {loading && <Loader size="small" />}
        </Button.Label>
      </Button>
    </div>
  );
}