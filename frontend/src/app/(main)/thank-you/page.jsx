"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
    const router = useRouter();
    const params = useSearchParams();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // MoMo sẽ redirect về /thank-you?orderId=...&resultCode=0&...
        const resultCode = params.get("resultCode");
        if (resultCode === "0") {
            setSuccess(true);
            // Có thể gọi backend xác nhận thêm nếu muốn (tùy độ bảo mật)
        }
    }, [params]);

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <span className="text-2xl font-bold text-green-600 mb-4">Cảm ơn bạn đã thanh toán thành công!</span>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push("/")}
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    // Nếu thất bại hoặc truy cập trực tiếp
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <span className="text-xl text-red-600 mb-4">Thanh toán chưa thành công hoặc bị huỷ!</span>
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => router.push("/")}
            >
                Về trang chủ
            </button>
        </div>
    );
}