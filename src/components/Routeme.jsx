import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Attendance from './Attendance'; // Correct import
import Register from './Register';
import Report from './Report';
import AddStaff from './AddStaff';
import Dashboard from './Dashboard';
import Employees from './Employees';

// Correct the function declaration and add parentheses
function Routeme() {
  return (
    <>
    
       
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/addstaff" element={<AddStaff />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Employees" element={<Employees />} />
        </Routes>
    
    </>
  );
}

export default Routeme;
