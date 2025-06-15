import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaCalendarAlt, FaFileMedical, FaFileInvoiceDollar, FaPrescriptionBottle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { getUser } from '../../hooks/LocalStorageUser';
import { Badge, Calendar, Eye, FileText, IndianRupee, User } from 'lucide-react';
import { Button } from '@mui/material';
import { formattedDate } from '../../hooks/CurrentDate';


const statusColors = {
  REVIEWING: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  SETTLED: 'bg-emerald-100 text-emerald-800',
  PENDING: 'bg-yellow-100 text-yellow-800'
};

const typeColors = {
  ACCIDENT: 'bg-blue-50 text-blue-700',
  ICU: 'bg-purple-50 text-purple-700',
  OTHERS: 'bg-green-50 text-green-700',
  SURGERY: 'bg-pink-50 text-pink-700',
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [insuranceClaim, setInsuranceClaim] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get(`http://localhost:8080/api/appointment/${getUser().id}`);
    setAppointments(res.data); 
  }
  const fetchInsurances = async () => {
    const res = await axios.get(`http://localhost:8080/api/claims/user/${getUser().phone}`);
    setInsuranceClaim(res.data);
  }

  useEffect(() => {
    fetchAppointments();
    fetchInsurances();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-4xl text-blue-600" />
          <h2 className="text-2xl ml-2 font-bold text-gray-800">{getUser().name}</h2>
        </div>
        <button onClick={() => {navigate("/appointment-booking")}} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Book Appointment
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <FaCalendarAlt className="text-2xl mb-2" />
          <h4 className="font-semibold">Upcoming Appointments</h4>
          <p><p>{appointments.filter(app => app.status === "BOOKED").length} appointments scheduled</p></p>
        </div>
        <div className="bg-orange-100 text-orange-800 p-4 rounded shadow">
          <FaFileInvoiceDollar className="text-2xl mb-2" />
          <h4 className="font-semibold">My Insurance Claims</h4>
          <p>{insuranceClaim.length} insurance claims</p>
        </div>
      </div>

      {/* Appointment & Lab Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Appointment Details</h4>
          <ul className="space-y-2 text-gray-700">
            {console.log(appointments)}
            {appointments.map((appointment, idx) => (
              <li><FaCalendarAlt className="inline mr-2 text-blue-600" /> <strong>{formattedDate(appointment.date, false)}</strong> – {`${appointment.doctor.name} (${appointment.doctor.specialization})`}</li>
            ))}
            
          </ul>
        </div>
      </div>
     
        
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              
              >
                <div className="flex items-center space-x-1">
                  <span>Claim ID</span>
                
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Patient</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Dat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {insuranceClaim.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{claim.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{claim.patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeColors[claim.claimType]}`}>
                    {claim.claimType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[claim.status]}`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900">
                      {claim.amount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(claim.submissionDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

