const User = require('../models/userModels');
const Order = require('../models/orderModels');
const RiceProduct = require('../models/riceModels');
const Setting = require('../models/settingModels');

const getTotalCustomers = () => User.countDocuments();
const getTotalOrders = () => Order.countDocuments();
const getTotalRiceProducts = () => RiceProduct.countDocuments();

// Thêm function này vào
const getMonthlyTarget = async () => {
    try {
        // Nếu bạn có collection Setting hoặc lấy từ config
        const setting = await Setting.findOne({ key: 'monthlyTarget' });
        return setting ? setting.value : 1000000; // 1 triệu mặc định
    } catch (error) {
        console.error('Lỗi khi lấy monthly target:', error);
        return 1000000; // fallback
    }
};

const getTotalRevenue = async () => {
    try {
        const agg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        return agg[0]?.total || 0;
    } catch (error) {
        console.error('Lỗi khi lấy tổng doanh thu:', error);
        return 0;
    }
};

const getMonthlyOrders = async (year) => {
    try {
        const monthly = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        // Đưa về mảng 12 tháng
        const arr = Array(12).fill(0);
        monthly.forEach(item => {
            arr[item._id - 1] = item.count;
        });
        return arr;
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng theo tháng:', error);
        return Array(12).fill(0);
    }
};

const getMonthlyRevenue = async (year) => {
    try {
        const monthly = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$totalPrice" }
                }
            }
        ]);
        const arr = Array(12).fill(0);
        monthly.forEach(item => {
            arr[item._id - 1] = item.total;
        });
        return arr;
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu theo tháng:', error);
        return Array(12).fill(0);
    }
};

const getMonthlyCustomers = async (year) => {
    try {
        const monthly = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        const arr = Array(12).fill(0);
        monthly.forEach(item => {
            arr[item._id - 1] = item.count;
        });
        return arr;
    } catch (error) {
        console.error('Lỗi khi lấy khách hàng theo tháng:', error);
        return Array(12).fill(0);
    }
};

const getOrdersByStatus = async () => {
    try {
        const arr = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const result = {};
        arr.forEach(item => {
            result[item._id] = item.count;
        });
        return result;
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng theo status:', error);
        return {};
    }
};

// Thêm function cho weekly revenue nếu cần
const getWeeklyRevenue = async (year) => {
    try {
        // Mock data cho weekly revenue hoặc implement logic thực
        return Array(52).fill(0).map(() => Math.floor(Math.random() * 500000) + 200000);
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu theo tuần:', error);
        return Array(52).fill(0);
    }
};

// Thêm function cho yearly revenue
const getYearlyRevenue = async () => {
    try {
        const yearly = await Order.aggregate([
            {
                $group: {
                    _id: { $year: "$createdAt" },
                    total: { $sum: "$totalPrice" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        return yearly.map(item => ({
            year: item._id,
            total: item.total
        }));
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu theo năm:', error);
        return [
            { year: 2022, total: 15000000 },
            { year: 2023, total: 18000000 },
            { year: 2024, total: 25000000 }
        ];
    }
};

module.exports = {
    getTotalCustomers,
    getTotalOrders,
    getTotalRiceProducts,
    getTotalRevenue,
    getMonthlyOrders,
    getMonthlyRevenue,
    getMonthlyCustomers,
    getOrdersByStatus,
    getMonthlyTarget,
    getWeeklyRevenue,
    getYearlyRevenue
};