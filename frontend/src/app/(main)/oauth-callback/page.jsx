"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const name = params.get("name");
        const email = params.get("email");
        // Có thể có avatar và token nếu backend trả về
        // const avatar = params.get("avatar");
        // const token = params.get("token");

        if (name && email) {
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);

            // GIẢ LẬP token (nếu backend không trả về token)
            localStorage.setItem("token", "loginByGoogle");

            // Nếu có avatar thì lưu:
            // localStorage.setItem("userAvatar", avatar);

            router.replace("/");
        }
    }, [params, router]);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>Đang đăng nhập bằng Google...</div>
        </div>
    );
}