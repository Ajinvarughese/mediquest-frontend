import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Edit, FileText, Calendar, IndianRupee as DollarSign, User } from 'lucide-react';
import { Claim, ClaimStatus, ClaimType, FilterOptions } from '../../types';
import { mockClaims } from '../../data/mockData';
import { cn } from '../../utils/cn';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';

const statusColors = {
  [ClaimStatus.REVIEWING]: 'bg-blue-100 text-blue-800',
  [ClaimStatus.APPROVED]: 'bg-green-100 text-green-800',
  [ClaimStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ClaimStatus.SETTLED]: 'bg-emerald-100 text-emerald-800',
  [ClaimStatus.PENDING]: 'bg-yellow-100 text-yellow-800'
};

const typeColors = {
  [ClaimType.ACCIDENT]: 'bg-blue-50 text-blue-700',
  [ClaimType.ICU]: 'bg-purple-50 text-purple-700',
  [ClaimType.OTHERS]: 'bg-green-50 text-green-700',
  [ClaimType.SURGERY]: 'bg-pink-50 text-pink-700',
};

interface ClaimsListProps {
  onViewClaim?: (claim: Claim) => void;
  onEditClaim?: (claim: Claim) => void;
}

const ClaimsList: React.FC<ClaimsListProps> = ({ onViewClaim, onEditClaim }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortField, setSortField] = useState<keyof Claim>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedClaims = useMemo(() => {
    let filtered = mockClaims.filter(claim => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !claim.patient.name.toLowerCase().includes(searchLower) &&
          !claim.treatmentDescription.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(claim.status)) {
          return false;
        }
      }

      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(claim.claimType)) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange) {
        const claimDate = new Date(claim.submissionDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (claimDate < startDate || claimDate > endDate) {
          return false;
        }
      }

      // Amount range filter
      if (filters.amountRange) {
        if (claim.amount < filters.amountRange.min || claim.amount > filters.amountRange.max) {
          return false;
        }
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, filters, sortField, sortDirection]);

  const handleSort = (field: keyof Claim) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof FilterOptions];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  }).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Claims Management</h2>
            <p className="text-sm text-gray-600">
              {filteredAndSortedClaims.length} of {mockClaims.length} claims
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <Button
              variant='outlined'
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select
                  value={filters.status?.[0] || ''}
                  onValueChange={(value) => 
                    setFilters(prev => ({ 
                      ...prev, 
                      status: value ? [value as ClaimStatus] : undefined 
                    }))
                  }
                >
                  <option value="">All Statuses</option>
                  {Object.values(ClaimStatus).map(status => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <Select
                  value={filters.type?.[0] || ''}
                  onValueChange={(value) => 
                    setFilters(prev => ({ 
                      ...prev, 
                      type: value ? [value as ClaimType] : undefined 
                    }))
                  }
                >
                  <option value="">All Types</option>
                  {Object.values(ClaimType).map(type => (
                    <option key={type} value={type}>
                      {type.toUpperCase()}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                <Input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => 
                    setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { 
                        ...prev.dateRange, 
                        start: e.target.value,
                        end: prev.dateRange?.end || ''
                      } 
                    }))
                  }
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                <Input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => 
                    setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { 
                        ...prev.dateRange, 
                        start: prev.dateRange?.start || '',
                        end: e.target.value
                      } 
                    }))
                  }
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Claims Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Claim ID</span>
                  {sortField === 'id' && (
                    <span className="text-blue-500">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Patient</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  {sortField === 'amount' && (
                    <span className="text-blue-500">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('submissionDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Submitted</span>
                  {sortField === 'submissionDate' && (
                    <span className="text-blue-500">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedClaims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{claim.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{claim.patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={typeColors[claim.claimType]}>
                    {claim.claimType}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={statusColors[claim.status]}>
                    {claim.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900">
                      {claim.amount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(claim.submissionDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewClaim?.(claim)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {(claim.status === ClaimStatus.PENDING) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditClaim?.(claim)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedClaims.length === 0 && (
        <div className="px-6 py-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || activeFilterCount > 0
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first claim'
            }
          </p>
          {(searchTerm || activeFilterCount > 0) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClaimsList;