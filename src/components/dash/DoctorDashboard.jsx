import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { getUser } from '../../hooks/LocalStorageUser';

const DoctorDashboard = () => {
  const id = getUser().id;
  const [appointments, setAppointments] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showSendButtonIndex, setShowSendButtonIndex] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/appointment/doctor/${id}`);
        const sorted = res.data.sort((a, b) => {
          if (a.status === 'Checked' && b.status !== 'Checked') return 1;
          if (a.status !== 'Checked' && b.status === 'Checked') return -1;
          return 0;
        });
        setAppointments(sorted);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };

    fetchAppointments();
  }, [id]);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setShowSendButtonIndex(null);
  };

  const handleStatusSend = async (appointmentId, index) => {
    try {
      await axios.put(`http://localhost:8080/api/appointment/${appointmentId}/status`, null, {
        params: { status: 'Checked' },
      });

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId ? { ...a, status: 'Checked' } : a
        )
      );

      setShowSendButtonIndex(null);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const doctorInfo = appointments[0]?.doctor;

  return (
    <>
      <Sidebar />
      <div className="p-6 pl-60">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {doctorInfo?.name || 'Doctor'}
        </h1>
        <p className="text-gray-600 mb-6">
          Department: {doctorInfo?.specialization || 'N/A'}
        </p>

        <div className="bg-white shadow rounded p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Patient Name</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a, index) => (
                  <Fragment key={index}>
                    <tr className="border-t">
                      <td className="p-2">{a.date}</td>
                      <td className="p-2">{a.patient?.name}</td>
                      <td className="p-2">{a.time}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-white text-sm ${
                            a.status === 'Checked' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          onClick={() => handleToggle(index)}
                          className="text-sm text-blue-600 underline cursor-pointer"
                        >
                          {expandedIndex === index ? 'Collapse' : 'Expand'}
                        </span>
                      </td>
                    </tr>
                    {expandedIndex === index && (
                      <tr className="bg-gray-50 border-t">
                        <td colSpan="5" className="p-4 text-sm text-gray-700">
                          <div><strong>Phone:</strong> {a.patient?.phone}</div>
                          <div><strong>DOB:</strong> {a.patient?.dob}</div>
                          <div><strong>Patient ID:</strong> {a.patient?.id}</div>

                          {a.status !== 'Checked' && (
                            <div className="mt-3 flex items-center gap-2">
                              {showSendButtonIndex !== index && (
                                <button
                                onClick={() =>
                                  setShowSendButtonIndex(
                                    showSendButtonIndex === index ? null : index
                                  )
                                }
                                className="text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                              >
                                 Mark as Checked
                              </button>
                              )}

                              {showSendButtonIndex === index && (
                                <button
                                  onClick={() => handleStatusSend(a.id, index)}
                                  className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                                >
                                  Send
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-2 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
