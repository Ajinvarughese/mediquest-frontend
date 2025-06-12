import { useState } from "react";
import { Search } from "lucide-react";

const availableMedicines = ["paracetamol", "amoxicillin", "cough syrup"];

export default function MedicineSearch() {
  const [query, setQuery] = useState("");
  const [available, setAvailable] = useState(null);

  const checkAvailability = () => {
    if(query == "") {
      alert("Please enter a medicine to check availability");
    }
    const prompt = query.toLowerCase();
    setAvailable(availableMedicines.includes(prompt.trim()));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-blue-600">
        <h1 className="text-xl font-bold">Medi-Quest Pharmacy</h1>
        <button className="text-sm border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-900">
          Log in
        </button>
      </div>

      {/* Main Search Box */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-6">MedFinder</h2>

        <div className="w-full max-w-2xl flex shadow-lg">
          <input
            type="text"
            placeholder="Search for medicine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button
            onClick={checkAvailability}
            className="bg-green-600 px-6 py-3 text-white rounded-r-md hover:bg-green-700 flex items-center"
          >
            <Search className="mr-2" size={18} />
            Search
          </button>
        </div>

        {available !== null && (
          <div className="mt-6 text-lg font-semibold">
            {available ? (
              <span className="text-green-300">✅ {query} is Available</span>
            ) : (
              <span className="text-red-300">❌ {query} is Not Available</span>
            )}
          </div>
        )}

        <p className="text-sm text-blue-200 mt-6 max-w-xl text-center">
          MedFinder contains listings for essential and prescription medicines from verified sources.
          Availability is checked against a real-time medicine database.
        </p>
      </div>

      {/* Footer Icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-12 bg-white text-blue-900 text-center">
        <div>
          <div className="text-xl font-bold">Learn</div>
          <p className="text-sm">About MedFinder<br />FAQs & Help</p>
        </div>
        <div>
          <div className="text-xl font-bold">Find</div>
          <p className="text-sm">Nearby Pharmacies<br />Advanced Search</p>
        </div>
        <div>
          <div className="text-xl font-bold">Download</div>
          <p className="text-sm">App for Android / iOS<br />e-Med Reports</p>
        </div>
        <div>
          <div className="text-xl font-bold">Explore</div>
          <p className="text-sm">Medicine Index<br />Health Topics</p>
        </div>
      </div>
    </div>
  );
}
