// Report.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';

const Report = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalPresent, setTotalPresent] = useState(0);
  const [FilteredData, setFilteredData] = useState([]);
  const [dummyData, setAttendanceData] = useState([]);
  const [EmployeeDetails, setEmployeeDetails] = useState([]);

  const employeeOptions = Array.isArray(EmployeeDetails)
    ? EmployeeDetails.map((employee) => (
        <option key={employee._id} value={employee.name}>
          {employee.name}
        </option>
      ))
    : null;

  const filteredData = dummyData
    .filter((entry) => selectedEmployee === 'All' || entry.name === selectedEmployee)
    .filter((entry) => !startDate || !endDate || (entry.date >= startDate && entry.date <= endDate));

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [selectedEmployeeReport, setSelectedEmployeeReport] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('11');
  const [selectedYear, setSelectedYear] = useState('2023');
 
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Check if both employee and month are selected
    if (!selectedEmployeeReport || !selectedMonth) {
      // Display an alert or handle the case where selections are incomplete
      alert('Please select both employee and month.');
      return;
    }
  
    // Calculate the total present entries for the selected employee in the selected month and year
    const filteredByMonthYear = dummyData.filter(
      (entry) =>
        entry.name === selectedEmployeeReport &&
        entry.date.startsWith(`${selectedYear}-${selectedMonth}`)
    );
   console.log(filteredByMonthYear) 
    const totalPresentCount = filteredByMonthYear.filter(
      (entry) => entry.status === 'Present'
    ).length;
    console.log(totalPresentCount) 
    setTotalPresent(totalPresentCount);
  };
  



  useEffect(() => {
    fetch('https://jenishabackend.onrender.com/allattendance')
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setAttendanceData(dataArray);

        const filteredData = dataArray
          .filter((entry) => selectedEmployee === 'All' || entry.employee === selectedEmployee)
          .filter((entry) => !startDate || !endDate || (entry.date >= startDate && entry.date <= endDate));

        setFilteredData(filteredData);
      })
      .catch((error) => console.error('Error fetching attendance data:', error));

    fetch('https://jenishabackend.onrender.com/staffs')
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setEmployeeDetails(dataArray);
      })
      .catch((error) => console.error('Error fetching employee details:', error));
  }, [selectedEmployee, startDate, endDate]);

  return (
    <Container fluid>
      <Logout />
      <Row>
        <Col>
          <Link to="/Dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Employee Attendance Report</h2>
        </Col>
      </Row>
      <Row className="mt-3 mb-5 box1">
        <Col md={12} className="d-flex align-items-end">
          <Form onSubmit={handleFormSubmit} className="d-flex align-items-end">
            <Form.Group controlId="employeeSelectReport">
              <Form.Control
                as="select"
                value={selectedEmployeeReport}
                onChange={(e) => setSelectedEmployeeReport(e.target.value)}
              >
                <option value="">Select Employee</option>
                {EmployeeDetails.map((employee) => (
                  <option key={employee._id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="monthSelect" className="ml-2">
              <Form.Control
                as="select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, index) => {
      const monthNumber = index + 1;
      const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
      return (
        <option key={monthNumber} value={formattedMonth}>
          {formattedMonth}
        </option>
      );
    })}
                {/* Month options */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="yearSelect" className="ml-2">
              <Form.Control
                as="select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
               <option key="1" value="2022">2022</option>
               <option key="2" value="2023">2023</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleFormSubmit} className="ml-2">
              Submit
            </Button>
          </Form>

          <h3 className="ml-4">&emsp;{totalPresent}</h3>
        </Col>
      </Row>

      <Row className="mt-3">
        <Form.Group controlId="employeeSelect" as={Col} md={4}>
          <Form.Label>Select Employee:</Form.Label>
          <Form.Control
            as="select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="All">All Employees</option>
            {employeeOptions}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="startDate" as={Col} md={4}>
          <Form.Label>From Date:</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="endDate" as={Col} md={4}>
          <Form.Label>To Date:</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.name}</td>
                  <td>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Report;
