"use client";
import API from "@/configs/endpoint";
import { useEffect, useState } from "react";

// Component ReviewSection
const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [reload, setReload] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);


    // Lấy token từ localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Lấy danh sách review
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

    // Thêm review mới
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

    // Xóa review
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
        <div className="mt-10 border rounded px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h1>
            <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">

                <textarea
                    className="border rounded px-2 py-1"
                    placeholder="Nhập nhận xét của bạn..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                />
                <div className="flex items-center gap-2">
                    <label className="mr-2">Đánh giá:</label>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            className={`text-2xl ${n <= rating ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-400`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-fit">
                    Gửi đánh giá
                </button>
            </form>
            <div>
                {loading ? (
                    <p>Đang tải đánh giá...</p>
                ) : reviews.length === 0 ? (
                    <p>Chưa có đánh giá nào.</p>
                ) : (
                    reviews.map(rv => (
                        <div key={rv._id} className="  px-4  mt-4 py-2 flex justify-between items-start">
                            <div className="">
                                <div className="flex items-center gap-4 mb-1 mt-2">
                                    <span className="font-semibold">{rv.user?.name || "Ẩn danh"}</span>
                                    <span className="text-yellow-500">{'★'.repeat(rv.rating)}</span>
                                </div>
                                <div className="text-gray-700 mb-1 mt-2">{rv.comment}</div>
                                <div className="text-xs text-gray-400 mb-1 mt-2">{new Date(rv.createdAt).toLocaleString()}</div>
                            </div>
                            {/* Nếu là user tạo thì cho xóa */}
                            {token && rv.user && rv.user._id === JSON.parse(atob(token.split('.')[1])).userID && (
                                <button
                                    className="text-red-500 text-base ml-2"
                                    onClick={() => setConfirmDeleteId(rv._id)}

                                >
                                    Xóa
                                </button>


                            )}
                            {confirmDeleteId && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
                                        <p className="text-sm text-gray-700 mb-6">Bạn có chắc chắn muốn xóa đánh giá này không?</p>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => setConfirmDeleteId(null)}
                                                className="px-4 py-2 text-gray-600 hover:text-black"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete(confirmDeleteId);
                                                    setConfirmDeleteId(null);
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;