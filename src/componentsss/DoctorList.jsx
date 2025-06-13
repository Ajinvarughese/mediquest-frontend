import doctor1 from '../assests/images/Dr Andrew.jpg';
import doctor2 from '../assests/images/ajin.jpg';
import doctor3 from '../assests/images/Dr Michelle.jpg';
import doctor4 from '../assests/images/Dr Steve.jpg';
import HeroSection from './HeroSection';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';




const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return(
  <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
    <img src={doctor.picture} alt={doctor.name} className="w-24 h-24 mx-auto rounded-full mb-3 object-cover" />
    <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
    <p className="text-gray-500">{doctor.specialization}</p>
    <p className="text-gray-400 text-sm">{doctor.experience} years experience</p>
    <button onClick={() => navigate(`/appointment-booking/${doctor.id}`)} className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
      Book Appointment
    </button>
  </div>
);
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:8080/api/doctor");
    console.log(res.data);
    setDoctors(res.data);
  }

  useEffect(()=> {
    fetchDoctors();
  }, []);

  return(
  <section className="py-12 px-8 bg-gray-50">
    <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Our Doctors</h3>
    <div style={{width: '100%'}}>
      <HeroSection />      
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </div>
  </section>
);
}

export default DoctorList;
