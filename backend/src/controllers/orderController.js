const order_services = require('../services/orderServices');

// Hàm kiểm tra quyền admin (không phân biệt hoa/thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

// Tạo đơn hàng từ giỏ hàng
exports.createOrder = async (req, res) => {
    try {
        let userId = req.user?.userID;
        // Admin được phép tạo đơn cho người khác
        if (isAdmin(req.user?.role) && req.body.userId) {
            userId = req.body.userId;
        }
        const { cartItems, shippingInfo, paymentMethod } = req.body;

        if (!cartItems || cartItems.length === 0 || !shippingInfo || !paymentMethod) {
            return res.status(400).json({ EC: -1, message: "Thiếu thông tin đơn hàng." });
        }

        const orderData = {
            userId,
            cartItems,
            shippingInfo,
            paymentMethod,
            status: 'PENDING'
        };

        const result = await order_services.createOrder(orderData);
        return res.status(201).json(result);
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi tạo đơn hàng." });
    }
};

// Cập nhật trạng thái đơn hàng (chỉ admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền cập nhật trạng thái đơn hàng." });
        }
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipping', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status?.toLowerCase())) {
            return res.status(400).json({ EC: -1, message: "Trạng thái đơn hàng không hợp lệ." });
        }

        const result = await order_services.updateOrderStatus(id, status);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi cập nhật trạng thái đơn hàng." });
    }
};

// Lấy lịch sử đơn hàng theo người dùng (user hoặc admin xem của chính mình)
exports.getOrderHistoryByUser = async (req, res) => {
    try {
        const userId = req.user?.userID;
        const result = await order_services.getOrderHistoryByUser(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi lấy lịch sử đơn hàng." });
    }
};

// Lấy tất cả đơn hàng (chỉ admin)
exports.getAllOrders = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xem tất cả đơn hàng." });
        }
        const result = await order_services.getAllOrders();
        return res.status(result.EC === 0 ? 200 : 400).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy tất cả đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi lấy tất cả đơn hàng." });
    }
};

// Cập nhật đơn hàng (chỉ admin)
exports.updateOrder = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền cập nhật đơn hàng." });
        }
        const { id } = req.params;
        const updateData = req.body;
        const order = await order_services.findByIdAndUpdate(id, updateData, { new: true });
        if (!order) return res.status(404).json({ EC: -1, message: "Không tìm thấy đơn hàng" });
        return res.json({ EC: 0, order });
    } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi cập nhật đơn hàng." });
    }
};

// Xóa đơn hàng (chỉ admin)
exports.deleteOrder = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xóa đơn hàng." });
        }
        const { id } = req.params;
        const result = await order_services.deleteOrder(id);
        return res.status(result.EC === 0 ? 200 : 400).json(result);
    } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi xóa đơn hàng." });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await order_services.findById(id);
        if (!order) return res.status(404).json({ EC: -1, message: "Không tìm thấy đơn hàng" });
        // Quyền xem đơn hàng
        if (!isAdmin(req.user?.role) && String(order.user?._id) !== String(req.user?.userID)) {
            return res.status(403).json({ EC: -1, message: "Bạn không có quyền xem đơn hàng này." });
        }
        return res.json({ EC: 0, order });
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi lấy chi tiết đơn hàng." });
    }
};