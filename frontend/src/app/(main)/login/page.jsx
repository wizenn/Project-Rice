"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import API, { AUTH_API } from '@/configs/endpoint';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = `${AUTH_API}/auth/google`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API}/users/loginUsers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.EC === 0) {
                localStorage.setItem('token', data.data?.token);
                setSuccessMessage('Đăng nhập thành công! Đang chuyển hướng...');
                setTimeout(() => {
                    if (data.data?.user && (data.data.user.role === 'Admin' || data.data.user.role === 'admin')) {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/';
                    }
                }, 1000);
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 z-[9999] bg-white flex items-center justify-center px-4 py-12">
            {/* Header */}
            <div className="fixed top-6 left-6 z-50">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/')}
                        className="p-3 hover:bg-rice-gray-light rounded-full transition-all duration-300 group shadow-lg border border-rice-gray-light"
                    >
                        <Image
                            src="/assets/exit.png"
                            width={20}
                            height={20}
                            alt="Close icon"
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                    </button>
                    <span className="text-sm font-medium text-rice-teal bg-white px-3 py-2 rounded-lg shadow-md border border-rice-gray-light">
                        Quay lại trang chủ
                    </span>
                </div>
            </div>
            <div className="w-full max-w-2xl bg-white  rounded-2xl p-8 shadow-rice-xl transform transition-opacity" role="dialog" aria-modal="true">


                {/* Title */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🔐</div>
                    <h2 className="text-3xl font-bold text-rice-teal-dark mb-4">Đăng Nhập</h2>
                    <p className="text-rice-teal max-w-md mx-auto">
                        Chào mừng bạn quay trở lại! Đăng nhập để tiếp tục mua sắm gạo chất lượng cao.
                    </p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 mb-8">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-3 py-4 text-sm font-medium text-rice-teal-dark bg-rice-gray-bg border border-rice-gray-medium rounded-xl hover:bg-rice-gray-light transition-all duration-300 transform hover:scale-105"
                        onClick={handleGoogleLogin}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4" />
                            <path d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z" fill="#34A853" />
                            <path d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z" fill="#FBBC05" />
                            <path d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z" fill="#EB4335" />
                        </svg>
                        Đăng nhập với Google
                    </button>


                </div>

                {/* Divider */}
                <div className="flex w-full items-center space-x-4 mb-8">
                    <div className="flex-1 border-b-2 border-rice-gray-light"></div>
                    <span className="text-rice-teal-light text-lg font-medium px-4">HOẶC</span>
                    <div className="flex-1 border-b-2 border-rice-gray-light"></div>
                </div>

                {/* Login Form */}
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="relative text-rice-teal-light focus-within:text-rice-teal">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Image
                                src="/assets/email.png"
                                width={24}
                                height={24}
                                alt="Email icon"
                                className="opacity-70"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            className="block w-full h-14 pr-5 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@gmail.com"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative text-rice-teal-light focus-within:text-rice-teal">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Image
                                src="/assets/password.png"
                                width={24}
                                height={24}
                                alt="Password icon"
                                className="opacity-70"
                            />
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="block w-full h-14 pr-5 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mật khẩu"
                            required
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link href="/forgotpass" className="text-rice-teal hover:text-rice-teal-dark font-medium transition-colors duration-300">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                            ❌ {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-center">
                            ✅ {successMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 border-2 border-rice-teal bg-rice-teal hover:bg-rice-teal-dark disabled:bg-rice-gray-medium disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-black text-lg font-semibold transform hover:scale-105 shadow-rice hover:shadow-rice-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                                Đang đăng nhập...
                            </span>
                        ) : (
                            '🚀 Đăng Nhập'
                        )}
                    </button>

                    {/* Register Link */}
                    <div className="text-center pt-4">
                        <p className="text-rice-teal">
                            Bạn chưa có tài khoản?
                            <Link
                                href="/register"
                                className="ml-2 text-rice-teal-dark hover:text-rice-teal font-semibold transition-colors duration-300"
                            >
                                Đăng Ký Ngay
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}