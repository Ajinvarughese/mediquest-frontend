const Vaccine = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Vaccination Services</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Vaccinations protect you and those around you from serious diseases. We offer safe and certified vaccines for all age groups,
      including travel and occupational immunizations, with expert staff and digital records for your convenience.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">💉 COVID-19 Booster</h3>
        <p>Get protection against variants with the latest vaccine formulations.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🤧 Flu Shots</h3>
        <p>Stay safe during flu season with our annual influenza vaccine.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧒 Childhood Immunizations</h3>
        <p>All essential pediatric vaccines as per national guidelines.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🌍 Travel Vaccines</h3>
        <p>Going abroad? Get region-specific vaccines for safe travel.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🦠 HPV Vaccine</h3>
        <p>Protects against cervical and other HPV-related cancers.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🐍 Tetanus & Rabies</h3>
        <p>Post-injury and exposure vaccinations for safety and prevention.</p>
      </div>
    </div>
  </div>
);
export default Vaccine;
