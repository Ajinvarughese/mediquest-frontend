import { useNavigate } from 'react-router';
import hero from '../assests/images/bgimage.png'

const HeroSection = () => {
  const navigate = useNavigate();
  return (
  <section className="flex w-full flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-50">
    <div
      className="mb-8 md:mb-0 p-8 rounded-lg text-white"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Optional: overlay for better readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '0.5rem',
          zIndex: 0,
        }}
      ></div>

      {/* Content on top of overlay */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-4xl font-bold mb-4">Find the Best Doctors Near You</h2>
        <p className="mb-6">Book appointments with top-rated specialists in your area.</p>
        <button onClick={() => navigate("/appointment-booking")} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Book Appointment
        </button>
      </div>
    </div>

    {/* Remove the right image, or keep empty space */}
    <div className="md:w-1/2"></div>
  </section>
);
}

export default HeroSection;
