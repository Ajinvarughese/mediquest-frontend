const Symptoms = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Symptom Checker</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Unsure about your symptoms? Use our smart symptom checker to review common health issues and know when to seek care.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🌡️ Fever</h3>
        <p>Could indicate infection, flu, or underlying inflammation.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🤧 Cough</h3>
        <p>Dry or wet cough could be viral or allergy-related.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🌀 Fatigue</h3>
        <p>Could be due to stress, thyroid, anemia, or sleep issues.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🫁 Shortness of Breath</h3>
        <p>May signal asthma, lung infection, or cardiovascular problem.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🤕 Headache</h3>
        <p>Migraine, stress, dehydration or vision issues could be triggers.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🤒 Body Aches</h3>
        <p>Common in viral infections or musculoskeletal conditions.</p>
      </div>
    </div>
  </div>
);
export default Symptoms;
