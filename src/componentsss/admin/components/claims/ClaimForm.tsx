import React, { useState, useEffect } from 'react';
import { Save, Upload, X, Plus, FileText, AlertCircle } from 'lucide-react';
import { Claim, ClaimType, ClaimStatus, Patient, ClaimDocument } from '../../types';
import { mockPatients } from '../../data/mockData';
import { validateClaimData } from '../../utils/claimValidation';
import { cn } from '../../utils/cn';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';

interface ClaimFormProps {
  claim?: Claim;
  onSave: (claim: Partial<Claim>) => void;
  onCancel: () => void;
  className?: string;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ claim, onSave, onCancel, className }) => {
  const [formData, setFormData] = useState({
    patientId: claim?.patientId || '',
    type: claim?.type || ClaimType.OTHERS,
    amount: claim?.amount?.toString() || '',
    dateOfService: claim?.dateOfService || '',
    description: claim?.description || '',
    diagnosis: claim?.diagnosis || '',
    treatmentCode: claim?.treatmentCode || '',
    providerId: claim?.providerId || '',
    providerName: claim?.providerName || '',
    documents: claim?.documents || [] as ClaimDocument[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (formData.patientId) {
      const patient = mockPatients.find(p => p.id === formData.patientId);
      setSelectedPatient(patient || null);
    }
  }, [formData.patientId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newDocuments: ClaimDocument[] = Array.from(files).map(file => ({
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: getDocumentType(file.name),
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      verified: false
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const getDocumentType = (filename: string): ClaimDocument['type'] => {
    const extension = filename.toLowerCase().split('.').pop();
    const name = filename.toLowerCase();

    if (name.includes('prescription') || name.includes('rx')) return 'prescription';
    if (name.includes('receipt')) return 'receipt';
    if (name.includes('xray') || name.includes('x-ray')) return 'xray';
    if (name.includes('lab') || name.includes('blood')) return 'lab_result';
    if (name.includes('report') || name.includes('medical')) return 'medical_report';
    
    return 'other';
  };

  const removeDocument = (documentId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId)
    }));
  };

  const validateForm = (): boolean => {
    const validationErrors = validateClaimData({
      ...formData,
      amount: parseFloat(formData.amount) || 0
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (status: ClaimStatus = ClaimStatus.DRAFT) => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const claimData: Partial<Claim> = {
        ...formData,
        amount: parseFloat(formData.amount),
        status,
        patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : '',
        submissionDate: status === ClaimStatus.SUBMITTED ? new Date().toISOString() : claim?.submissionDate,
        lastUpdated: new Date().toISOString(),
        id: claim?.id || `CLM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(claimData);
    } catch (error) {
      console.error('Error saving claim:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDocumentTypeLabel = (type: ClaimDocument['type']): string => {
    const labels = {
      medical_report: 'Medical Report',
      receipt: 'Receipt',
      prescription: 'Prescription',
      xray: 'X-Ray',
      lab_result: 'Lab Result',
      other: 'Other'
    };
    return labels[type];
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border', className)}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {claim ? 'Edit Claim' : 'Create New Claim'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {claim ? 'Update claim information and documentation' : 'Fill in the details to submit a new insurance claim'}
        </p>
      </div>

      <form className="p-6 space-y-6">
        {/* Patient Selection */}
        <Card className="p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => handleInputChange('patientId', value)}
                className={errors.patientId ? 'border-red-300' : ''}
              >
                <option value="">Select a patient</option>
                {mockPatients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.id}
                  </option>
                ))}
              </Select>
              {errors.patientId && (
                <p className="text-sm text-red-600 mt-1">{errors.patientId}</p>
              )}
            </div>

            {selectedPatient && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                <p className="text-sm text-gray-600">Policy: {selectedPatient.policyNumber}</p>
                <p className="text-sm text-gray-600">Insurance: {selectedPatient.insuranceId}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Claim Details */}
        <Card className="p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Claim Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Claim Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                className={errors.type ? 'border-red-300' : ''}
              >
                {Object.values(ClaimType).map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </Select>
              {errors.type && (
                <p className="text-sm text-red-600 mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Claim Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={cn('pl-8', errors.amount ? 'border-red-300' : '')}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Service <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={formData.dateOfService}
                onChange={(e) => handleInputChange('dateOfService', e.target.value)}
                className={errors.dateOfService ? 'border-red-300' : ''}
              />
              {errors.dateOfService && (
                <p className="text-sm text-red-600 mt-1">{errors.dateOfService}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Treatment Code
              </label>
              <Input
                type="text"
                value={formData.treatmentCode}
                onChange={(e) => handleInputChange('treatmentCode', e.target.value)}
                placeholder="e.g., 99213, D3330"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={cn(
                'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                errors.description ? 'border-red-300' : ''
              )}
              placeholder="Describe the medical service or treatment..."
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <Input
              type="text"
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
              placeholder="e.g., Z00.00 - Routine general medical examination"
            />
          </div>
        </Card>

        {/* Provider Information */}
        <Card className="p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Provider Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider ID
              </label>
              <Input
                type="text"
                value={formData.providerId}
                onChange={(e) => handleInputChange('providerId', e.target.value)}
                placeholder="Provider identification number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.providerName}
                onChange={(e) => handleInputChange('providerName', e.target.value)}
                className={errors.providerName ? 'border-red-300' : ''}
                placeholder="Hospital, clinic, or doctor's name"
              />
              {errors.providerName && (
                <p className="text-sm text-red-600 mt-1">{errors.providerName}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Document Upload */}
        <Card className="p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Supporting Documents</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Documents
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG or JPEG (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Document List */}
            {formData.documents.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                {formData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{getDocumentTypeLabel(doc.type)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {formData.documents.length === 0 && (
              <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Supporting documents are recommended for faster claim processing
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={() => handleSubmit(ClaimStatus.DRAFT)}
            disabled={isSubmitting}
            variant="outline"
            className="sm:order-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          
          <Button
            type="button"
            onClick={() => handleSubmit(ClaimStatus.SUBMITTED)}
            disabled={isSubmitting}
            className="sm:order-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Submit Claim
          </Button>
          
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="sm:order-0"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClaimForm;