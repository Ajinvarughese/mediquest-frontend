import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../hooks/LocalStorageUser";

export default function AppointmentBooking() {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorsData, setDoctorsData] = useState({});
  const [availability, setAvailability] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchDoctors = async (doctorId = null) => {
    try {
      let data = [];

      if (doctorId) {
        const res = await axios.get(`http://localhost:8080/api/doctor/${doctorId}`);
        data = [res.data]; // wrap single object in array
      } else {
        const res = await axios.get("http://localhost:8080/api/doctor");
        data = Array.isArray(res.data) ? res.data : [];
      }

      if (doctorId) {
        const allRes = await axios.get("http://localhost:8080/api/doctor");
        const allDoctors = Array.isArray(allRes.data) ? allRes.data : [];
        const selected = data[0];
        data = [...allDoctors.filter((d) => d.id !== selected.id), selected];
      }

      const grouped = {};
      data.forEach(({ id, name, specialization }) => {
        if (!grouped[specialization]) {
          grouped[specialization] = [];
        }
        grouped[specialization].push({ id, name });
      });

      setDoctorsData(grouped);

      if (doctorId && data.length) {
        const target = data.find((d) => d.id === parseInt(doctorId));
        if (target) {
          setCategory(target.specialization);
          setDoctor(String(target.id));
          setSelectedDoctor(target);
        }
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors(id);
  }, [id]);

  const handleAvailabilityCheck = async (selectedTime) => {
    if (!doctor || !date || !selectedTime) return;
    try {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const param = {
        date: formattedDate,
        time: selectedTime,
      };
      const res = await axios.post(`http://localhost:8080/api/appointment/availability/${doctor}`, param, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAvailability(res.data === true);
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailability(false);
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    handleAvailabilityCheck(selectedTime);
  };

 const generateTimeSlots = () => {
    if (!selectedDoctor || !selectedDoctor.fromTime || !selectedDoctor.toTime || !date) return [];

    const slots = [];
    const [fromHour, fromMin] = selectedDoctor.fromTime.split(":").map(Number);
    const [toHour, toMin] = selectedDoctor.toTime.split(":").map(Number);

    const today = new Date();
    const isToday = new Date(date).toDateString() === today.toDateString();
    const now = new Date();

    let slotTime = new Date(date);
    slotTime.setHours(fromHour, fromMin, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(toHour, toMin, 0, 0);

    while (slotTime <= endTime) {
      const slotCopy = new Date(slotTime);

      const diffInMs = slotCopy.getTime() - now.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (!isToday || diffInHours >= 2) {
        const hh = slotCopy.getHours().toString().padStart(2, "0");
        const mm = slotCopy.getMinutes().toString().padStart(2, "0");
        slots.push(`${hh}:${mm}`);
      }

      slotTime.setMinutes(slotTime.getMinutes() + 15);
    }

    return slots;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const hoursDiff = (selectedDateTime - now) / (1000 * 60 * 60);

    if (hoursDiff < 2) {
      alert("❌ You must book at least 2 hours in advance.");
      return;
    }

    if (!category || !doctor || !time || !availability) {
      alert("Please ensure all fields are filled and time is available.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/appointment", {
        date,
        time,
        doctor: { id: doctor },
        patient: { id: getUser().id },
      });
      alert("✅ Appointment booked successfully!");
    } catch (error) {
      console.error("❌ Failed to book appointment:", error);
    } finally {
      setDate("");
      setTime("");
      setCategory("");
      setDoctor("");
      setSelectedDoctor(null);
      setAvailability(null);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-xl mt-6 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Book an Appointment
      </h2>

      <label className="block mb-2 font-medium text-gray-700">
        Doctor Category
      </label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setDoctor("");
          setTime("");
          setSelectedDoctor(null);
          setAvailability(null);
        }}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">Select category</option>
        {Object.keys(doctorsData).map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {category && doctorsData[category] && (
        <>
          <label className="block mb-2 font-medium text-gray-700">
            Doctor Name
          </label>
          <select
            value={doctor}
            onChange={async (e) => {
              const selectedId = e.target.value;
              setDoctor(selectedId);
              setTime("");
              setAvailability(null);
              const res = await axios.get(`http://localhost:8080/api/doctor/${selectedId}`);
              setSelectedDoctor(res.data);
            }}
            className="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="">Select doctor</option>
            {doctorsData[category].map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="block mb-2 font-medium text-gray-700">
        Appointment Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setTime("");
          setAvailability(null);
        }}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      {doctor && date && selectedDoctor && (
        <>
          <label className="block mb-2 font-medium text-gray-700">
            Select Time ({selectedDoctor.fromTime} - {selectedDoctor.toTime})
          </label>
          <select
            value={time}
            onChange={handleTimeChange}
            className={`w-full mb-2 p-2 border rounded ${
              availability === false ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">Select time</option>
            {generateTimeSlots().map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {availability === false ? (
            <p className="text-red-500 text-sm mb-4">
              ❌ Doctor is not available at this time. Please choose another.
            </p>
          ) : time && (
            <p className="text-green-500 text-sm mb-4">
              ✅ Doctor is available at this time.
            </p>
          )}
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={availability === false}
      >
        Confirm Booking
      </button>
    </form>
  );
}
