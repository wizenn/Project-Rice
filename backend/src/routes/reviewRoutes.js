const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authUser = require('../middlewares/authUsers');

// Lấy tất cả đánh giá
router.get('/getAllReviews', reviewController.getAllReviews);



// Thêm đánh giá (nên yêu cầu đăng nhập)
router.post('/createReview', authUser, reviewController.createReview);

// Xóa đánh giá (nên yêu cầu đăng nhập)
router.delete('/deleteReview/:reviewId', authUser, reviewController.deleteReview);

// Cập nhật đánh giá (nên yêu cầu đăng nhập)
router.put('/updateReview/:reviewId', authUser, reviewController.updateReview);

// Lấy đánh giá theo sản phẩm
router.get('/getReviewsByProduct/:productId', reviewController.getReviewsByProduct);

module.exports = router;