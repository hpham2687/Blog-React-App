import React from "react";
import { Modal, Button } from "@ahaui/react";
import reactDom from "react-dom";
import PropTypes from "prop-types"; // ES6
import styled from "styled-components";
import { device } from "utils/mediaQuery";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

ModalConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default function ModalConfirm({
  show,
  handleClose,
  setShow,
  onConfirm,
}) {
  return reactDom.createPortal(
    <Modal
      data-testid="modal-confirm"
      style={{ width: "80%", margin: "0 auto" }}
      show={show}
      size="small"
      onHide={handleClose}
    >
      <StyledModalHeader id="dsfs">
        <Modal.Title>Confirmation</Modal.Title>
      </StyledModalHeader>
      <Modal.Body>
        <div className="u-textCenter">Do you want to delete this post?</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)} width="full">
          Cancel
        </Button>
        <Button
          variant="negative"
          onClick={callAll(() => setShow(false), onConfirm)}
          width="full"
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("portal")
  );
}

const StyledModalHeader = styled(Modal.Header)`
  @media ${device.mobileL} {
    padding: 10px;
  }
`;
