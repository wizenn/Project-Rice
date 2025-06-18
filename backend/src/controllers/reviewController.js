const Review = require('../models/reviewModels');

// Hàm kiểm tra quyền admin (không phân biệt hoa/thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

// Thêm đánh giá sản phẩm
exports.createReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        const userId = req.user?.userID;
        const ratingNumber = Number(rating);

        if (!product || !Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
            return res.status(400).json({ EC: -1, message: "Thiếu thông tin đánh giá." });
        }
        // Kiểm tra người dùng đã đánh giá chưa (chỉ cho 1 đánh giá mỗi sản phẩm)
        const existing = await Review.findOne({ product, user: userId });
        if (existing) {
            return res.status(400).json({ EC: -1, message: "Bạn đã đánh giá sản phẩm này rồi." });
        }

        const newReview = await Review.create({ product, user: userId, rating, comment });
        return res.status(201).json({ EC: 0, message: "Đánh giá thành công", review: newReview });
    } catch (error) {
        console.error("Lỗi khi tạo đánh giá:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi tạo đánh giá." });
    }
};

// Lấy danh sách đánh giá theo sản phẩm
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json({ EC: 0, reviews });
    } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi lấy đánh giá." });
    }
};

// Xóa đánh giá - chỉ cho phép admin hoặc chính user
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user?.userID;
        const userRole = req.user?.role;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ EC: -1, message: "Không tìm thấy đánh giá." });

        // Chỉ người viết hoặc admin mới được xóa (không phân biệt hoa/thường)
        if (review.user.toString() !== userId && !isAdmin(userRole)) {
            return res.status(403).json({ EC: -1, message: "Không có quyền xóa đánh giá này." });
        }

        await Review.findByIdAndDelete(reviewId);
        return res.status(200).json({ EC: 0, message: "Xóa đánh giá thành công." });
    } catch (error) {
        console.error("Lỗi khi xóa đánh giá:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi xóa đánh giá." });
    }
};

// Cập nhật đánh giá - chỉ cho phép người viết hoặc admin
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user?.userID;
        const userRole = req.user?.role;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ EC: -1, message: "Không tìm thấy đánh giá." });

        // Chỉ người viết hoặc admin mới được cập nhật (không phân biệt hoa/thường)
        if (review.user.toString() !== userId && !isAdmin(userRole)) {
            return res.status(403).json({ EC: -1, message: "Không có quyền cập nhật đánh giá này." });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        const updatedReview = await review.save();
        return res.status(200).json({ EC: 0, message: "Cập nhật đánh giá thành công.", review: updatedReview });
    }
    catch (error) {
        console.error("Lỗi khi cập nhật đánh giá:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi cập nhật đánh giá." });
    }
}

// Lấy tất cả đánh giá (dành cho admin)
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name')
            .populate('product', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json({ EC: 0, reviews });
    } catch (error) {
        console.error("Lỗi khi lấy tất cả đánh giá:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi lấy tất cả đánh giá." });
    }
}