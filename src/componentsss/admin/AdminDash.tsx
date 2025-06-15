import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ClaimsList from './components/claims/ClaimsList';
import ClaimForm from './components/claims/ClaimForm';
import ClaimWorkflow from './components/claims/ClaimWorkflow';
import PatientList from './components/patients/PatientList';
import { Claim } from './types';
import { mockClaims } from './data/mockData';

function AdminDash() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isEditingClaim, setIsEditingClaim] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsEditingClaim(false);
    setActiveSection('claim-detail');
  };

  const handleEditClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsEditingClaim(true);
    setActiveSection('claim-form');
  };

  const handleCreateClaim = () => {
    setSelectedClaim(null);
    setIsEditingClaim(true);
    setActiveSection('claim-form');
  };

  const handleSaveClaim = (claimData: Partial<Claim>) => {
    console.log('Saving claim:', claimData);
    // Here you would typically save to your backend
    setActiveSection('claims');
    setSelectedClaim(null);
    setIsEditingClaim(false);
  };

  const handleCancelEdit = () => {
    setActiveSection('claims');
    setSelectedClaim(null);
    setIsEditingClaim(false);
  };

  const handleSectionChange = (section: string) => {
    if (section === 'new-claim') {
      handleCreateClaim();
    } else if (section === 'pending-review') {
      setActiveSection('claims');
      // Could add filtering logic here
    } else if (section === 'urgent') {
      setActiveSection('claims');
      // Could add filtering logic for urgent items
    } else {
      setActiveSection(section);
    }
    setIsMobileMenuOpen(false);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'claims':
        return (
          <ClaimsList
            onViewClaim={handleViewClaim}
            onEditClaim={handleEditClaim}
          />
        );
      
      case 'claim-form':
        return (
          <ClaimForm
            claim={selectedClaim || undefined}
            onSave={handleSaveClaim}
            onCancel={handleCancelEdit}
          />
        );
      
      case 'claim-detail':
        return selectedClaim ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Claim Details</h1>
                  <p className="text-gray-600">
                    {selectedClaim.id} - {selectedClaim.patientName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditClaim(selectedClaim)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Claim
                  </button>
                  <button
                    onClick={() => setActiveSection('claims')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Claims
                  </button>
                </div>
              </div>
              
              {/* Claim Details Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Claim Amount</h3>
                  <p className="text-2xl font-bold text-gray-900">${selectedClaim.amount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <p className="text-lg font-semibold text-blue-600 capitalize">
                    {selectedClaim.status.replace('_', ' ')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Provider</h3>
                  <p className="text-lg font-medium text-gray-900">{selectedClaim.providerName}</p>
                </div>
              </div>
            </div>
            
            <ClaimWorkflow claim={selectedClaim} />
          </div>
        ) : null;
      
      case 'patients':
        return <PatientList />;
      
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 lg:flex
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDash;