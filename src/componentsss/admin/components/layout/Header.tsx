import React from 'react';
import { Bell, User, Search, Menu, LogOut, Settings as SettingsIcon } from 'lucide-react';
import Button from '@mui/material/Button';
import { getUser } from '../../../../hooks/LocalStorageUser';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search claims, patients, or providers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button variant="outline" size='sm'>
              <Bell className="w-5 h-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>

          {/* Settings */}
          <Button variant="outline" size="sm">
            <SettingsIcon className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{getUser().name}</p>
                <p className="text-xs text-gray-500">Claims Administrator</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <Button variant="outline" size="sm">
            <LogOut onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }} className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;