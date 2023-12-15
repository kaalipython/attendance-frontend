import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('https://jenishabackend.onrender.com/staffs') // Replace with your server endpoint
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = employees.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <Col md={8}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee._id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="ml-2 mr-2 mt-2">
                  Page {currentPage} of {Math.ceil(employees.length / entriesPerPage)}
                </div>
                <Button
                  variant="outline-secondary"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(employees.length / entriesPerPage)}
                >
                  Next
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Employees;
