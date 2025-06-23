import React, { useCallback } from 'react';
import { Eye, Edit, Trash2, Clock, Package, Truck, CheckCircle, XCircle, AlertCircle, Printer } from 'lucide-react';
import axios from 'axios';
import API from '@/configs/endpoint';
import { useInvoicePrint } from './orderPrint';

const orderStatuses = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800', icon: Package },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const OrderTable = ({ orders, searchTerm, statusFilter, dateFilter, openModal, fetchOrders, token }) => {
    const { printInvoice } = useInvoicePrint();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Hàm in hóa đơn sử dụng hook
    const handlePrint = useCallback(
        (() => {
            let timeout;
            return async (order) => {
                if (timeout) return; //

                timeout = setTimeout(() => {
                    timeout = null;
                }, 2000);

                const result = await printInvoice(order.id, token);
                if (!result.success) {
                    alert(result.message);
                }
            };
        })(),
        [printInvoice, token]
    );


    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(
                `${API}/orders/updateStatus/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.EC === 0) {
                await fetchOrders();
            } else {
                alert(res.data.message || 'Cập nhật trạng thái thất bại');
            }
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            try {
                const res = await axios.delete(`${API}/orders/deleteOrder/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.EC === 0) {
                    await fetchOrders();
                } else {
                    alert(res.data.message || 'Xóa đơn hàng thất bại');
                }
            } catch (error) {
                console.error('Lỗi xóa đơn hàng:', error);
            }
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesDate = !dateFilter || order.orderDate === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã Đơn Hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Khách Hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tổng Tiền
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng Thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày Đặt
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hành Động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map((order) => {
                            const statusConfig = orderStatuses[order.status];
                            const StatusIcon = statusConfig.icon;

                            return (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(order.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} border-0 focus:ring-2 focus:ring-blue-500`}
                                        >
                                            {Object.entries(orderStatuses).map(([status, config]) => (
                                                <option key={status} value={status}>{config.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openModal('view', order)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal('edit', order)}
                                                className="text-green-600 hover:text-green-900 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handlePrint(order)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                title="In hóa đơn"
                                            >
                                                <Printer size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không có đơn hàng</h3>
                    <p className="mt-1 text-sm text-gray-500">Không tìm thấy đơn hàng nào phù hợp với bộ lọc.</p>
                </div>
            )}
        </div>
    );
};

export default OrderTable;