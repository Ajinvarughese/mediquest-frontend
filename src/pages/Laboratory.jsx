const Laboratory = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Laboratory Services</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Our NABL-accredited diagnostic labs offer reliable, fast, and confidential testing. You get expert-reviewed reports online
      within hours and personalized interpretation upon request.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🩸 Blood Tests</h3>
        <p>Includes CBC, liver profile, sugar, thyroid, and anemia testing.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">💧 Urine Analysis</h3>
        <p>Early detection of infections, kidney issues, or metabolic disorders.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🔬 Pathology</h3>
        <p>Tissue sampling and biopsy review by experienced pathologists.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧫 Microbiology</h3>
        <p>Cultures and antibiotic sensitivity testing for infections.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧪 Hormone Panels</h3>
        <p>Thyroid, cortisol, testosterone, estrogen levels and more.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">📈 Diagnostic Reports</h3>
        <p>Fast digital access to lab reports with doctor follow-up.</p>
      </div>
    </div>
  </div>
);
export default Laboratory;
