const Checkup = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Health Checkup Packages</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Regular checkups help detect problems early and maintain overall health. Our tailored packages suit all age groups and health
      priorities with access to expert physicians and detailed reports.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧪 Basic Checkup</h3>
        <p>Includes vitals, blood tests, glucose, and BP monitoring.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">💼 Executive Checkup</h3>
        <p>Liver, kidney, lipid profile, ECG and full physical consult.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">👩 Women’s Wellness</h3>
        <p>Includes pap smear, breast exam, vitamin and hormone testing.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧓 Senior Screening</h3>
        <p>Arthritis, bone density, sugar levels, and cardiac risk checks.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">💓 Cardiac Panel</h3>
        <p>ECG, echo, lipid profile, stress test and consult with cardiologist.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">👶 Child Checkup</h3>
        <p>Growth charting, immunization review, and nutrition assessment.</p>
      </div>
    </div>
  </div>
);
export default Checkup;
