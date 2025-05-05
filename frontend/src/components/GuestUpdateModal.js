import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const GuestUpdateModal = ({ show, onHide, guestData, onUpdateSuccess }) => {
  const [guest, setGuest] = useState({
    name: "",
    contact: "",
    address: "",
    amount_paid: "",
  });

  useEffect(() => {
    if (guestData) {
      setGuest({
        name: guestData.name || "",
        contact: guestData.phone || "",
        address: guestData.address || "",
        amount_paid: guestData.amount || "",
      });
    }
  }, [guestData]);

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/guests/update_guest?id=${guestData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: guest.name,
            phone: guest.contact,
            amount: guest.amount_paid,
            address: guest.address,
            updated_by: "admin",
            record_type_status: "Active",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update guest");

      onUpdateSuccess();
      onHide();
    } catch (error) {
      alert("Error updating guest: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md" className="rounded">
      <Modal.Header closeButton className="bg-success text-white rounded-top">
        <Modal.Title>
          <PencilSquare className="me-2" /> Update Guest
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="name"
              value={guest.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Contact</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="contact"
              value={guest.contact}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="address"
              value={guest.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Amount Paid</Form.Label>
            <Form.Control
              size="lg"
              type="number"
              name="amount_paid"
              value={guest.amount_paid}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default GuestUpdateModal;
