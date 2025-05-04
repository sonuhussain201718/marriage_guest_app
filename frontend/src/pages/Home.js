import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage:
          "url(https://source.unsplash.com/1600x900/?wedding,celebration)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        className="shadow-lg p-5"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
        }}
      >
        <h1 className="text-primary mb-3">
          💍 Marriage Function Guest Contribution
        </h1>
        <p className="text-muted mb-4">
          Easily manage guest registrations and contributions.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/register")}
        >
          Register Guest
        </Button>
        <Button
        variant="info"
        size="lg"
        onClick={() => navigate("/get_all_guests")}
        className="mt-3"
      >
        View Guest List
      </Button>
      </Card>
      
    </div>
  );
};

export default Home;
