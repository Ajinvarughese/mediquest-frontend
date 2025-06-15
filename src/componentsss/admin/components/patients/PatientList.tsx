import React, { useState } from 'react';
import { Search, User, Phone, Mail, Calendar, CreditCard } from 'lucide-react';
import { mockPatients, mockClaims } from '../../data/mockData';
import { Patient } from '../../types';
import { cn } from '../../utils/cn';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.phone.toLowerCase().includes(searchLower) ||
      patient.dob.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
            <p className="text-sm text-gray-600">
              {filteredPatients.length} of {mockPatients.length} patients
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className={cn(
                'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
                selectedPatient?.id === patient.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {patient.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="w-3 h-3 mr-1" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>DOB: {new Date(patient.dob).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'No patients have been added yet'}
            </p>
          </div>
        )}
      </div>

      {/* Patient Details Panel */}
      {selectedPatient && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Details</h3>
          {/* Patient Details */}
          <div className="grid mb-6 grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.dob}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.phone}</p>
            </div>
          </div>
          {/* Insurance Claims */}
          {mockClaims.filter(c => c.patient.id === Number(selectedPatient.id)).length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {mockClaims
                  .filter((c) => c.patient.id === Number(selectedPatient.id))
                  .map((claim) => (
                    <div
                      key={claim.id}
                      className={cn(
                        'rounded-lg p-4 shadow-sm border',
                        claim.status === 'APPROVED'
                          ? 'bg-green-100 border-green-400'
                          : claim.status === 'PENDING'
                          ? 'bg-yellow-100 border-yellow-400'
                          : claim.status === 'REJECTED'
                          ? 'bg-red-100 border-red-400'
                          : 'bg-gray-100 border-gray-300'
                      )}
                    >
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">{claim.claimType}</h4>
                      <p className="text-xs text-gray-700 mb-1">
                        Status: <strong>{claim.status}</strong>
                      </p>
                      <p className="text-xs text-gray-700 mb-1">
                        Amount: ₹{claim.amount}
                      </p>
                      <p className="text-xs text-gray-700">
                        Submitted: {new Date(claim.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-sm text-gray-600 italic">
              No insurance claims found for this patient.
            </div>
          )}

          
        </div>
      )}
    </div>
  );
};

export default PatientList;