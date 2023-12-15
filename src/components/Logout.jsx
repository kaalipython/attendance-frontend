// LogoutButton.js

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Logout = ({ onLogout }) => {
    const handleLogout = () => {
        // Add your logic for handling logout here
        console.log('Logout clicked');
      };
  return (
    <Row className="justify-content-end mr-3 " md={6}>
       <Link to="/" className="dashboard-link">
    <Button variant="warning" onClick={handleLogout}>
      Logout
    </Button>
    </Link>
  </Row>

  );
};

export default Logout;
