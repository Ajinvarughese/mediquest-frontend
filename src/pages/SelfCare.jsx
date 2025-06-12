const SelfCare = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Self Care Programs</h1>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Self-care is essential for mental clarity, emotional balance, and physical well-being. Our curated programs help you adopt healthy habits,
      reduce stress, and maintain a happier lifestyle — supported by professionals and tailored to your needs.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🥗 Diet Plans</h3>
        <p>Personalized nutrition advice from licensed dietitians.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧘 Mental Wellness</h3>
        <p>Mindfulness routines, therapist access, and stress relief tools.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🏃 Fitness Coaching</h3>
        <p>Workouts, yoga, and exercise plans with remote or in-person sessions.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🛏️ Sleep Hygiene</h3>
        <p>Improve sleep quality with routines, tracking, and expert support.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🚭 Addiction Support</h3>
        <p>Help for quitting tobacco, alcohol, or other substances.</p>
      </div>
      <div className="bg-white p-5 rounded shadow hover:scale-105 transition duration-300">
        <h3 className="font-bold text-lg mb-2">🧴 Skincare & Hygiene</h3>
        <p>Routines and consultations to improve personal care and hygiene.</p>
      </div>
    </div>
  </div>
);
export default SelfCare;
