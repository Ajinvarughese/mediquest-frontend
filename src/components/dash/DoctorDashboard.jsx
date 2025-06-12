// src/pages/DoctorDashboard.jsx
import { useState } from 'react';

const dummyDoctorData = {
  name: "Dr. Ajin Varughese",
  department: "Gynaecologist",
  patients: [
    { name: "Anita Das", time: "10:00 AM", status: "Pending" },
    { name: "Rahul Kumar", time: "10:30 AM", status: "Checked" },
    { name: "Sreeja Menon", time: "11:00 AM", status: "Pending" }
  ]
};

const DoctorDashboard = () => {
  const [doctor] = useState(dummyDoctorData);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome, {doctor.name}</h1>
      <p className="text-gray-600 mb-6">Department: {doctor.department}</p>

      <div className="bg-white shadow rounded p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 text-left">Patient Name</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {doctor.patients.map((p, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.time}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      p.status === "Checked" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Patient Reports</h3>
          <p className="text-gray-600">Access diagnostic reports and prescribe follow-ups.</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Send Prescription</h3>
          <p className="text-gray-600">Send prescriptions directly to pharmacy or patient.</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Video Consult History</h3>
          <p className="text-gray-600">Review completed online consultation summaries.</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Medical Certificates</h3>
          <p className="text-gray-600">Issue fit/unfit certificates for patients post-treatment.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
