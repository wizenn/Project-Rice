"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/configs/endpoint";

const getCartKey = () => {
    if (typeof window !== "undefined") {
        const userId = localStorage.getItem("currentUser");
        return userId ? `cart_user_${userId}` : "cart_guest";
    }
    return "cart_guest";
};

const CheckoutPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const key = getCartKey();
        const cart = JSON.parse(localStorage.getItem(key) || "[]");
        
        if (!cart.length) {
            setError("Không có sản phẩm trong giỏ hàng!");
            setLoading(false);
            return;
        }

        // Tính toán với logic mới (selectedWeight thay vì quantity)
        const subtotal = cart.reduce((sum, p) => sum + Number(p.price) * (p.selectedWeight || 25), 0);
        const totalWeight = cart.reduce((sum, p) => sum + (p.selectedWeight || 25), 0);
        const totalShippingBags = Math.ceil(totalWeight / 50);
        const shipping = totalShippingBags * 50000;
        const tax = cart.length ? Math.round(subtotal * 0.1) : 0; // 10% VAT
        const total = subtotal + shipping + tax;

        fetch(`${API}/payment/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.EC === 0 && data.payUrl) {
                    window.location.href = data.payUrl;
                } else {
                    setError("Không thể tạo thanh toán MoMo!");
                    setLoading(false);
                }
            })
            .catch(() => {
                setError("Có lỗi khi gọi API!");
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <div className="min-h-screen bg-rice-white flex items-center justify-center">
                <div className="text-center bg-rice-white border-2 border-rice-teal rounded-2xl p-8 shadow-rice-lg">
                    <div className="text-6xl mb-4">💳</div>
                    <h2 className="text-2xl font-bold text-rice-teal-dark mb-4">
                        Đang xử lý thanh toán
                    </h2>
                    <p className="text-rice-teal mb-6">
                        Đang chuyển đến cổng thanh toán MoMo...
                    </p>
                    <div className="flex justify-center">
                        <div className="animate-spin h-12 w-12 border-4 border-rice-teal rounded-full border-t-transparent"></div>
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-rice-white flex items-center justify-center">
                <div className="text-center bg-rice-white border-2 border-red-300 rounded-2xl p-8 shadow-lg max-w-md">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-rice-teal-dark mb-4">
                        Có lỗi xảy ra
                    </h2>
                    <p className="text-red-600 font-medium mb-6">{error}</p>
                    <div className="space-y-3">
                        <button
                            className="w-full bg-rice-teal hover:bg-rice-teal-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            onClick={() => router.push("/cart")}
                        >
                            🛒 Quay lại giỏ hàng
                        </button>
                        <button
                            className="w-full bg-rice-gray-light hover:bg-rice-gray-medium text-rice-teal-dark px-6 py-3 rounded-lg font-medium transition-all duration-300"
                            onClick={() => router.push("/productlist")}
                        >
                            🌾 Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        );

    return null;
};

export default CheckoutPage;