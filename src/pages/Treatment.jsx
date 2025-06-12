const Treatment = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Advanced Treatment Options</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      We offer a wide range of evidence-based treatments for acute and chronic conditions, carried out by specialists and supported by
      advanced diagnostic and surgical technology.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">❤️ Cardiology</h3>
        <p>Heart care including angiograms, pacemakers, and bypass surgeries.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🦴 Orthopedics</h3>
        <p>Joint replacements, sports injury treatments, and rehabilitation.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧠 Neurology</h3>
        <p>Stroke care, seizures, Parkinson's and other nervous system disorders.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🩸 Oncology</h3>
        <p>Cancer diagnosis, chemotherapy, and tumor surgery options.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧬 Gastroenterology</h3>
        <p>GI tract issues including endoscopy, IBS, and liver disorders.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🌸 Dermatology</h3>
        <p>Skin care treatments for allergies, acne, and cosmetic procedures.</p>
      </div>
    </div>
  </div>
);
export default Treatment;
