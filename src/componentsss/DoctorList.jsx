import doctor1 from '../assests/images/Dr Andrew.jpg';
import doctor2 from '../assests/images/ajin.jpg';
import doctor3 from '../assests/images/Dr Michelle.jpg';
import doctor4 from '../assests/images/Dr Steve.jpg';
import HeroSection from './HeroSection';
import { useNavigate } from 'react-router';




const doctors = [

  {
    name: 'Dr. Anjali Mehra',
    specialization: 'Dentist',
    experience: 8,
    image: doctor1,
  },
  {
    name: 'Dr. Rajeev Nair',
    specialization: 'Cardiologist',
    experience: 12,
    image: doctor2,
  },
  {
    name: 'Dr. Sneha Patil',
    specialization: 'Pediatrician',
    experience: 6,
    image: doctor3,
  },

  {
    name: 'Dr. goku',
    specialization: 'Pediatrician',
    experience: 6,
    image: doctor4,
  },

  {
    name: 'Dr. Suku',
    specialization: 'Pediatrician',
    experience: 6,
    image: doctor3,
  },

  {
    name: 'Dr. Shahsi',
    specialization: 'Pediatrician',
    experience: 6,
    image: doctor4,
  },
];

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return(
  <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
    <img src={doctor.image} alt={doctor.name} className="w-24 h-24 mx-auto rounded-full mb-3 object-cover" />
    <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
    <p className="text-gray-500">{doctor.specialization}</p>
    <p className="text-gray-400 text-sm">{doctor.experience} years experience</p>
    <button onClick={() => navigate("/appointment-booking")} className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
      Book Appointment
    </button>
  </div>
);
}

const DoctorList = () => {
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
