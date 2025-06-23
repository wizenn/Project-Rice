import API from '@/configs/endpoint';
import axios from 'axios';
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// Status config
const orderStatuses = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800', icon: Package },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

function getMonthString(dateStr) {
    const d = new Date(dateStr);
    // Trả về dạng "2025-06"
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const AdminHistoryManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrdersHistory();
    }, []);

    const fetchOrdersHistory = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
                setLoading(false);
                return;
            }
            const res = await axios.get(`${API}/orders/history`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.EC === 0 && Array.isArray(res.data.orders)) {
                setOrders(res.data.orders);
            } else {
                setOrders([]);
            }
        } catch (err) {
            setError('Lỗi lấy đơn hàng: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // === Tính toán cho biểu đồ doanh thu theo tháng ===
    const currentYear = new Date().getFullYear();
    const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const monthStr = `${currentYear}-${String(month).padStart(2, '0')}`;
        const sum = orders
            .filter(
                (order) =>
                    order.createdAt &&
                    getMonthString(order.createdAt) === monthStr
            )
            .reduce((s, order) => s + (order.totalPrice || 0), 0);
        return { month, sum };
    });

    // === Top khách hàng theo tổng chi tiêu ===
    const customerMap = {};
    orders.forEach(order => {
        // Ưu tiên email, nếu không có thì lấy userID
        const key = order.user || order.shippingAddress?.street || 'unknown';
        if (!customerMap[key]) {
            customerMap[key] = {
                name: order.shippingAddress?.street || "Khách lạ",
                totalSpent: 0,
                orderCount: 0
            };
        }
        customerMap[key].totalSpent += order.totalPrice || 0;
        customerMap[key].orderCount += 1;
    });
    const topCustomers = Object.values(customerMap)
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);

    // === Top sản phẩm bán chạy ===
    const productMap = {};
    orders.forEach(order => {
        (order.orderItems || []).forEach(item => {
            if (!productMap[item.product]) {
                productMap[item.product] = {
                    name: item.product,
                    totalSold: 0,
                    revenue: 0
                };
            }
            productMap[item.product].totalSold += item.quantity;
            productMap[item.product].revenue += (item.quantity * item.price);
        });
    });
    const topProducts = Object.values(productMap)
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 5);

    if (loading) return <div className="p-8 text-center text-blue-600">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="space-y-7">
            {/* Thống kê tổng quan */}
            <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">Thống Kê Tổng Quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-blue-50 p-5 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Tổng đơn hàng</p>
                        <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Doanh thu</p>
                        <p className="text-2xl font-bold text-green-900">
                            {formatCurrency(orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0))}
                        </p>
                    </div>
                    <div className="bg-orange-50 p-5 rounded-lg">
                        <p className="text-sm text-orange-600 font-medium">Tổng phí ship</p>
                        <p className="text-2xl font-bold text-orange-900">
                            {formatCurrency(orders.reduce((sum, order) => sum + (order.shippingPrice || 0), 0))}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Tổng giá trị hàng</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(orders.reduce((sum, order) => sum + (order.itemsPrice || 0), 0))}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Top Khách Hàng</h4>
                    <div className="space-y-2">
                        {topCustomers.map((customer, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{customer.name}</p>
                                    <p className="text-sm text-gray-500">{customer.orderCount} đơn hàng</p>
                                </div>
                                <p className="font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sản Phẩm Bán Chạy</h4>
                    <div className="space-y-2">
                        {topProducts.map((product, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">Đã bán: {product.totalSold}</p>
                                </div>
                                <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Biểu đồ doanh thu theo tháng */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Doanh Thu Theo Tháng ({currentYear})</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-12 gap-2">
                        {revenueByMonth.map((item, idx) => (
                            <div key={item.month} className="flex flex-col items-center">
                                <div
                                    className={`w-6 rounded-t-md ${item.sum > 0 ? 'bg-green-500' : 'bg-gray-300'}`}
                                    style={{ height: Math.max(10, Math.min(80, item.sum / 10000)) }}
                                    title={formatCurrency(item.sum)}
                                />
                                <span className="mt-1 text-xs text-gray-600">{item.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                        <span>Mỗi cột thể hiện tổng doanh thu tháng, xem tooltip để biết doanh thu chi tiết</span>
                    </div>
                </div>
            </div>





            {/* Lịch sử đơn hàng */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch Sử Giao Dịch Chi Tiết</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.map((order) => {
                        const statusConfig = orderStatuses[order.status] || orderStatuses.pending;
                        const StatusIcon = statusConfig.icon;
                        return (
                            <div
                                key={order._id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${statusConfig.color}`}>
                                        <StatusIcon size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{order._id}</p>
                                        <p className="text-sm text-gray-500">
                                            {order.shippingAddress?.street}, {order.shippingAddress?.city}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">
                                        Tổng: {formatCurrency(order.totalPrice || 0)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Hàng: {formatCurrency(order.itemsPrice || 0)}<br />
                                        Ship: {formatCurrency(order.shippingPrice || 0)}
                                        {order.taxPrice ? <><br />Thuế: {formatCurrency(order.taxPrice)}</> : null}
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                        {statusConfig.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminHistoryManagement;