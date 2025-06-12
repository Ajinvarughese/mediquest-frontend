import AnimatedCounter from "./AnimatedCounter";

const About = () => {
  return (
    <div className="px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">About</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          At <span className="font-semibold text-blue-600">MediQuest Hospital</span>, we believe that healthcare is not just about treating illness — it’s about caring for people with compassion, precision, and purpose.
          Since our founding, we have strived to bring world-class medical services closer to every home, with a patient-first philosophy and a legacy of excellence.
        </p>
      </div>
      

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">🏥 State-of-the-Art Facilities</h3>
          <p>Equipped with modern diagnostic labs, emergency response units, surgical suites, and digital health records.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">🩺 Expert Medical Team</h3>
          <p>Board-certified doctors, skilled nurses, and experienced surgeons dedicated to quality care and continuous improvement.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">❤️ Patient-Centered Approach</h3>
          <p>Every patient is treated with empathy, dignity, and personalized care plans tailored to their needs and lifestyle.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">🌍 Community Impact</h3>
          <p>Health camps, vaccination drives, and free checkups for underprivileged communities across the region.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">📈 Transparent Care</h3>
          <p>Clear communication, ethical pricing, and total access to your medical records, always.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">🕊️ Our Mission</h3>
          <p>To heal with excellence, serve with humility, and innovate with responsibility.</p>
        </div>
      </div>
       <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">🏆 Our Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatedCounter end={1200} label="Surgeries Completed" icon="🩺" />
          <AnimatedCounter end={980} label="Emergency Cases Handled" icon="🚑" />
          <AnimatedCounter end={99.6} label="Satisfaction Rate (%)" icon="😊" />
          <AnimatedCounter end={30} label="Specialist Departments" icon="🏥" />
          <AnimatedCounter end={50000} label="Patients Treated" icon="👨‍👩‍👧‍👦" />
          <AnimatedCounter end={15} label="Years of Service" icon="⏳" />
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">Trusted by Thousands of Patients</h2>
        <p className="text-gray-600">
          Join the community of families and individuals who trust us for everything from routine checkups to lifesaving interventions.
        </p>
    

      </div>
    </div>
  );
};

export default About;
