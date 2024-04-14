import React from "react";
import { Modal, Button } from "react-bootstrap";

// CSS
import "./CustomModal.scss";

const CustomModal = ({ title, content, onHide, show }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide} className="">
          Go
        </Button>

        {/* Add additional buttons or elements here if needed */}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
