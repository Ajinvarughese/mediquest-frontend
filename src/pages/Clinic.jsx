const Clinic = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Clinic Services</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Our clinics offer expert medical consultation, diagnosis, and treatment across all specialties. Whether it’s a routine checkup,
      a follow-up visit, or a new concern, our primary and specialty care clinics ensure accessible and affordable care for individuals
      and families. Walk-ins, appointments, and referrals are all welcome.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">🏥 Walk-in Clinic</h3>
        <p>No appointment needed. First-come, first-served basis for minor issues.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">👨‍⚕️ Family Medicine</h3>
        <p>Ongoing care for adults and children, focusing on long-term health.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">👩‍⚕️ Women’s Health</h3>
        <p>Gynecology, pregnancy monitoring, and hormonal health support.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">🩺 Internal Medicine</h3>
        <p>Specialized care for adults with chronic or complex health conditions.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">🧠 Psychiatry Clinic</h3>
        <p>Comprehensive mental health evaluation, counseling, and therapy services.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transition duration-300">
        <h3 className="text-lg font-bold mb-2">🦷 Dental Care</h3>
        <p>Preventive and restorative dental services by certified professionals.</p>
      </div>
    </div>
  </div>
);

export default Clinic;
