import Doctor1 from "../assests/images/Dr Andrew.jpg"
import Doctor1 from "../assests/images/Dr Steve.jpg"
import Doctor1 from "../assests/images/Dr Michelle.jpg"

const appointments = [
  {
    name: "Dr. B Prakash",
    specialization: "General, Plastic & Laparoscopic",
    days: "Monday to Saturday",
    times: ["09:00 AM – 01:00 PM", "03:00 PM – 05:00 PM"],
    room: "101",
    token: "A23",
    photo: "Doctor1", 
  },
  {
    name: "Dr. Satheesh Balakrishnan M.D",
    specialization: "Nephrology",
    days: "Wednesday, Friday",
    times: ["07:00 PM – 09:00 PM"],
    room: "102",
    token: "B15",
    photo: "Doctor2",
  },
  {
    name: "Dr. Silbil Pandey M.D",
    specialization: "Nephrology",
    days: "Wednesday, Thursday",
    times: ["07:00 PM – 09:00 PM"],
    room: "112",
    token: "A5",
    photo: "Doctor3",
  },
  
];

const UpcomingAppointments = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Upcoming Doctor Appointments</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((doc, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:scale-105 transition">
            <img src={doc.photo} alt={doc.name} className="w-24 h-24 rounded-full mb-3 object-cover" />
            <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{doc.specialization}</p>
            <p className="text-sm text-gray-500">{doc.days}</p>
            {doc.times.map((time, i) => (
              <p key={i} className="text-xs text-gray-400">{time}</p>
            ))}
            <div className="flex gap-4 mt-3 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Room: {doc.room}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Token: {doc.token}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
