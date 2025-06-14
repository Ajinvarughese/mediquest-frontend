import { useState } from 'react';
import axios from 'axios';

const InsuranceClaim = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    hospitalName: '',
    claimType: '',
    treatmentDescription: '',
    amount: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload the document first
      const fileData = new FormData();
      fileData.append('file', formData.document);

      const fileUploadResponse = await axios.post(
        'http://localhost:8080/api/claims/file/upload',
        fileData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const documentUrl = fileUploadResponse.data; // Assuming this returns a plain string URL

      // Step 2: Send the main claim data
      const claimPayload = {
        patientId: formData.patientId,
        hospitalName: formData.hospitalName,
        claimType: formData.claimType,
        treatmentDescription: formData.treatmentDescription,
        amount: formData.amount,
        documentUrl, // use the uploaded file URL
      };

      const response = await axios.post(
        'http://localhost:8080/api/claims',
        claimPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Claim submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim. Try again.');
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Emergency Insurance Claim</h2>
      <p className="text-gray-600 mb-6">
        If you're admitted due to emergency (e.g., surgery, accident), please fill in the following to initiate your hospital-based insurance claim.
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID / Aadhaar"
          className="p-2 border rounded"
          value={formData.patientId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          className="p-2 border rounded"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />

        <select
          name="claimType"
          className="p-2 border rounded"
          value={formData.claimType}
          onChange={handleChange}
          required
        >
          <option value="">Select Claim Type</option>
          <option value="SURGERY">Surgery</option>
          <option value="ICU">ICU Admission</option>
          <option value="ACCIDENT">Accident Emergency</option>
          <option value="OTHERS">Other</option>
        </select>

        <textarea
          name="treatmentDescription"
          rows="3"
          placeholder="Brief Description of the Treatment or Emergency"
          className="p-2 border rounded"
          value={formData.treatmentDescription}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Claim Amount (₹)"
          className="p-2 border rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label className="block mt-2 mb-1 font-medium text-gray-600">Upload Hospital Bill / Discharge Summary</label>
        <input
          type="file"
          name="document"
          accept="application/pdf,image/*"
          className="p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default InsuranceClaim;
