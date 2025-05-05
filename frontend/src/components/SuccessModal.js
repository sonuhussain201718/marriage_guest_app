import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

const SuccessModal = ({ show, onHide, message }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-center">
                <CheckCircleFill size={60} className="text-success mb-3" />
                <h5 className="mb-3">{message}</h5>
                <Button variant="success" onClick={onHide}>
                    OK
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessModal;
