"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function ForgotPassWord() {
    const router = useRouter();
    return (
        <main className="fixed inset-0 z-[9999] bg-white flex items-center justify-center px-4 py-12 text-gray-900">
            <div
                className=" w-full max-w-xl bg-white z-[100] transform  transition-opacity md:block"
                role="dialog"
                aria-modal="true"
            >
                <div className="absolute top-4 right-4 z-10">
                    <Image
                        src="/assets/exit.png"
                        width={24}
                        height={24}
                        alt="Close icon"
                        className="cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                </div>
                <form className="w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quên Mật Khẩu</h2>
                    </div>

                    <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Image
                                src="/assets/email.png"
                                width={24}
                                height={24}
                                alt="Email icon"
                                className="stroke-current ml-1"
                            />
                        </div>
                        <input
                            type="email"
                            className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                            placeholder="name@gmail.com"
                        />
                    </div>

                    <div className="flex mb-5">
                        <button
                            type="submit"
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-900 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6"
                        >
                            Gửi Yêu Cầu
                        </button>
                    </div>


                </form>
            </div>

        </main>
    );
}
