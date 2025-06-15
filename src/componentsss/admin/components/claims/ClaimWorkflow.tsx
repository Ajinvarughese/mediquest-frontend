import React from 'react';
import { CheckCircle, Clock, FileText, AlertCircle, XCircle, DollarSign } from 'lucide-react';
import { ClaimStatus, Claim } from '../../types';
import { cn } from '../../utils/cn';

interface ClaimWorkflowProps {
  claim: Claim;
  className?: string;
}

const workflowSteps = [
  {
    status: ClaimStatus.PENDING,
    label: 'Pending Documents',
    description: 'Additional documentation required',
    icon: AlertCircle
  },
  {
    status: ClaimStatus.REVIEWING,
    label: 'Under Review',
    description: 'Being reviewed by claims team',
    icon: Clock
  },
  
  {
    status: ClaimStatus.APPROVED,
    label: 'Approved',
    description: 'Claim approved for payment',
    icon: CheckCircle
  },
  {
    status: ClaimStatus.SETTLED,
    label: 'Settled',
    description: 'Payment processed and complete',
    icon: DollarSign
  }
];

const rejectionSteps = [
  {
    status: ClaimStatus.REJECTED,
    label: 'Rejected',
    description: 'Claim rejected',
    icon: XCircle
  },
];

const getStatusIndex = (status: ClaimStatus): number => {
  return workflowSteps.findIndex(step => step.status === status);
};

const getStatusColor = (status: ClaimStatus, isActive: boolean, isPast: boolean): string => {
  if (status === ClaimStatus.REJECTED) {
    return isActive ? 'text-red-600 bg-red-100 border-red-300' : 'text-gray-400 bg-gray-50 border-gray-200';
  }
  
  if (status === ClaimStatus.PENDING) {
    return isActive ? 'text-yellow-600 bg-yellow-100 border-yellow-300' : 'text-gray-400 bg-gray-50 border-gray-200';
  }
  
  if (isPast || isActive) {
    return 'text-green-600 bg-green-100 border-green-300';
  }
  
  return 'text-gray-400 bg-gray-50 border-gray-200';
};

const ClaimWorkflow: React.FC<ClaimWorkflowProps> = ({ claim, className }) => {
  const currentStepIndex = getStatusIndex(claim.status);
  const isRejectedOrCancelled = claim.status === ClaimStatus.REJECTED || claim.status === ClaimStatus.CANCELLED;

  return (
    <div className={cn('bg-white rounded-lg p-6 shadow-sm border', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Claim Progress</h3>
        <p className="text-sm text-gray-600">Track your claim through the entire process</p>
      </div>

      {/* Main workflow */}
      <div className="space-y-4">
        {workflowSteps.map((step, index) => {
          const isActive = currentStepIndex === index && !isRejectedOrCancelled;
          const isPast = currentStepIndex > index && !isRejectedOrCancelled;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex items-center space-x-4">
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors',
                  getStatusColor(step.status, isActive, isPast)
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    'text-sm font-medium',
                    isActive || isPast ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {step.label}
                  </p>
                  {isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                  {isPast && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Complete
                    </span>
                  )}
                </div>
                <p className={cn(
                  'text-sm',
                  isActive || isPast ? 'text-gray-600' : 'text-gray-400'
                )}>
                  {step.description}
                </p>
              </div>
              
              {index < workflowSteps.length - 1 && !isRejectedOrCancelled && (
                <div className={cn(
                  'w-px h-8 ml-5',
                  isPast ? 'bg-green-300' : 'bg-gray-200'
                )} />
              )}
            </div>
          );
        })}

        {/* Rejection/Cancellation steps */}
        {isRejectedOrCancelled && (
          <div className="border-t pt-4 mt-4">
            {rejectionSteps
              .filter(step => step.status === claim.status)
              .map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.status} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-red-300 bg-red-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{step.label}</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Final
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {claim.rejectionReason && (
                        <p className="text-sm text-red-600 mt-1 font-medium">
                          Reason: {claim.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Claim details summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Submitted</p>
            <p className="font-medium text-gray-900">
              {new Date(claim.submissionDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium text-gray-900">
              ${claim.amount.toLocaleString()}
            </p>
          </div>
          {claim.approvedAmount && (
            <div>
              <p className="text-gray-500">Approved</p>
              <p className="font-medium text-green-600">
                ${claim.approvedAmount.toLocaleString()}
              </p>
            </div>
          )}
          {claim.settlementDate && (
            <div>
              <p className="text-gray-500">Settled</p>
              <p className="font-medium text-gray-900">
                {new Date(claim.settlementDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimWorkflow;