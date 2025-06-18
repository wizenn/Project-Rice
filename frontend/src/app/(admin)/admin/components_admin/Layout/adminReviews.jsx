import React, { useState, useEffect } from 'react';
import { Star, Edit, Trash2, Eye, Filter, Search, Calendar } from 'lucide-react';
import API from '@/configs/endpoint';

const AdminReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ rating: '', comment: '' });

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    fetchReviews();
    setTimeout(() => {

      setLoading(false);
    }, 10);
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API}/reviews/getAllReviews`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Lỗi lấy tất cả đánh giá: ', error);
    } finally {
      setLoading(false)

    }
  };


  useEffect(() => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.product && review.product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    setFilteredReviews(filtered);
  }, [searchTerm, filterRating, reviews]);

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle edit review
  const handleEditReview = (review) => {
    setSelectedReview(review);
    setEditForm({ rating: review.rating, comment: review.comment });
    setShowEditModal(true);
  };

  // Handle update review
  const handleUpdateReview = async () => {
    try {
      // API call để update review
      const updatedReviews = reviews.map(review =>
        review._id === selectedReview._id
          ? { ...review, rating: parseInt(editForm.rating), comment: editForm.comment }
          : review
      );
      setReviews(updatedReviews);
      setShowEditModal(false);
      setSelectedReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      try {
        // API call để delete review
        const updatedReviews = reviews.filter(review => review._id !== reviewId);
        setReviews(updatedReviews);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-11xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quản lý đánh giá sản phẩm</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng, sản phẩm hoặc nội dung..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
          <div className="text-gray-600">Tổng đánh giá</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">
            {reviews.filter(r => r.rating >= 4).length}
          </div>
          <div className="text-gray-600">Đánh giá tích cực</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {reviews.filter(r => r.rating === 3).length}
          </div>
          <div className="text-gray-600">Đánh giá trung bình</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-red-600">
            {reviews.filter(r => r.rating <= 2).length}
          </div>
          <div className="text-gray-600">Đánh giá tiêu cực</div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bình luận
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {review.user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {review.product ? review.product.name : 'Không xác định'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate">
                      {review.comment || 'Không có bình luận'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(review.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Eye className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không có đánh giá</h3>
            <p className="mt-1 text-sm text-gray-500">
              Không tìm thấy đánh giá nào phù hợp với bộ lọc.
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Chỉnh sửa đánh giá</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá (1-5 sao)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                >
                  <option value="1">1 sao</option>
                  <option value="2">2 sao</option>
                  <option value="3">3 sao</option>
                  <option value="4">4 sao</option>
                  <option value="5">5 sao</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bình luận
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  value={editForm.comment}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  placeholder="Nhập bình luận..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsManager;