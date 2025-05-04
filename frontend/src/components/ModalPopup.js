import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onHide, fileName, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered className="modal-dialog-centered">
      <Modal.Body className="text-center p-4">
        <div className="d-flex justify-content-center mb-3">
          <span style={{ fontSize: '2em' }}>🗑️</span> {/* Using an emoji for the trash can icon */}
        </div>
        <h4>Are you sure you want to delete this record</h4>
        <p className="mb-0">"{fileName}"</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center bg-light border-top-0 p-3">
        <Button variant="outline-secondary" onClick={onHide} className="me-2 px-4">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="px-4">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;