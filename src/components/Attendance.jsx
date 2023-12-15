import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';

const Attendance = () => {
  // State for form fields
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState('');
  // Fetch employee names from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://jenishabackend.onrender.com/staffs');
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error('Error fetching employees:', response.status);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server endpoint
      const response = await fetch('https://jenishabackend.onrender.com/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedEmployee, date: selectedDate, status: attendanceStatus }),
      });

      if (response.ok) {
        console.log('Attendance stored successfully');
        setError('Attendance stored successfully');
        // Add any additional logic here after successful attendance storage
      } else {
        console.error('Error storing attendance:', response.status);
      }
    } catch (error) {
      console.error('Error storing attendance:', error);
    }
  };

  return (
    <Container fluid className="box1 h-100">
      <Logout></Logout>
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
              <Form.Group controlId="employeeSelect">
                <Form.Label>Select Employee:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.name}>
                      {employee.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="dateSelect">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="statusSelect">
                <Form.Label>Select Status:</Form.Label>
                <Form.Control
                  as="select"
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </Form.Control>
              </Form.Group>
              {error && <div className="text-info mb-3">{error}</div>}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Attendance;
