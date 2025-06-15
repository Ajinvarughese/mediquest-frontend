import React from 'react';
import { Users, FileText, DollarSign, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { mockDashboardStats, mockClaims } from '../../data/mockData';
import { ClaimStatus } from '../../types';
import StatsCard from './StatsCard';
import Card from '@mui/material/Card';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  
  // Calculate additional metrics
  const statusCounts = mockClaims.reduce((acc, claim) => {
    acc[claim.status] = (acc[claim.status] || 0) + 2;
    return acc;
  }, {} as Record<ClaimStatus, number>);

  const recentClaims = mockClaims
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const getStatusIcon = (status: ClaimStatus) => {
    switch (status) {
      case ClaimStatus.APPROVED:
      case ClaimStatus.SETTLED:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case ClaimStatus.REJECTED:
        return <XCircle className="w-4 h-4 text-red-500" />;
      case ClaimStatus.PENDING:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case ClaimStatus.APPROVED:
      case ClaimStatus.SETTLED:
        return 'text-green-600 bg-green-100';
      case ClaimStatus.REJECTED:
        return 'text-red-600 bg-red-100';
      case ClaimStatus.PENDING:
        return 'text-yellow-600 bg-yellow-100';
      case ClaimStatus.REVIEWING:
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Insurance Claims Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage your insurance claims efficiently
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Claims"
          value={stats.totalClaims.toString()}
          change="+12%"
          changeType="positive"
          icon={FileText}
          trend="up"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pendingReview.toString()}
          change="-8%"
          changeType="positive"
          icon={Clock}
          trend="down"
        />
        <StatsCard
          title="Approved Claims"
          value={stats.approvedClaims.toString()}
          change="+15%"
          changeType="positive"
          icon={CheckCircle}
          trend="up"
        />
        <StatsCard
          title="Settlement Rate"
          value={`${stats.settlementRate}%`}
          change="+2.3%"
          changeType="positive"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Claimed</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ${stats.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Approved</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${stats.approvedAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-medium text-gray-900">
                  {((stats.approvedAmount / stats.totalAmount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                  style={{ width: `${(stats.approvedAmount / stats.totalAmount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Submissions</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.monthlySubmissions}
            </div>
            <p className="text-sm text-gray-600">Claims this month</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+12% from last month</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Claims Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-0 text-sm font-medium text-gray-500">Claim ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Submission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="py-3 px-0">
                    <span className="font-medium text-gray-900">{claim.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{claim.patient.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(claim.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                        {claim.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      ₹{claim.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600">
                      {new Date(claim.submissionDate).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;