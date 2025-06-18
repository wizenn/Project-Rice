const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const RiceReview = require('../models/reviewModels');
const RiceProduct = require('../models/riceModels');

// Hàm kiểm tra quyền admin (không phân biệt hoa thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

// Hàm kiểm tra ObjectId hợp lệ
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Lấy tất cả review của 1 sản phẩm
exports.getReviewsByProduct = async (productId) => {
    try {
        if (!isValidObjectId(productId)) {
            return {
                EC: -1,
                message: "ID sản phẩm không hợp lệ.",
                reviews: []
            };
        }
        const reviews = await RiceReview.find({ product: productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        return {
            EC: 0,
            reviews
        };
    } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
        return {
            EC: -1,
            message: "Lỗi server khi lấy đánh giá.",
            reviews: []
        };
    }
};

// Lấy tất cả review
exports.getAllReviews = async () => {
    try {
        const reviews = await RiceReview.find()
            .populate('user', 'name')
            .populate('product', 'name')
            .sort({ createdAt: -1 });

        return {
            EC: 0,
            reviews
        };
    } catch (error) {
        console.error("Lỗi khi lấy tất cả đánh giá:", error);
        return {
            EC: -1,
            message: "Lỗi server khi lấy tất cả đánh giá.",
            reviews: []
        };
    }
};

// Tạo review mới
exports.createReview = async (reviewData) => {
    try {
        const { productId, userId, rating, comment } = reviewData;

        if (!productId || !userId || !rating) {
            return {
                EC: -1,
                message: "Thiếu thông tin đánh giá.",
                review: null
            };
        }
        if (!isValidObjectId(productId) || !isValidObjectId(userId)) {
            return {
                EC: -1,
                message: "ID không hợp lệ.",
                review: null
            };
        }

        // Kiểm tra người dùng đã đánh giá chưa (chỉ cho 1 đánh giá mỗi sản phẩm)
        const existing = await RiceReview.findOne({ product: productId, user: userId });
        if (existing) {
            return {
                EC: -1,
                message: "Bạn đã đánh giá sản phẩm này rồi.",
                review: null
            };
        }

        const newReview = await RiceReview.create({ product: productId, user: userId, rating, comment });
        return {
            EC: 0,
            message: "Đánh giá thành công",
            review: newReview
        };
    } catch (error) {
        console.error("Lỗi khi tạo đánh giá:", error);
        return {
            EC: -1,
            message: "Lỗi server khi tạo đánh giá.",
            review: null
        };
    }
};

// Xóa review (admin hoặc người tạo mới được xóa)
exports.deleteReview = async (reviewId, userId, userRole) => {
    try {
        if (!isValidObjectId(reviewId)) {
            return { EC: -1, message: "ID đánh giá không hợp lệ." };
        }
        const review = await RiceReview.findById(reviewId);
        if (!review) return { EC: -1, message: "Không tìm thấy đánh giá." };

        // Chỉ người viết hoặc admin (không phân biệt hoa thường) mới được xóa
        if (review.user.toString() !== userId && !isAdmin(userRole)) {
            return { EC: -1, message: "Không có quyền xóa đánh giá này." };
        }

        await RiceReview.findByIdAndDelete(reviewId);
        return { EC: 0, message: "Xóa đánh giá thành công." };
    } catch (error) {
        console.error("Lỗi khi xóa đánh giá:", error);
        return { EC: -1, message: "Lỗi server khi xóa đánh giá." };
    }
};

// Cập nhật review (admin hoặc người tạo mới được sửa)
exports.updateReview = async (reviewId, userId, userRole, updateData) => {
    try {
        if (!isValidObjectId(reviewId)) {
            return { EC: -1, message: "ID đánh giá không hợp lệ." };
        }
        const review = await RiceReview.findById(reviewId);
        if (!review) return { EC: -1, message: "Không tìm thấy đánh giá." };

        // Chỉ người viết hoặc admin (không phân biệt hoa thường) mới được cập nhật
        if (review.user.toString() !== userId && !isAdmin(userRole)) {
            return { EC: -1, message: "Không có quyền cập nhật đánh giá này." };
        }

        const updatedReview = await RiceReview.findByIdAndUpdate(reviewId, updateData, { new: true });
        return { EC: 0, message: "Cập nhật đánh giá thành công.", review: updatedReview };
    } catch (error) {
        console.error("Lỗi khi cập nhật đánh giá:", error);
        return { EC: -1, message: "Lỗi server khi cập nhật đánh giá." };
    }
};