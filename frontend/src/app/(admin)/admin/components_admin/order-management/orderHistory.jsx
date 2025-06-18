import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const orderStatuses = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800', icon: Package },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const orders = []; // Mock data; in production, fetch from parent or context

const OrderHistory = () => {
    const formatCurrency = (amount) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">Thống Kê Tổng Quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Tổng đơn hàng</p>
                        <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Doanh thu</p>
                        <p className="text-2xl font-bold text-green-900">
                            {formatCurrency(orders.reduce((sum, order) => sum + order.totalAmount, 0))}
                        </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium">Đơn hoàn thành</p>
                        <p className="text-2xl font-bold text-purple-900">
                            {orders.filter((order) => order.status === 'delivered').length}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch Sử Giao Dịch Chi Tiết</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.map((order) => {
                        const statusConfig = orderStatuses[order.status];
                        const StatusIcon = statusConfig.icon;
                        return (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${statusConfig.color}`}>
                                        <StatusIcon size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{order.id}</p>
                                        <p className="text-sm text-gray-500">{order.customerName}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.orderDate).toLocaleDateString('vi-VN', {
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
                                    <p className="font-medium text-gray-900">{formatCurrency(order.totalAmount)}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                        {statusConfig.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Doanh Thu Theo Tháng</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => (
                            <div key={index} className="font-medium text-gray-600">{day}</div>
                        ))}
                        {Array.from({ length: 30 }, (_, i) => {
                            const hasOrder = Math.random() > 0.7;
                            return (
                                <div
                                    key={i}
                                    className={`h-8 rounded ${hasOrder ? 'bg-blue-500' : 'bg-gray-200'} flex items-center justify-center text-xs ${hasOrder ? 'text-white' : 'text-gray-400'
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Ít hoạt động</span>
                        <div className="flex space-x-1">
                            <div className="h-3 w-3 bg-gray-200 rounded"></div>
                            <div className="h-3 w-3 bg-blue-300 rounded"></div>
                            <div className="h-3 w-3 bg-blue-500 rounded"></div>
                            <div className="h-3 w-3 bg-blue-700 rounded"></div>
                        </div>
                        <span>Nhiều hoạt động</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Top Khách Hàng</h4>
                    <div className="space-y-2">
                        {orders
                            .reduce((acc, order) => {
                                const existing = acc.find((item) => item.email === order.customerEmail);
                                if (existing) {
                                    existing.totalSpent += order.totalAmount;
                                    existing.orderCount += 1;
                                } else {
                                    acc.push({
                                        name: order.customerName,
                                        email: order.customerEmail,
                                        totalSpent: order.totalAmount,
                                        orderCount: 1,
                                    });
                                }
                                return acc;
                            }, [])
                            .sort((a, b) => b.totalSpent - a.totalSpent)
                            .slice(0, 5)
                            .map((customer, index) => (
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
                        {orders
                            .flatMap((order) => order.products)
                            .reduce((acc, product) => {
                                const existing = acc.find((item) => item.name === product.name);
                                if (existing) {
                                    existing.totalSold += product.quantity;
                                    existing.revenue += product.quantity * product.price;
                                } else {
                                    acc.push({
                                        name: product.name,
                                        totalSold: product.quantity,
                                        revenue: product.quantity * product.price,
                                    });
                                }
                                return acc;
                            }, [])
                            .sort((a, b) => b.totalSold - a.totalSold)
                            .slice(0, 5)
                            .map((product, index) => (
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
        </div>
    );
};

export default OrderHistory;