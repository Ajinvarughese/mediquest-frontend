import { ClaimType } from '../types';

interface ClaimValidationData {
  patientId: string;
  type: ClaimType;
  amount: number;
  dateOfService: string;
  description: string;
  providerName: string;
}

export const validateClaimData = (data: ClaimValidationData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Patient validation
  if (!data.patientId || data.patientId.trim() === '') {
    errors.patientId = 'Patient selection is required';
  }

  // Type validation
  if (!data.type) {
    errors.type = 'Claim type is required';
  }

  // Amount validation
  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Amount must be greater than $0';
  } else if (data.amount > 1000000) {
    errors.amount = 'Amount cannot exceed $1,000,000';
  }

  // Date validation
  if (!data.dateOfService) {
    errors.dateOfService = 'Date of service is required';
  } else {
    const serviceDate = new Date(data.dateOfService);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (serviceDate > today) {
      errors.dateOfService = 'Date of service cannot be in the future';
    } else if (serviceDate < oneYearAgo) {
      errors.dateOfService = 'Date of service cannot be more than one year ago';
    }
  }

  // Description validation
  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  } else if (data.description.trim().length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  // Provider validation
  if (!data.providerName || data.providerName.trim() === '') {
    errors.providerName = 'Provider name is required';
  } else if (data.providerName.trim().length < 2) {
    errors.providerName = 'Provider name must be at least 2 characters long';
  }

  return errors;
};

export const validateDocumentUpload = (file: File): string | null => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

  if (file.size > maxSize) {
    return 'File size cannot exceed 10MB';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF, PNG, JPG, and JPEG files are allowed';
  }

  return null;
};

export const getClaimStatusValidation = (currentStatus: string, newStatus: string): boolean => {
  const validTransitions: Record<string, string[]> = {
    'draft': ['submitted', 'cancelled'],
    'submitted': ['under_review', 'pending_documents', 'cancelled'],
    'under_review': ['approved', 'partially_approved', 'rejected', 'pending_documents'],
    'pending_documents': ['under_review', 'rejected', 'cancelled'],
    'approved': ['settled'],
    'partially_approved': ['settled'],
    'rejected': [], // Final status
    'settled': [], // Final status
    'cancelled': [] // Final status
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
};