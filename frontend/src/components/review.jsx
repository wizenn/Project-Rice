"use client";
import API from "@/configs/endpoint";
import { useEffect, useState } from "react";

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [reload, setReload] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/reviews/getReviewsByProduct/${productId}`);
                const data = await res.json();
                setReviews(data.reviews || []);
            } catch {
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        if (productId) fetchReviews();
    }, [productId, reload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!token) {
            setError("Bạn cần đăng nhập để đánh giá.");
            return;
        }
        if (!comment.trim()) {
            setError("Vui lòng nhập nhận xét của bạn.");
            return;
        }
        if (!rating) {
            setError("Vui lòng chọn số sao đánh giá.");
            return;
        }
        try {
            const res = await fetch(`${API}/reviews/createReview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product: productId,
                    rating: Number(rating),
                    comment,
                }),
            });
            const data = await res.json();
            if (data.EC === 0) {
                setSuccess("Đánh giá thành công!");
                setComment("");
                setRating(5);
                setReload(r => !r);
            } else {
                setError(data.message || "Có lỗi xảy ra.");
            }
        } catch (err) {
            setError("Có lỗi xảy ra.");
        }
    };

    const handleDelete = async (reviewId) => {
        if (!token) return;
        try {
            const res = await fetch(`${API}/reviews/deleteReview/${reviewId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.EC === 0) {
                setSuccess("Xóa đánh giá thành công!");
                setReload(r => !r);
            } else {
                setError(data.message || "Không thể xóa.");
            }
        } catch {
            setError("Có lỗi xảy ra.");
        }
    };

    return (
        <div className=" bg-rice-white border-2 border-rice-gray-medium rounded-xl px-6 py-8 shadow-lg">
            <h1 className="text-2xl font-bold text-rice-teal-dark mb-6">
                ⭐ Đánh giá sản phẩm
            </h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-rice-teal mb-2">
                        Nhận xét của bạn:
                    </label>
                    <textarea
                        className="w-full border border-rice-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                        rows="4"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-rice-teal">Đánh giá:</label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setRating(n)}
                                className={`text-2xl transition-all duration-200 hover:scale-110 ${n <= rating ? 'text-yellow-400' : 'text-rice-gray-medium'
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                        <span className="ml-2 text-sm text-rice-teal-light">
                            ({rating} sao)
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        ❌ {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                        ✅ {success}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-rice-teal hover:bg-rice-teal-dark text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-rice-lg"
                >
                    🚀 Gửi đánh giá
                </button>
            </form>

            <div>
                <h2 className="text-lg font-semibold text-rice-teal-dark mb-4">
                    💬 Đánh giá từ khách hàng
                </h2>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-3 border-rice-gray-light border-t-rice-teal rounded-full mx-auto mb-4"></div>
                        <p className="text-rice-teal-light">Đang tải đánh giá...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-rice-gray-bg border border-dashed border-rice-gray-medium rounded-lg">
                        <div className="text-6xl mb-4">💭</div>
                        <p className="text-lg font-medium text-rice-teal-dark mb-2">Chưa có đánh giá nào</p>
                        <p className="text-rice-teal-light">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(rv => (
                            <div key={rv._id} className="bg-rice-gray-bg border border-rice-gray-light rounded-lg px-6 py-4 transition-all duration-300 hover:shadow-md">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-rice-teal-dark text-black rounded-full flex items-center justify-center font-bold">
                                                    {(rv.user?.name || "Ẩn danh").charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-rice-teal">
                                                    {rv.user?.name || "Ẩn danh"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">
                                                    {'★'.repeat(rv.rating)}
                                                </span>
                                                <span className="text-rice-gray-medium">
                                                    {'★'.repeat(5 - rv.rating)}
                                                </span>
                                                <span className="text-sm ml-1 text-rice-teal-light">
                                                    ({rv.rating}/5)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-rice-teal mb-3 leading-relaxed">
                                            {rv.comment}
                                        </div>

                                        <div className="text-xs text-rice-teal-light">
                                            📅 {new Date(rv.createdAt).toLocaleString('vi-VN')}
                                        </div>
                                    </div>

                                    {token && rv.user && rv.user._id === JSON.parse(atob(token.split('.')[1])).userID && (
                                        <button
                                            className="ml-4 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105"
                                            onClick={() => setConfirmDeleteId(rv._id)}
                                        >
                                            🗑️ Xóa
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {confirmDeleteId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-rice-white border-2 border-rice-teal p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300">
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-4">⚠️</div>
                                <h2 className="text-xl font-semibold text-rice-teal-dark mb-2">
                                    Xác nhận xóa
                                </h2>
                                <p className="text-sm text-rice-teal-light">
                                    Bạn có chắc chắn muốn xóa đánh giá này không?
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="flex-1 bg-rice-gray-light hover:bg-rice-gray-medium text-rice-teal px-4 py-3 rounded-lg font-medium transition-all duration-300"
                                >
                                    ❌ Hủy
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(confirmDeleteId);
                                        setConfirmDeleteId(null);
                                    }}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-black px-4 py-3 rounded-lg font-medium transition-all duration-300"
                                >
                                    🗑️ Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;