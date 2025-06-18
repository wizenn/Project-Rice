import { Search, Calendar } from 'lucide-react';

const orderStatuses = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
};

const OrderFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    openModal,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">Tất cả trạng thái</option>
                    {Object.entries(orderStatuses).map(([status, config]) => (
                        <option key={status} value={status}>{config.label}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                    onClick={() => openModal('history')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Calendar size={20} />
                    Lịch Sử Giao Dịch
                </button>
            </div>
        </div>
    );
};

export default OrderFilters;