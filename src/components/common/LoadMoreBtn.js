import { Button, Loader } from "@ahaui/react";
import PropTypes from "prop-types"; // ES6
import React from "react";
import styled from "styled-components";

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
};
export default function LoadMoreBtn({ loading, onLoadMore }) {
  return (
    <div style={{ textAlign: "center" }}>
      <StyledButton onClick={onLoadMore} variant="primary">
        <Button.Label>
          Load more {loading && <Loader aria-label="Loading..." size="small" />}
        </Button.Label>
      </StyledButton>
    </div>
  );
}
const StyledButton = styled(Button)`
  margin: 12px auto;
`;
