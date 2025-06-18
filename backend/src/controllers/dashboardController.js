const User = require('../models/userModels');
const Order = require('../models/orderModels');
const RiceProduct = require('../models/riceModels');

// Hàm kiểm tra quyền admin (không phân biệt hoa/thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

exports.getDashboardStats = async (req, res) => {
    try {
        // Chỉ cho phép admin truy cập
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: "Bạn không có quyền truy cập Dashboard.",
                data: null
            });
        }

        // Tổng số khách hàng
        const totalCustomers = await User.countDocuments();

        // Tổng số đơn hàng
        const totalOrders = await Order.countDocuments();

        // Tổng số sản phẩm gạo
        const totalRiceProducts = await RiceProduct.countDocuments();

        // Tổng doanh thu
        const totalRevenueAgg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const revenue = totalRevenueAgg[0]?.total || 0;

        // Số đơn hàng theo tháng trong năm hiện tại
        const now = new Date();
        const year = now.getFullYear();
        const monthlyOrders = await Order.aggregate([
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
        const monthlyData = Array(12).fill(0);
        monthlyOrders.forEach(item => {
            monthlyData[item._id - 1] = item.count;
        });

        return res.json({
            EC: 0,
            customers: totalCustomers,
            orders: totalOrders,
            riceProducts: totalRiceProducts,
            revenue,
            monthlyOrders: monthlyData
        });
    } catch (error) {
        console.error('Lỗi server dashboard:', error);
        return res.status(500).json({ EC: -1, message: "Lỗi server dashboard" });
    }
};