import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const orderStatuses = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800', icon: Package },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const OrderStats = ({ orders }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Object.entries(orderStatuses).map(([status, config]) => {
                const count = orders.filter((order) => order.status === status).length;
                const Icon = config.icon;
                return (
                    <div key={status} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{config.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                            </div>
                            <Icon className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderStats;