import React, { useState } from 'react';
import { Form, Button, Card, Modal, Spinner } from 'react-bootstrap';

const GuestForm = () => {
    const [guest, setGuest] = useState({ name: '', contact: '', address: '', amount_paid: '' });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setGuest({ ...guest, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/guests/create_guest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: guest.name,
                    phone: guest.contact,
                    amount: guest.amount_paid,
                    address: guest.address,
                    created_by: 'admin',
                    updated_by: 'admin',
                    record_type_status: 'Active'
                })
            });

            if (!response.ok) throw new Error('Failed to register guest');

            setModalTitle('Success');
            setModalMessage('Guest Registered Successfully!');
            setGuest({ name: '', contact: '', address: '', amount_paid: '' });
        } catch (error) {
            setModalTitle('Error');
            setModalMessage('Error registering guest: ' + error.message);
        } finally {
            setLoading(false);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: '500px', margin: '40px auto', background: '#f8f9fa' }}>
                <h3 className="text-center text-success mb-4">Guest Registration</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={guest.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact"
                            value={guest.contact}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={guest.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Amount Paid</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount_paid"
                            value={guest.amount_paid}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            required
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button type="submit" variant="success" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Registering...
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default GuestForm;
