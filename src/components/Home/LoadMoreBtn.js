import React, { useRef } from "react";
import { Button, Loader } from "@ahaui/react";
import { useDispatch } from "react-redux";
import { loadMorePostsAction } from "../../store/reducers/postsReducer";
import PropTypes from "prop-types"; // ES6
import styled from "styled-components";

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool,
};
export default function LoadMoreBtn({ loading }) {
  const dispatch = useDispatch();

  return (
    <div>
      <StyledButton
        onClick={() => {
          dispatch(loadMorePostsAction({}));
        }}
        variant="primary"
      >
        <Button.Label>
          Load more {loading && <Loader size="small" />}
        </Button.Label>
      </StyledButton>
    </div>
  );
}
const StyledButton = styled(Button)`
  margin: 12px auto;
`;
