// Dashboard.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Create a separate CSS file for custom styling
import Logout from './Logout';

const Dashboard = () => {
 

  return (
    <Container fluid className="mt-4 box1">
     <Logout></Logout>
      <Row className="mt-4 cv">
        <Col md={6}>
          <Link to="/AddStaff" className="dashboard-link">
            <Card className="dashboard-card bg-primary text-white">
              <Card.Body>
                <Card.Title>NEW STAFF</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={6}>
          <Link to="/Attendance" className="dashboard-link">
            <Card className="dashboard-card bg-success text-white">
              <Card.Body>
                <Card.Title>ATTENDANCE ENTRY</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={6}>
          <Link to="/Report" className="dashboard-link">
            <Card className="dashboard-card bg-danger text-white mt-4">
              <Card.Body>
                <Card.Title>REPORT</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={6}>
          <Link to="/Employees" className="dashboard-link">
            <Card className="dashboard-card bg-info text-white mt-4">
              <Card.Body>
                <Card.Title>STAFF LIST</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
