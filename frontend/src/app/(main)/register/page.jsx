"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import API from '../../../configs/endpoint';

export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setError('Vui lòng nhập họ và tên');
            return false;
        }
        if (!form.email.trim()) {
            setError('Vui lòng nhập email');
            return false;
        }
        if (!form.password) {
            setError('Vui lòng nhập mật khẩu');
            return false;
        }
        if (form.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        if (!isChecked) {
            setError('Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API}/users/registerUsers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (data.EC === 0) {
                setSuccess('Đăng ký thành công! Đang chuyển hướng...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // Implement Google registration
        window.location.href = `${API}/auth/google`;
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
            <div className="w-full max-w-2xl bg-white  rounded-2xl p-8 shadow-rice-xl transform transition-opacity max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true">



                {/* Title */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-3xl font-bold text-rice-teal-dark mb-4">Đăng Ký Tài Khoản</h2>
                    <p className="text-rice-teal max-w-md mx-auto">
                        Tạo tài khoản mới để trải nghiệm mua sắm gạo chất lượng cao với nhiều ưu đãi hấp dẫn.
                    </p>
                </div>

                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    {/* Social Registration Buttons */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="inline-flex items-center justify-center gap-3 py-4 text-sm font-medium text-rice-teal-dark bg-rice-gray-bg border border-rice-gray-medium rounded-xl hover:bg-rice-gray-light transition-all duration-300 transform hover:scale-105"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4" />
                                <path d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z" fill="#34A853" />
                                <path d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z" fill="#FBBC05" />
                                <path d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z" fill="#EB4335" />
                            </svg>
                            Đăng ký với Google
                        </button>


                    </div>

                    {/* Divider */}
                    <div className="flex w-full items-center space-x-4">
                        <div className="flex-1 border-b-2 border-rice-gray-light"></div>
                        <span className="text-rice-teal-light text-lg font-medium px-4">HOẶC</span>
                        <div className="flex-1 border-b-2 border-rice-gray-light"></div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        {/* Name Input */}
                        <div className="relative text-rice-teal-light focus-within:text-rice-teal">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="block w-full h-14 pr-5 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                                placeholder="Nhập họ và tên của bạn"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative text-rice-teal-light focus-within:text-rice-teal">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Image
                                    src="/assets/email.png"
                                    width={20}
                                    height={20}
                                    alt="Email icon"
                                    className="opacity-70"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="block w-full h-14 pr-5 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                                placeholder="name@gmail.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative text-rice-teal-light focus-within:text-rice-teal">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Image
                                    src="/assets/password.png"
                                    width={20}
                                    height={20}
                                    alt="Password icon"
                                    className="opacity-70"
                                />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="block w-full h-14 pr-12 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                                placeholder="Mật khẩu (ít nhất 6 ký tự)"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-rice-teal-light hover:text-rice-teal"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.05 5.05M9.878 9.878l4.242 4.242m0 0L19.95 19.95" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>


                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3 p-4 bg-rice-gray-bg border border-rice-gray-light rounded-lg">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-5 h-5 mt-0.5 text-rice-teal bg-rice-gray-bg border-rice-gray-medium rounded focus:ring-rice-teal focus:ring-2"
                            checked={isChecked}
                            onChange={e => setIsChecked(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm font-medium text-rice-teal cursor-pointer">
                            Tôi đồng ý với{" "}
                            <Link href="/terms" className="text-rice-teal-dark hover:underline font-semibold">
                                Điều khoản sử dụng
                            </Link>{" "}
                            và{" "}
                            <Link href="/privacy" className="text-rice-teal-dark hover:underline font-semibold">
                                Chính sách bảo mật
                            </Link>{" "}
                            của RiceShop.
                        </label>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                            ❌ {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-center">
                            ✅ {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-rice-teal border-2 border-rice-teal hover:bg-rice-teal-dark disabled:bg-rice-gray-medium disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-black text-lg font-semibold transform hover:scale-105 shadow-rice hover:shadow-rice-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                                Đang tạo tài khoản...
                            </span>
                        ) : (
                            '🚀 Tạo Tài Khoản'
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-4">
                        <p className="text-rice-teal">
                            Bạn đã có tài khoản?
                            <Link
                                href="/login"
                                className="ml-2 text-rice-teal-dark hover:text-rice-teal font-semibold transition-colors duration-300"
                            >
                                Đăng Nhập Ngay 🔑
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}