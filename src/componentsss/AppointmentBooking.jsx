import { useState } from "react";

const doctorsData = {
  Cardiologist: ["Dr. Rajeev Nair", "Dr. Pooja Menon"],
  Pediatrician: ["Dr. Sneha Patil", "Dr. Suku", "Dr. Shahsi"],
  Dentist: ["Dr. Anjali Mehra", "Dr. Sam Thomas"],
  Neurologist: ["Dr. Sajayant Mole"],
  Gynaecologist: ["Dr. Ajin Varughese"]
};

export default function AppointmentBooking() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !doctor) {
      alert("Please select a doctor category and name.");
      return;
    }

    alert(`✅ Appointment booked with ${doctor} (${category}) on ${date} for ${name}`);
    setName("");
    setDate("");
    setCategory("");
    setDoctor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-xl mt-6 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Book an Appointment</h2>

      <label className="block mb-2 font-medium text-gray-700">Your Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Enter your full name"
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Appointment Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Doctor Category</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setDoctor(""); // reset doctor if category changes
        }}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">Select category</option>
        {Object.keys(doctorsData).map((spec, idx) => (
          <option key={idx} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {category && (
        <>
          <label className="block mb-2 font-medium text-gray-700">Doctor Name</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full mb-6 p-2 border rounded"
            required
          >
            <option value="">Select doctor</option>
            {doctorsData[category].map((doc, idx) => (
              <option key={idx} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Confirm Booking
      </button>
    </form>
  );
}
