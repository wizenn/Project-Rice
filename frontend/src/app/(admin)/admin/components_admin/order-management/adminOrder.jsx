import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import API from '@/configs/endpoint';
import OrderStats from './orders';
import OrderFilters from './orderFilters';
import OrderTable from './orderTable';
import OrderModal from './orderModal';


const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API}/orders/allOrders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.EC === 0 && Array.isArray(res.data.orders)) {
                setOrders(res.data.orders);
            }
        } catch (err) {
            console.error('Lỗi lấy đơn hàng:', err);
        }
    };

    const handleOpenModal = (type, order = null) => {
        setModalType(type);
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-10xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đơn Hàng</h1>
                            <p className="text-gray-600 mt-1">Quản lý tất cả đơn hàng trong hệ thống</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal('create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus size={20} />
                            Tạo Đơn Hàng
                        </button>
                    </div>
                </div>

                <OrderStats orders={orders} />
                <OrderFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    openModal={handleOpenModal}
                />
                <OrderTable
                    orders={orders}
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    dateFilter={dateFilter}
                    openModal={handleOpenModal}
                    fetchOrders={fetchOrders}
                    token={token}
                />
                <OrderModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalType={modalType}
                    selectedOrder={selectedOrder}
                    fetchOrders={fetchOrders}
                    token={token}
                />
            </div>
        </div>
    );
};

export default AdminOrderManagement;