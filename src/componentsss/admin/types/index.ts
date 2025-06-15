export interface Patient {
  id: string;
  name: string;
  password: string;
  dob: string;
  phone: string;
}

export interface Claim {
  id: number;
  patient: {
    id:  number;
    name: string;
    dob: string;
    phone: string;
  };
  patientId: number;
  claimType: ClaimType;
  status: ClaimStatus;
  amount: number;
  submissionDate: string;
  treatmentDescription: string;
  documentUrl: string;
}

export interface ClaimNote {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'system' | 'reviewer' | 'provider' | 'patient';
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SETTLED = 'SETTLED',
}

export enum ClaimType {
  SURGERY = 'SURGERY',
  ICU = 'ICU',
  ACCIDENT = 'ACCIDENT',
  OTHERS = 'OTHERS',
}

export interface DashboardStats {
  totalClaims: number;
  pendingReview: number;
  approvedClaims: number;
  totalAmount: number;
  approvedAmount: number;
  monthlySubmissions: number;
  settlementRate: number;
}

export interface FilterOptions {
  status?: ClaimStatus[];
  type?: ClaimType[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  patientId?: string;
  providerId?: string;
}