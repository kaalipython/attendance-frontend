import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';

const AddStaff = () => {
  // State for form fields
  const [name, setEmployeeName] = useState('');
  const [email, setEmailId] = useState('');
  const [designation, setDesignation] = useState('');
  const [error, setError] = useState('');
  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server endpoint
      const response = await fetch('https://project-attendance-backend-topv.onrender.com//addStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, designation }),
      });

      if (response.ok) {
        console.log('Staff added successfully');
        setError('Employee added successfully');
        // Add any additional logic here after successful staff addition
      } else {
        console.error('Error adding staff:', response.status);
        setError('response.status');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (
    <Container fluid className="h-100 text-center box1">
      <Logout />
      <Row className="h-100 align-items-center justify-content-center">
        <div className="box">
          <Row className="justify-content-center mb-4">
            <Col>
              <Link to="/dashboard" className="btn btn-primary">
                Back to Dashboard
              </Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={6}>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="employeeName">
                  <Form.Label>Employee Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="emailId">
                  <Form.Label>Email ID:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="designation">
                  <Form.Label>Designation:</Form.Label>
                  <Form.Control
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && <div className="text-info mb-3">{error}</div>}
                <Button variant="primary" type="submit">
                  Add Staff
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default AddStaff;
