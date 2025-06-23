"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function OAuthCallbackInner() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const name = params.get("name");
        const email = params.get("email");
        if (name && email) {
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("token", "loginByGoogle");
            router.replace("/");
        }
    }, [params, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>Đang đăng nhập bằng Google...</div>
        </div>
    );
}

export default function OAuthCallback() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Đang đăng nhập...</div>}>
            <OAuthCallbackInner />
        </Suspense>
    );
}
