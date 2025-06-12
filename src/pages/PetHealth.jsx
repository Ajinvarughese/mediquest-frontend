const PetHealth = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Pet Health Services</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      We treat your furry friends like family. Our veterinary care unit provides full diagnostics, emergency services, vaccinations,
      and wellness plans tailored to each pet’s needs.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">💉 Vaccination</h3>
        <p>Essential vaccines like Rabies, Parvo, and Distemper for dogs/cats.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🦷 Dental Cleaning</h3>
        <p>Routine scaling, tooth removal, and oral hygiene tips for pets.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🚑 Emergency Vet</h3>
        <p>24/7 support for injuries, poisoning, or breathing issues.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧼 Grooming</h3>
        <p>Full-service grooming and bathing with hypoallergenic options.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🏥 Surgery & Neutering</h3>
        <p>Spay/neuter, tumor removal, and orthopedic surgeries.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">📋 Annual Checkups</h3>
        <p>Routine physicals, vaccination records, and nutrition planning.</p>
      </div>
    </div>
  </div>
);
export default PetHealth;
