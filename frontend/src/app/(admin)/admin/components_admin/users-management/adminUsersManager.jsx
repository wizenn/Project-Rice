import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '@/configs/endpoint';
import StatsCards from './statsCards';
import UserTable from './userTable';
import UserModal from './userModal';
import Search from './search';
import { UserPlus } from 'lucide-react';

const defaultEditForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user',
    status: 'active'
};

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
    const [editForm, setEditForm] = useState(defaultEditForm);

    // Lấy danh sách user từ API
    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Vui lòng đăng nhập lại');
                setLoading(false);
                return;
            }
            const response = await axios.get(`${API}/users/allUsers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.EC === 0) {
                const usersWithStatus = (response.data.data || []).map(user => ({
                    ...user,
                    status: user.status || 'active',
                    address: user.address || '',
                    phone: user.phone || ''
                }));
                setUsers(usersWithStatus);
            } else {
                setUsers([]);
            }
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Lọc danh sách user theo search/filter
    useEffect(() => {
        let filtered = users;
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone?.includes(searchTerm) ||
                user.address?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterStatus !== 'all') {
            filtered = filtered.filter(user => user.status === filterStatus);
        }
        if (filterRole !== 'all') {
            filtered = filtered.filter(user =>
                user.role?.toLowerCase() === filterRole.toLowerCase()
            );
        }
        setFilteredUsers(filtered);
    }, [searchTerm, filterStatus, filterRole, users]);

    // Xóa user
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(
                    `${API}/users/deleteUsers/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.EC === 0) {
                    const updatedUsers = users.filter(user => user._id !== userId);
                    setUsers(updatedUsers);
                    alert('Xóa người dùng thành công!');
                } else {
                    alert('Lỗi xóa người dùng: ' + (response.data.message || response.data.EM));
                }
            } catch (error) {
                alert('Có lỗi xảy ra khi xóa người dùng!');
            }
        }
    };

    // Sửa user
    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API}/users/updateUsers/${selectedUser._id}`,
                editForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.EC === 0) {
                const updatedUsers = users.map(user =>
                    user._id === selectedUser._id
                        ? { ...user, ...editForm }
                        : user
                );
                setUsers(updatedUsers);
                setShowEditModal(false);
                setSelectedUser(null);
                alert('Cập nhật người dùng thành công!');
            } else {
                alert('Lỗi cập nhật: ' + (response.data.message || response.data.EM));
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi cập nhật người dùng!');
        }
    };

    // Thêm mới user
    const handleCreateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API}/users/registerUsers`,
                editForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.EC === 0) {
                // Thêm thành công -> reload list
                await fetchUsers();
                setShowAddModal(false);
                alert('Thêm người dùng thành công!');
            } else {
                alert('Lỗi thêm người dùng: ' + (response.data.message || response.data.EM));
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi thêm người dùng!');
        }
    };

    return (
        <div className="max-w-10xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Tổng số: {users.length} người dùng | Đang hiển thị: {filteredUsers.length}
                        </p>
                    </div>
                    <button
                        onClick={() => { setEditForm(defaultEditForm); setShowAddModal(true); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" />
                        Thêm người dùng
                    </button>
                </div>

                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                />
            </div>
            <StatsCards users={users} />
            <UserTable
                filteredUsers={filteredUsers}
                handleEditUser={user => {
                    setSelectedUser(user);
                    setEditForm({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        role: user.role?.toLowerCase() || 'user',
                        status: user.status || 'active'
                    });
                    setShowEditModal(true);
                }}
                handleDeleteUser={handleDeleteUser}
            />
            {/* Edit Modal */}
            <UserModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                form={editForm}
                setForm={setEditForm}
                onSubmit={handleUpdateUser}
                type="edit"
            />
            {/* Add Modal */}
            <UserModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                form={editForm}
                setForm={setEditForm}
                onSubmit={handleCreateUser}
                type="add"
            />
        </div>
    );
};

export default AdminUsersManager;