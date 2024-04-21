import React from "react";
import { Modal, Button } from "react-bootstrap";

// CSS
import "./CustomModal.scss";

const CustomModal = ({ title, content, onHide, onDecline, show }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      onHide={onDecline}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide} className="">
          Accept
        </Button>
        <Button variant="warning" onClick={onDecline} className="">
          Decline
        </Button>
        {/* Add additional buttons or elements here if needed */}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
