const specializations = [
  { name: 'Dentist', icon: '🦷' },
  { name: 'Cardiologist', icon: '❤️' },
  { name: 'Neurologist', icon: '🧠' },
  { name: 'Pediatrician', icon: '👶' },
];

const SpecializationGrid = () => (
  <section className="py-12 px-8 bg-white text-center">
    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Specializations</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {specializations.map((spec, index) => (
        <div key={index} className="bg-blue-50 p-4 rounded shadow hover:bg-blue-100">
          <div className="text-4xl mb-2">{spec.icon}</div>
          <p className="text-lg font-medium">{spec.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default SpecializationGrid;
