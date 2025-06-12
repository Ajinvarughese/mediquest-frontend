import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../componentsss/DoctorList";

const DoctorCategoryPage = ({ onSelectDoctor }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter(
    (doc) => doc.specialization.toLowerCase() === category.toLowerCase()
  );

  const handleBook = (doctor) => {
    onSelectDoctor(doctor);
    navigate("/book");
  };

  return (
    <section className="py-12 px-8 bg-gray-50">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {category.charAt(0).toUpperCase() + category.slice(1)} Specialists
      </h3>
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
              <p className="text-gray-500">{doctor.specialization}</p>
              <p className="text-gray-400 text-sm">{doctor.experience} years experience</p>
              <button
                onClick={() => handleBook(doctor)}
                className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorCategoryPage;