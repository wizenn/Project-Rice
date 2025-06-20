"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/configs/endpoint";

const CheckoutPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!cart.length) {
            setError("Không có sản phẩm trong giỏ hàng!");
            setLoading(false);
            return;
        }
        const subtotal = cart.reduce((sum, p) => sum + Number(p.price) * (p.quantity || 1), 0);
        const shipping = cart.length ? 30000 : 0;
        const tax = cart.length ? 8320 : 0;
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
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <span className="text-lg font-semibold mb-2">Đang chuyển đến cổng thanh toán MoMo...</span>
                <span className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></span>
            </div>
        );
    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <span className="text-red-600 font-semibold">{error}</span>
                <button
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push("/cart")}
                >
                    Quay lại giỏ hàng
                </button>
            </div>
        );

    return null;
};

export default CheckoutPage;