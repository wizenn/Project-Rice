const report_services = require('../services/reportServices');

// Hàm kiểm tra quyền admin (không phân biệt hoa/thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

// Tổng quan doanh thu, đơn hàng, tồn kho
exports.getOverviewStats = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xem báo cáo tổng quan.", data: null });
        }
        const result = await report_services.getOverviewStats();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy thống kê tổng quan:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi thống kê tổng quan." });
    }
};

// Thống kê doanh thu theo ngày/tuần/tháng
exports.getRevenueByPeriod = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xem báo cáo doanh thu.", data: null });
        }
        const { period } = req.query; // 'day', 'week', 'month'
        const result = await report_services.getRevenueByPeriod(period);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi thống kê doanh thu theo thời gian:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi thống kê doanh thu." });
    }
};

// Top sản phẩm bán chạy
exports.getTopSellingProducts = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xem top sản phẩm bán chạy.", data: null });
        }
        const limit = parseInt(req.query.limit) || 5;
        const result = await report_services.getTopSellingProducts(limit);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy top sản phẩm bán chạy:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi thống kê sản phẩm bán chạy." });
    }
};