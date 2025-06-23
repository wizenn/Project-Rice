import React from 'react';

const StatsCards = ({ users }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-gray-600">Tổng người dùng</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-green-600">
                {users.filter(u => (u.status || 'active') === 'active').length}
            </div>
            <div className="text-gray-600">Đang hoạt động</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role?.toLowerCase() === 'admin').length}
            </div>
            <div className="text-gray-600">Quản trị viên</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-red-600">
                {users.filter(u => (u.status || 'active') === 'inactive').length}
            </div>
            <div className="text-gray-600">Không hoạt động</div>
        </div>
    </div>
);

export default StatsCards;