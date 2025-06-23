const dashboardService = require('../services/dashboardServices');
const Order = require('../models/orderModels');
const User = require('../models/userModels');

exports.getDashboardStats = async (req, res) => {
    try {
        const year = new Date().getFullYear();

        const [
            totalCustomers,
            totalOrders,
            totalRiceProducts,
            totalRevenue,
            monthlyOrders,
            monthlyRevenue,
            monthlyCustomers,
            ordersByStatus,
            monthlyTarget,
            ordersList,
            customersList,
            weeklyRevenue,
            yearlyRevenue
        ] = await Promise.all([
            dashboardService.getTotalCustomers(),
            dashboardService.getTotalOrders(),
            dashboardService.getTotalRiceProducts(),
            dashboardService.getTotalRevenue(),
            dashboardService.getMonthlyOrders(year),
            dashboardService.getMonthlyRevenue(year),
            dashboardService.getMonthlyCustomers(year),
            dashboardService.getOrdersByStatus(),
            dashboardService.getMonthlyTarget(),
            Order.find({}).select('createdAt totalPrice status customerId').lean(),
            User.find({}).select('createdAt name email role status').lean(),
            dashboardService.getWeeklyRevenue(year),
            dashboardService.getYearlyRevenue()
        ]);

        // Format response theo cấu trúc mà frontend expect
        return res.json({
            EC: 0,
            message: 'Lấy thống kê dashboard thành công',

            // Stats tổng quan
            customers: totalCustomers,
            orders: totalOrders,
            riceProducts: totalRiceProducts,
            revenue: totalRevenue,

            // Dữ liệu theo tháng/tuần/năm
            monthlyOrders,
            monthlyRevenue,
            monthlyCustomers,
            weeklyRevenue,
            yearlyRevenue,

            // Target và status
            monthlyTarget,
            ordersByStatus,

            // Danh sách raw data cho frontend xử lý
            ordersList,
            customersList
        });
    } catch (error) {
        console.error('Lỗi server dashboard:', error);
        return res.status(500).json({
            EC: -1,
            message: "Lỗi server dashboard",
            data: null
        });
    }
};