import axios from 'axios';
import { Claim, Patient, ClaimStatus, ClaimType, DashboardStats } from '../types';

const getPatient = async () => {
  const res = await axios.get("http://localhost:8080/api/patient");
  return res.data;  
}

export const mockPatients: Patient[] = await getPatient();

const getClaims = async () => {
  const res = await axios.get("http://localhost:8080/api/claims");
  return res.data;
}
getClaims();
export const mockClaims: Claim[] = await getClaims();


export const dashStat = async (): Promise<DashboardStats> => {
  const res = await axios.get("http://localhost:8080/api/claims");
  const data = res.data;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalClaims = data.length;
  const pendingReview = data.filter((c) => c.status === "PENDING").length;
  const approvedClaims = data.filter((c) => c.status === "APPROVED").length;
  const totalAmount = data.reduce((sum, c) => sum + c.amount, 0);
  const approvedAmount = data
    .filter((c) => c.status === "APPROVED")
    .reduce((sum, c) => sum + c.amount, 0);
  const monthlySubmissions = data.filter((c) => {
    const date = new Date(c.submissionDate);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  const settlementRate =
    totalClaims > 0 ? (approvedClaims / totalClaims) * 100 : 0;

  return {
    totalClaims,
    pendingReview,
    approvedClaims,
    totalAmount,
    approvedAmount,
    monthlySubmissions,
    settlementRate: parseFloat(settlementRate.toFixed(1)),
  };
};

const stat = await dashStat();
export const mockDashboardStats: DashboardStats = {
  totalClaims: stat.totalClaims,
  pendingReview: stat.pendingReview,
  approvedClaims: stat.approvedClaims,
  totalAmount: stat.totalAmount,
  approvedAmount: stat.approvedAmount,
  monthlySubmissions: stat.monthlySubmissions,
  settlementRate: stat.settlementRate
}