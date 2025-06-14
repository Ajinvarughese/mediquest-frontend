
import React from 'react';
import { FaUserCircle, FaCalendarAlt, FaFileMedical, FaFileInvoiceDollar, FaPrescriptionBottle } from 'react-icons/fa';

export default function UserDashboard() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-4xl text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, John Doe</h2>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Book Appointment
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <FaCalendarAlt className="text-2xl mb-2" />
          <h4 className="font-semibold">Upcoming Appointments</h4>
          <p>2 scheduled</p>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <FaFileMedical className="text-2xl mb-2" />
          <h4 className="font-semibold">Medical Records</h4>
          <p>5 recent visits</p>
        </div>
        <div className="bg-orange-100 text-orange-800 p-4 rounded shadow">
          <FaFileInvoiceDollar className="text-2xl mb-2" />
          <h4 className="font-semibold">Billing Summary</h4>
          <p>$1,200 due</p>
        </div>
        <div className="bg-gray-100 text-gray-800 p-4 rounded shadow">
          <FaPrescriptionBottle className="text-2xl mb-2" />
          <h4 className="font-semibold">Prescriptions</h4>
          <p>3 active meds</p>
        </div>
      </div>

      {/* Appointment & Lab Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Upcoming Appointments</h4>
          <ul className="space-y-2 text-gray-700">
            <li><FaCalendarAlt className="inline mr-2 text-blue-600" /> <strong>Mon, Jun 3</strong> – Dr. Kurian George (Orthopedic)</li>
            <li><FaCalendarAlt className="inline mr-2 text-blue-600" /> <strong>Thu, Jun 6</strong> – Dr. Herby (Pediatrician)</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Recent Lab Reports</h4>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Blood Test</strong> – Normal ✅</li>
            <li><strong>ECG</strong> – Needs follow-up ⚠️</li>
            <li><strong>X-ray</strong> – Reviewed ✅</li>
          </ul>
        </div>
      </div>

      {/* Billing & Prescriptions & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Billing Overview</h4>
          <p><strong>Total Paid:</strong> $3,450</p>
          <p><strong>Pending:</strong> $1,200</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Active Prescriptions</h4>
          <p><strong>Amoxicillin</strong> – 500mg, 2/day</p>
          <p><strong>Metformin</strong> – 850mg, 1/day</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Messages & Alerts</h4>
          <p>📢 Your next appointment is in 2 days</p>
          <p>🩺 Lab report needs review</p>
        </div>
      </div>
    </div>
  );
}

