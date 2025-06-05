"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Login() {
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng Nhập</h2>
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

                    <div className="relative text-gray-500 focus-within:text-gray-900 mb-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Image
                                src="/assets/password.png"
                                width={24}
                                height={24}
                                alt="Password icon"
                                className="stroke-current ml-1"
                            />
                        </div>
                        <input
                            type="password"
                            className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                            placeholder="Password"
                        />
                    </div>

                    <div className="text-right mb-6">
                        <Link href="forgotpass" className="text-indigo-600 text-base font-medium leading-6">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="flex mb-5">
                        <button
                            type="submit"
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-900 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6"
                        >
                            Đăng Nhập
                        </button>
                    </div>

                    <div className="flex w-full items-center space-x-4 mt-10 mb-10">
                        <div className="flex-1 border-b border-gray-200"></div>
                        <span className="text-gray-400 text-lg font-normal leading-7 px-5">OR</span>
                        <div className="flex-1 border-b border-gray-200"></div>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-900 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6"
                    >
                        <a href="/register" className="flex items-center justify-center">
                            Đăng Ký
                        </a>
                    </button>
                    <p className="text-gray-900 text-center text-base font-medium leading-6 mb-3">
                        Login with social media
                    </p>
                    <div className="flex items-center justify-center gap-x-3">
                        <button className="w-9 h-9 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-white"
                                viewBox="0 0 8 14"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z" />
                            </svg>
                        </button>

                        <button className="w-9 h-9 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center">
                            <svg
                                className="w-[1.125rem] h-[0.875rem] text-white"
                                viewBox="0 0 14 12"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M13.51 1.87c-.42.18-.86.31-1.31.38.32-.19.58-.49.7-.84-.44.26-.93.45-1.46.56A2.22 2.22 0 0 0 9.53 1c-1.23 0-2.23 1-2.23 2.23 0 .17.02.34.05.5C4.83 3.6 2.84 2.48 1.55.86c-.19.33-.3.72-.3 1.13 0 .77.39 1.44.98 1.83a2.23 2.23 0 0 1-1.01-.28v.03c0 1.08.77 1.97 1.8 2.17-.19.05-.4.08-.61.08-.15 0-.29-.01-.43-.04.29.91 1.13 1.57 2.12 1.59A4.47 4.47 0 0 1 .5 9.76c-.16 0-.32-.01-.48-.03A6.3 6.3 0 0 0 3.42 11c4.07 0 6.3-3.37 6.3-6.3v-.29c.43-.31.8-.7 1.1-1.14z" />
                            </svg>
                        </button>

                        <button className="w-9 h-9 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center">
                            <svg
                                className="w-[1.25rem] h-[1.125rem] text-white"
                                viewBox="0 0 15 15"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.71 7.94c0-1.28 1.05-2.32 2.35-2.32s2.35 1.04 2.35 2.32-1.05 2.32-2.35 2.32-2.35-1.04-2.35-2.32zM3.44 7.94c0 1.97 1.62 3.56 3.61 3.56s3.61-1.59 3.61-3.56-1.62-3.57-3.61-3.57-3.61 1.6-3.61 3.57zm6.53-3.71a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zM4.21 13.59c-.69-.03-1.06-.14-1.31-.23a2.3 2.3 0 0 1-.79-.52 2.3 2.3 0 0 1-.52-.79c-.09-.24-.2-.62-.23-1.31C1.29 10 1.28 9.79 1.28 7.94c0-1.85.01-2.07.05-2.8.03-.67.14-1.03.23-1.27.12-.3.27-.52.52-.79.25-.27.48-.4.79-.52.24-.09.6-.2 1.27-.23C4.96 2.25 5.18 2.24 7.06 2.24c1.88 0 2.1.01 2.83.05.67.03 1.04.14 1.27.23.31.12.54.25.79.52.25.27.4.48.52.79.09.24.2.6.23 1.27.04.73.05.95.05 2.8 0 1.85-.01 2.06-.05 2.8-.03.67-.14 1.03-.23 1.27a2.3 2.3 0 0 1-.52.79 2.3 2.3 0 0 1-.79.52c-.24.09-.6.2-1.27.23-.74.04-.95.05-2.8.05s-2.07-.01-2.8-.05z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

        </main>
    );
}
