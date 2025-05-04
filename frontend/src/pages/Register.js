import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GuestForm from '../components/GuestForm';

const Register = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            {/* <h2 className="text-success">Guest Registration</h2> */}
            <GuestForm />
            <Button variant="secondary" className="mt-3" onClick={() => navigate('/')}>
                Back to Home
            </Button>
        </Container>
    );
};

export default Register;
