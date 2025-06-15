import React from 'react';
import { Home, FileText, Users, BarChart3, Settings, CreditCard, ClipboardList, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Claims', icon: FileText, id: 'claims' },
  { name: 'Patients', icon: Users, id: 'patients' },
];


const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="bg-white border-r border-gray-200 w-64 h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">ClaimsCare</h1>
            <p className="text-xs text-gray-500">Insurance Management</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-4 space-y-1">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Main Menu
          </h2>
          {navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.name}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-blue-500' : 'text-gray-400')} />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">System Online</span>
          </div>
          <p className="text-xs text-green-600 mt-1">All services operational</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;