"use client";
import React from 'react';
import { Search, Bell, Moon, Menu, ChevronDown, Sun } from 'lucide-react';

const HeaderAdmin = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-16 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              ⌘K
            </div>
          </div>
          {/* Đổi Moon thành Sun nếu muốn chế độ sáng */}
          <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Đổi giao diện sáng/tối">
            <Sun className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 relative" aria-label="Thông báo">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 w-2 h-2 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            <div className="flex items-center space-x-1">

              <span className="font-medium text-gray-700">Admin</span>


              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;