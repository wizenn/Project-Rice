"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email) {
            setError('Vui lòng nhập email');
            setLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Vui lòng nhập email hợp lệ');
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 2000);
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



                {!success ? (
                    <form className="w-full" onSubmit={handleSubmit}>
                        {/* Title Section */}
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4 animate-bounce">🔐</div>
                            <h2 className="text-3xl font-bold text-rice-teal-dark mb-4">
                                Quên Mật Khẩu?
                            </h2>
                            <p className="text-rice-teal max-w-md mx-auto leading-relaxed">
                                Đừng lo lắng! Nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
                            </p>
                        </div>

                        {/* Email Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-rice-teal-dark mb-2">
                                Địa chỉ Email
                            </label>
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
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(''); // Clear error when typing
                                    }}
                                    className="block w-full h-14 pr-5 pl-14 py-3 text-base font-medium text-rice-teal-dark bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl placeholder-rice-teal-light focus:outline-none focus:ring-2 focus:ring-rice-teal focus:border-rice-teal transition-all duration-300"
                                    placeholder="Nhập email của bạn (vd: user@gmail.com)"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 border-2 border-rice-teal hover:bg-rice-teal-dark disabled:bg-rice-gray-medium disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-black text-lg font-semibold transform hover:scale-105 shadow-rice hover:shadow-rice-lg mb-6"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                                    Đang gửi yêu cầu...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <span>📧</span>
                                    <span>Gửi Liên Kết Đặt Lại</span>
                                </span>
                            )}
                        </button>

                        {/* Additional Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-blue-700">
                                    <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                                    <ul className="space-y-1">
                                        <li>• Kiểm tra cả hộp thư spam/junk mail</li>
                                        <li>• Liên kết chỉ có hiệu lực trong 15 phút</li>
                                        <li>• Nếu không nhận được email, hãy thử gửi lại</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Back to Login */}
                        <div className="text-center ">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-rice-teal hover:text-rice-teal-dark font-medium transition-colors duration-300 group"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Quay lại đăng nhập</span>
                            </Link>
                        </div>
                    </form>
                ) : (
                    /* Success State */
                    <div className="text-center">
                        <div className="text-6xl mb-6 animate-bounce">✅</div>
                        <h2 className="text-3xl font-bold text-rice-teal-dark mb-4">
                            Email đã được gửi thành công!
                        </h2>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <p className="text-green-800 mb-4 leading-relaxed">
                                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email:
                            </p>
                            <div className="bg-white border border-green-300 rounded-lg p-3 mb-4">
                                <span className="font-bold text-rice-teal-dark text-lg">{email}</span>
                            </div>
                            <p className="text-green-700 text-sm">
                                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/login')}
                                className="w-full bg-rice-teal hover:bg-rice-teal-dark text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-rice"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span>🔑</span>
                                    <span>Quay lại đăng nhập</span>
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    setSuccess(false);
                                    setEmail('');
                                    setError('');
                                }}
                                className="w-full bg-rice-gray-light hover:bg-rice-gray-medium text-rice-teal-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span>📧</span>
                                    <span>Gửi lại email</span>
                                </span>
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 text-sm text-rice-teal-light">
                            <p>Không nhận được email? </p>
                            <Link href="/contact" className="text-rice-teal hover:text-rice-teal-dark font-medium">
                                Liên hệ hỗ trợ
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}