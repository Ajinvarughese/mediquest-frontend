import {
  FaUserMd,
  FaCalendarCheck,
  FaCarCrash,
  FaProcedures,
  FaUserCircle
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Apr", patients: 800, inpatients: 400 },
  { name: "May", patients: 1500, inpatients: 600 },
  { name: "Jun", patients: 1800, inpatients: 1256 },
  { name: "Jul", patients: 1400, inpatients: 900 },
  { name: "Aug", patients: 1650, inpatients: 950 },
  { name: "Sep", patients: 2000, inpatients: 1200 }
];

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-3xl text-green-900" />
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, Admin
          </h2>
        </div>
        <button className="bg-green-800 text-white px-5 py-2 rounded hover:bg-green-700 text-sm">
          + Add Patient
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <FaCalendarCheck className="text-2xl mb-2" />
          <h4 className="font-semibold">Appointments</h4>
          <p className="text-lg">
            1,250 <span className="text-sm ml-2">+50%</span>
          </p>
        </div>
        <div className="bg-cyan-100 text-green-900 p-4 rounded-lg shadow">
          <FaCarCrash className="text-xl mb-2" />
          <h4 className="font-semibold">Insurance Claims</h4>
          <p className="text-lg">
            100 <span className="text-sm ml-2 text-red-500">-20%</span>
          </p>
        </div>
        <div className="bg-orange-100 text-green-900 p-4 rounded-lg shadow">
          <FaProcedures className="text-xl mb-2" />
          <h4 className="font-semibold">Surgeries</h4>
          <p className="text-lg">
            60 <span className="text-sm ml-2 text-red-500">-15%</span>
          </p>
        </div>
        <div className="bg-gray-100 text-green-900 p-4 rounded-lg shadow">
          <FaUserMd className="text-xl mb-2" />
          <h4 className="font-semibold">Patients</h4>
          <p className="text-lg">3,253</p>
        </div>
      </div>

      {/* Statistics + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h4 className="font-semibold text-lg mb-4">📊 Patient Statistics</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#0e4d3a"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="inpatients"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h4 className="font-semibold text-lg mb-4">📅 Today's Schedule</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>09:00 AM</strong> – Dr. Kurian George (Orthopedic)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>12:30 PM</strong> – Dr. Sajayan Moone (General)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>09:00 AM</strong> – Dr. Suku Efx (Psychopath)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>12:30 PM</strong> – Dr. Ajin Varughese (General)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>09:00 AM</strong> – Dr. Herby (Pediatrician)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-green-800" />
              <span>
                <strong>12:30 PM</strong> – Dr. Ali Ikaa (Gym Specialist)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h4 className="font-semibold text-lg mb-2">💰 Balance Summary</h4>
          <p>
            <strong>Transactions:</strong> $136,450
          </p>
          <p>
            <strong>Total Revenue:</strong> $7,999,000
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h4 className="font-semibold text-lg mb-2">🛏️ Room Occupancy</h4>
          <p>
            <strong>Dental Checkup:</strong> 52 / 124
          </p>
          <p>
            <strong>Age group:</strong> 56
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h4 className="font-semibold text-lg mb-2">🚨 Server Alerts</h4>
          <p>⚠️ 4 server issues reported during the night shift</p>
          <p>📝 Review all pending incident reports</p>
        </div>
      </div>
    </div>
  );
}
