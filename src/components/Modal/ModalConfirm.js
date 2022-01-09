import React from "react";
import { Modal, Button } from "@ahaui/react";
import reactDom from "react-dom";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

export default function ModalConfirm({
  show,
  handleClose,
  setShow,
  onConfirm,
}) {
  return reactDom.createPortal(
    <Modal show={show} size="small" onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
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
