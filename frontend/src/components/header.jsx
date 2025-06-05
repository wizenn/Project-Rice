'use client';

import React from 'react';
import Image from 'next/image';
import rice from '../../public/assets/rice.png';
import Link from 'next/link';

const Header = () => {
    return (
        <nav className="fixed  border-solid border-gray-200 w-full border-b py-3 bg-white z-50">
            <div className="container mx-auto">
                <div className="w-full flex flex-col lg:flex-row">
                    <div className="flex justify-between lg:flex-row">
                        <Link href="/">
                            <Image src={rice} alt="Rice Logo" className="w-10 h-10" />
                        </Link>
                        <button
                            data-collapse-toggle="navbar-default-example"
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-default-example"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden w-full lg:flex lg:pl-11" id="navbar-default-example">
                        <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-4">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6"
                                >
                                    Trang Chủ
                                </Link>
                            </li>


                            <li>
                                <Link
                                    href="/cart"
                                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6"
                                >
                                    Giỏ Hàng
                                </Link>
                            </li>

                            <li className="relative group">
                                <Link
                                    href="/about"
                                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6"
                                >
                                    Thông Báo
                                </Link>

                                <div className="absolute top-full right-0 mt-2 group-hover:flex hidden flex-col bg-white z-50 rounded-lg shadow-xl border border-gray-200 min-w-[360px] transition-all">


                                    <ul className="text-sm text-gray-700 p-4">
                                        <h6 className="font-medium text-sm text-gray-500 mb-2 hidden lg:block">
                                            Features
                                        </h6>

                                        {[
                                            {
                                                iconColor: 'bg-orange-50',
                                                title: 'Notification',
                                                desc: 'Real time notification always keep you up to date in realtime',
                                                link: '/notification',
                                            },
                                            {
                                                iconColor: 'bg-emerald-50',
                                                title: 'Analytics',
                                                desc: 'Analyze data to make more informed and accurate business decision',
                                                badge: 'New',
                                                link: '/analytics',
                                            },
                                            {
                                                iconColor: 'bg-blue-50',
                                                title: 'Integrations',
                                                desc: 'Get started by taking advantage of integration with other services',
                                                link: '/integrations',
                                            },
                                            {
                                                iconColor: 'bg-rose-50',
                                                title: 'Security',
                                                desc: 'To ensure your privacy all information are highly encrypted',
                                                link: '/security',
                                            },
                                            {
                                                iconColor: 'bg-indigo-50',
                                                title: 'Documentation',
                                                desc: 'Organized documentation will help you save tone of your time',
                                                link: '/docs',
                                            },
                                            {
                                                iconColor: 'bg-cyan-50',
                                                title: 'Support',
                                                desc: 'Access 24/7 support to ensure seamless usage anytime',
                                                link: '/support',
                                            },
                                        ].map(({ iconColor, title, desc, badge, link }, i) => (
                                            <li key={i}>
                                                <Link
                                                    href={link}
                                                    className="flex items-center px-3 py-4 hover:bg-gray-50 rounded-xl transition-all duration-300"
                                                >
                                                    <div className={`${iconColor} rounded-lg w-12 h-12 flex items-center justify-center`}>
                                                        {/* Placeholder for icon - replace with actual icon */}
                                                        <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
                                                    </div>
                                                    <div className="ml-4 w-4/5">
                                                        <h5 className="text-gray-900 text-base font-semibold mb-1.5">
                                                            {title}
                                                            {badge && (
                                                                <span className="ml-2 bg-indigo-50 text-indigo-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    {badge}
                                                                </span>
                                                            )}
                                                        </h5>
                                                        <p className="text-xs font-medium text-gray-400">{desc}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </li>

                            <li>
                                <Link
                                    href="/login"
                                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6"
                                >
                                    Đăng Nhập
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
