import { useEffect, useState } from "react";

const AnimatedCounter = ({ end, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.ceil(start));
    }, 20);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:scale-105 transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-3xl font-bold text-blue-700">{count.toLocaleString()}</h3>
      <p className="text-gray-600 mt-1">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
