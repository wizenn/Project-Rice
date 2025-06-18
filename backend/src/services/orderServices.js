const mongoose = require('mongoose');
const Order = require('../models/orderModels');

// Kiểm tra ObjectId hợp lệ
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Tạo đơn hàng
exports.createOrder = async (orderData) => {
    try {
        const { userId, cartItems, shippingInfo, paymentMethod, status } = orderData;

        if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
            return { EC: -1, message: "Thiếu thông tin đặt hàng." };
        }
        if (!isValidObjectId(userId)) {
            return { EC: -1, message: "ID người dùng không hợp lệ." };
        }

        const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const taxPrice = 0;
        const shippingPrice = 0;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        const orderItems = cartItems.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        const order = new Order({
            user: userId,
            orderItems,
            shippingAddress: shippingInfo,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            status: status?.toLowerCase() || 'pending'
        });

        await order.save();
        return { EC: 0, order };
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return { EC: -1, message: "Lỗi server khi tạo đơn hàng." };
    }
};

// Cập nhật đơn hàng (full update)
exports.findByIdAndUpdate = async (id, updateData) => {
    try {
        if (!isValidObjectId(id)) {
            return null;
        }
        const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
        return order;
    } catch (error) {
        console.error("Lỗi khi update đơn hàng:", error);
        return null;
    }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (id, status) => {
    try {
        if (!isValidObjectId(id)) {
            return { EC: -1, message: "ID đơn hàng không hợp lệ." };
        }
        const order = await Order.findByIdAndUpdate(id, { status: status?.toLowerCase() }, { new: true });
        if (!order) return { EC: -1, message: "Không tìm thấy đơn hàng" };
        return { EC: 0, order };
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
        return { EC: -1, message: "Lỗi server khi cập nhật trạng thái đơn hàng." };
    }
};

// Lấy lịch sử đơn hàng theo user
exports.getOrderHistoryByUser = async (userId) => {
    try {
        if (!isValidObjectId(userId)) {
            return { EC: -1, message: "ID người dùng không hợp lệ.", orders: [] };
        }
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return { EC: 0, orders };
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
        return { EC: -1, message: "Lỗi server khi lấy lịch sử đơn hàng.", orders: [] };
    }
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async () => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email phone')
            .populate('orderItems.product', 'name');

        const mappedOrders = orders.map(order => ({
            id: order._id,
            customerName: order.user?.name || '',
            customerEmail: order.user?.email || '',
            customerPhone: order.user?.phone || '',
            products: order.orderItems.map(item => ({
                name: item.product?.name || '',
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: order.totalPrice,
            status: order.status,
            orderDate: order.createdAt,
            shippingAddress: order.shippingAddress
                ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`
                : '',
            paymentMethod: order.paymentMethod,
            notes: order.notes
        }));

        return { EC: 0, orders: mappedOrders };
    } catch (error) {
        console.error("Lỗi khi lấy tất cả đơn hàng:", error);
        return { EC: -1, message: "Lỗi server khi lấy tất cả đơn hàng.", orders: [] };
    }
};

// Xóa đơn hàng (admin hoặc chính chủ)
exports.deleteOrder = async (id) => {
    try {
        if (!isValidObjectId(id)) {
            return { EC: -1, message: "ID đơn hàng không hợp lệ." };
        }
        const deleted = await Order.findByIdAndDelete(id);
        if (deleted) {
            return { EC: 0, message: 'Xóa đơn hàng thành công' };
        } else {
            return { EC: -1, message: "Không tìm thấy đơn hàng để xóa." };
        }
    } catch (error) {
        console.error('Lỗi trong deleteOrder:', error);
        return { EC: -1, message: 'Lỗi khi xóa đơn hàng', error: error.message };
    }
};

// Lấy đơn hàng theo ID
exports.findById = async (id) => {
    try {
        if (!isValidObjectId(id)) {
            return null;
        }
        const order = await Order.findById(id)
            .populate('user', 'name email phone')
            .populate('orderItems.product', 'name');
        if (!order) return null;
        return order;
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng theo ID:", error);
        return null;
    }
};