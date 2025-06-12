// File: src/components/UserDashboard.jsx
import React from 'react';
import './Dashboard.css';
import { FaUserCircle, FaCalendarAlt, FaFileMedical, FaFileInvoiceDollar, FaPrescriptionBottle, FaBell } from 'react-icons/fa';

function UserDashboard() {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="welcome">
          <FaUserCircle className="avatar-icon" />
          <h2>Welcome back, John Doe</h2>
        </div>
        <button className="add-btn">Book Appointment</button>
      </div>

      <div className="overview">
        <div className="card green">
          <FaCalendarAlt className="card-icon" />
          <h4>Upcoming Appointments</h4>
          <p>2 scheduled</p>
        </div>
        <div className="card blue">
          <FaFileMedical className="card-icon" />
          <h4>Medical Records</h4>
          <p>5 recent visits</p>
        </div>
        <div className="card orange">
          <FaFileInvoiceDollar className="card-icon" />
          <h4>Billing Summary</h4>
          <p>$1,200 due</p>
        </div>
        <div className="card gray">
          <FaPrescriptionBottle className="card-icon" />
          <h4>Prescriptions</h4>
          <p>3 active meds</p>
        </div>
      </div>

      <div className="content-row">
        <div className="stats">
          <h4>Upcoming Appointments</h4>
          <ul className="schedule-list">
            <li><FaCalendarAlt className="doc-icon" /> <span><strong>Mon, Jun 3</strong> – Dr. Kurian George (Orthopedic)</span></li>
            <li><FaCalendarAlt className="doc-icon" /> <span><strong>Thu, Jun 6</strong> – Dr. Herby (Pediatrician)</span></li>
          </ul>
        </div>

        <div className="schedule">
          <h4>Recent Lab Reports</h4>
          <ul className="schedule-list">
            <li><strong>Blood Test</strong> – Normal ✅</li>
            <li><strong>ECG</strong> – Needs follow-up ⚠️</li>
            <li><strong>X-ray</strong> – Reviewed ✅</li>
          </ul>
        </div>
      </div>

      <div className="content-row">
        <div className="balance">
          <h4>Billing Overview</h4>
          <p><strong>Total Paid:</strong> $3,450</p>
          <p><strong>Pending:</strong> $1,200</p>
        </div>
        <div className="room">
          <h4>Active Prescriptions</h4>
          <p><strong>Amoxicillin</strong> – 500mg, 2/day</p>
          <p><strong>Metformin</strong> – 850mg, 1/day</p>
        </div>
        <div className="reports">
          <h4>Messages & Alerts</h4>
          <p>📢 Your next appointment is in 2 days</p>
          <p>🩺 Lab report needs review</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
