import React, { useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';

const GuestForm = () => {
    const [guest, setGuest] = useState({ name: '', contact: '', address: '', amount_paid: '' });

    const handleChange = (e) => {
        setGuest({ ...guest, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            const result = await response.json();
            alert('Guest Registered Successfully!');
            setGuest({ name: '', contact: '', address: '', amount_paid: '' });
        } catch (error) {
            alert('Error registering guest: ' + error.message);
        }
    };

    return (
        <Card className="p-4 shadow-lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* <Image
                src="https://source.unsplash.com/500x200/?wedding,party" // You can change this URL to your own image
                rounded
                fluid
                className="mb-3"
            /> */}
            <h3 className="text-center text-success mb-4">Guest Registration</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={guest.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" name="contact" value={guest.contact} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={guest.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amount Paid</Form.Label>
                    <Form.Control type="number" name="amount_paid" value={guest.amount_paid} onChange={handleChange} required />
                </Form.Group>

                <div className="d-grid">
                    <Button type="submit" variant="success">Register</Button>
                </div>
            </Form>
        </Card>
    );
};

export default GuestForm;
