import React, { useState, useEffect } from 'react';
import { User, Edit, Trash2, Eye, Filter, Search, Calendar, UserPlus, Mail, Phone, MapPin } from 'lucide-react';

const AdminUsersManager = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'user',
        status: 'active'
    });

    // Mock data - thay thế bằng API call thực tế
    useEffect(() => {
        fetchUsers();
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const fetchUsers = async () => {
        try {
            // Thay thế bằng API endpoint thực tế
            // const response = await fetch(`${API}/users/getAllUsers`);
            // const data = await response.json();
            // setUsers(data.users || []);

            // Mock data for demonstration
            const mockUsers = [
                {
                    _id: '1',
                    name: 'Nguyễn Văn An',
                    email: 'an@example.com',
                    phone: '0123456789',
                    address: 'Hà Nội, Việt Nam',
                    role: 'admin',
                    status: 'active',
                    createdAt: '2024-01-15T10:30:00Z',
                    lastLogin: '2024-06-15T08:00:00Z'
                },
                {
                    _id: '2',
                    name: 'Trần Thị Bình',
                    email: 'binh@example.com',
                    phone: '0987654321',
                    address: 'Hồ Chí Minh, Việt Nam',
                    role: 'user',
                    status: 'active',
                    createdAt: '2024-02-20T14:15:00Z',
                    lastLogin: '2024-06-14T16:30:00Z'
                },
                {
                    _id: '3',
                    name: 'Lê Hoàng Công',
                    email: 'cong@example.com',
                    phone: '0369852147',
                    address: 'Đà Nẵng, Việt Nam',
                    role: 'moderator',
                    status: 'inactive',
                    createdAt: '2024-03-10T09:45:00Z',
                    lastLogin: '2024-06-10T12:00:00Z'
                },
                {
                    _id: '4',
                    name: 'Phạm Thị Dung',
                    email: 'dung@example.com',
                    phone: '0147258369',
                    address: 'Cần Thơ, Việt Nam',
                    role: 'user',
                    status: 'active',
                    createdAt: '2024-04-05T11:20:00Z',
                    lastLogin: '2024-06-15T09:15:00Z'
                }
            ];
            setUsers(mockUsers);
        } catch (error) {
            console.error('Lỗi lấy tất cả người dùng: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm) ||
                user.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(user => user.status === filterStatus);
        }

        if (filterRole !== 'all') {
            filtered = filtered.filter(user => user.role === filterRole);
        }

        setFilteredUsers(filtered);
    }, [searchTerm, filterStatus, filterRole, users]);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status badge
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

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                {statusText[status]}
            </span>
        );
    };

    // Get role badge
    const getRoleBadge = (role) => {
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
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[role]}`}>
                {roleText[role]}
            </span>
        );
    };

    // Handle add user
    const handleAddUser = () => {
        setEditForm({
            name: '',
            email: '',
            phone: '',
            address: '',
            role: 'user',
            status: 'active'
        });
        setShowAddModal(true);
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            status: user.status
        });
        setShowEditModal(true);
    };

    // Handle update user
    const handleUpdateUser = async () => {
        try {
            // API call để update user
            const updatedUsers = users.map(user =>
                user._id === selectedUser._id
                    ? { ...user, ...editForm }
                    : user
            );
            setUsers(updatedUsers);
            setShowEditModal(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle create user
    const handleCreateUser = async () => {
        try {
            // API call để create user
            const newUser = {
                _id: Date.now().toString(),
                ...editForm,
                createdAt: new Date().toISOString(),
                lastLogin: null
            };
            setUsers([...users, newUser]);
            setShowAddModal(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Handle delete user
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                // API call để delete user
                const updatedUsers = users.filter(user => user._id !== userId);
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Thêm người dùng
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc địa chỉ..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="suspended">Tạm khóa</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="admin">Quản trị viên</option>
                            <option value="moderator">Điều hành viên</option>
                            <option value="user">Người dùng</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                    <div className="text-gray-600">Tổng người dùng</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-green-600">
                        {users.filter(u => u.status === 'active').length}
                    </div>
                    <div className="text-gray-600">Đang hoạt động</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-purple-600">
                        {users.filter(u => u.role === 'admin').length}
                    </div>
                    <div className="text-gray-600">Quản trị viên</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-red-600">
                        {users.filter(u => u.status === 'inactive').length}
                    </div>
                    <div className="text-gray-600">Không hoạt động</div>
                </div>
            </div>

            {/* Users Table */}
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
                                    Đăng nhập cuối
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 flex items-center gap-1">
                                            <Phone className="w-3 h-3" />
                                            {user.phone}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="max-w-xs truncate">{user.address}</span>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.lastLogin ? formatDate(user.lastLogin) : 'Chưa đăng nhập'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
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
                            Không tìm thấy người dùng nào phù hợp với bộ lọc.
                        </p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa người dùng</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    placeholder="Nhập tên người dùng..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    placeholder="Nhập email..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="2"
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                    placeholder="Nhập địa chỉ..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vai trò
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                >
                                    <option value="user">Người dùng</option>
                                    <option value="moderator">Điều hành viên</option>
                                    <option value="admin">Quản trị viên</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trạng thái
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="suspended">Tạm khóa</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Thêm người dùng mới</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    placeholder="Nhập tên người dùng..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    placeholder="Nhập email..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="2"
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                    placeholder="Nhập địa chỉ..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vai trò
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                >
                                    <option value="user">Người dùng</option>
                                    <option value="moderator">Điều hành viên</option>
                                    <option value="admin">Quản trị viên</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trạng thái
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="suspended">Tạm khóa</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateUser}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersManager;