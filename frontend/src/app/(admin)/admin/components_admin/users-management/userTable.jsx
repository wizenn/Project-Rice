import React from 'react';
import { Edit, Trash2, Eye, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const formatDate = (dateString) => {
    if (!dateString) return 'Không có dữ liệu';
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getRoleBadge = (role) => {
    const normalizedRole = role?.toLowerCase() || 'user';
    const roleColors = {
        admin: 'bg-purple-100 text-purple-800',
        moderator: 'bg-blue-100 text-blue-800',
        user: 'bg-gray-100 text-gray-800'
    };
    const roleText = {
        admin: 'Quản trị viên',
        moderator: 'Điều hành viên',
        user: 'Người dùng'
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[normalizedRole] || 'bg-gray-100 text-gray-800'}`}>
            {roleText[normalizedRole] || role}
        </span>
    );
};

const getStatusBadge = (status) => {
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        suspended: 'bg-yellow-100 text-yellow-800'
    };
    const statusText = {
        active: 'Hoạt động',
        inactive: 'Không hoạt động',
        suspended: 'Tạm khóa'
    };
    const currentStatus = status || 'active';
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[currentStatus] || 'bg-gray-100 text-gray-800'}`}>
            {statusText[currentStatus] || currentStatus}
        </span>
    );
};

const UserTable = ({ filteredUsers, handleEditUser, handleDeleteUser }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Người dùng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Liên hệ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vai trò
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày tạo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                            <span className="text-white font-medium">
                                                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.name || 'Chưa có tên'}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {user.email || 'Chưa có email'}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {user.phone || 'Chưa có SĐT'}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="max-w-xs truncate">{user.address || 'Chưa có địa chỉ'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getRoleBadge(user.role)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(user.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(user.createdAt)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredUsers.length === 0 && (
            <div className="text-center py-12">
                <Eye className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Không có người dùng</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Không tìm thấy người dùng nào phù hợp với bộ lọc hoặc chưa có người dùng nào trong hệ thống.
                </p>
            </div>
        )}
    </div>
);

export default UserTable;