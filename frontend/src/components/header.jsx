'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import rice from '../../public/assets/rice.png';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const dropdownRef = useRef(null);

    // Kiểm tra login status và user info
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            const userAvatar = localStorage.getItem('userAvatar');

            console.log('Token:', token); // Debug log
            console.log('User data:', { userName, userEmail, userAvatar }); // Debug log

            if (token) {
                setIsLogin(true);
                setUserInfo({
                    name: userName || 'Người dùng',
                    email: userEmail || 'user@example.com',
                    avatar: userAvatar || '/assets/emoji.png'
                });
            } else {
                setIsLogin(false);
                setUserInfo({});
            }
        };

        // Check initial status
        checkLoginStatus();

        // Listen for storage changes (when user logs in/out in another tab)
        const handleStorageChange = () => {
            console.log('Storage changed, rechecking login status'); // Debug log
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check periodically (every 5 seconds) for any updates
        const interval = setInterval(checkLoginStatus, 5000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Improved logout function
    const handleLogout = async () => {
        try {
            console.log('Logging out...'); // Debug log

            // Clear all possible auth-related items from localStorage
            const authKeys = [
                'token',
                'userAvatar',
                'userName',
                'userEmail',
                'currentUser',
                'user',
                'authToken',
                'accessToken'
            ];

            authKeys.forEach(key => {
                localStorage.removeItem(key);
                console.log(`Removed ${key} from localStorage`); // Debug log
            });

            // Clear session storage as well (if used)
            authKeys.forEach(key => {
                sessionStorage.removeItem(key);
            });

            // Clear any cart data if needed
            // localStorage.removeItem('cart');
            // localStorage.removeItem('cart_guest');

            // Update state immediately
            setIsLogin(false);
            setUserInfo({});
            setIsOpen(false);

            console.log('Logout completed, redirecting...'); // Debug log

            // Force reload and redirect
            window.location.replace('/');

        } catch (error) {
            console.error('Error during logout:', error);
            // Fallback: force reload anyway
            window.location.reload();
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="fixed w-full border-b border-rice-gray-light py-3 bg-white z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="w-full flex flex-col lg:flex-row">
                    <div className="flex justify-between lg:flex-row">
                        <Link href="/" className="flex items-center">
                            <Image src={rice} alt="Rice Logo" className="w-10 h-10" />
                            <span className="ml-2 text-xl font-bold hidden sm:block">
                                <span className="text-rice-teal-dark">Rice</span>
                                <span className="text-rice-teal">Shop</span>
                            </span>
                        </Link>

                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-rice-teal rounded-lg lg:hidden hover:bg-rice-gray-light transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden w-full lg:flex lg:pl-11">
                        <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-6">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm lg:text-base font-medium text-rice-teal hover:text-rice-teal-dark transition-all duration-300 relative group"
                                >
                                    Trang Chủ
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rice-teal-dark transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/productlist"
                                    className="text-sm lg:text-base font-medium text-rice-teal hover:text-rice-teal-dark transition-all duration-300 relative group"
                                >
                                    Danh Sách Sản Phẩm
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rice-teal-dark transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="text-sm lg:text-base font-medium text-rice-teal hover:text-rice-teal-dark transition-all duration-300 relative group flex items-center"
                                >
                                    Giỏ Hàng
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rice-teal-dark transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>

                            {/* User Menu */}
                            <li className="relative" ref={dropdownRef}>
                                {isLogin ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-rice-gray-light transition-all duration-300"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={userInfo.avatar || "/assets/emoji.png"}
                                                    className="w-8 h-8 rounded-full border-2 border-rice-gray-medium object-cover"
                                                    alt="User Avatar"
                                                    onError={(e) => {
                                                        e.target.src = "/assets/emoji.png";
                                                    }}
                                                />
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rice-teal-dark rounded-full border-2 border-white"></div>
                                            </div>
                                            <div className="hidden sm:block">
                                                <span className="text-sm font-medium text-rice-teal">
                                                    {userInfo.name || 'Người dùng'}
                                                </span>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 text-rice-teal transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isOpen && (
                                            <div className="absolute right-0 mt-2 w-64 bg-white border border-rice-gray-light rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                                                <div className="px-4 py-3 border-b border-rice-gray-light">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={userInfo.avatar || "/assets/emoji.png"}
                                                            className="w-10 h-10 rounded-full border-2 border-rice-gray-medium object-cover"
                                                            alt="User Avatar"
                                                            onError={(e) => {
                                                                e.target.src = "/assets/emoji.png";
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-rice-teal">
                                                                {userInfo.name || 'Người dùng'}
                                                            </p>
                                                            <p className="text-xs text-rice-teal-light">
                                                                {userInfo.email || 'user@example.com'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-2">
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center px-4 py-2 text-sm text-rice-teal hover:bg-rice-gray-light transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-rice-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Thông tin cá nhân
                                                    </Link>

                                                    <Link
                                                        href="/orders"
                                                        className="flex items-center px-4 py-2 text-sm text-rice-teal hover:bg-rice-gray-light transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-rice-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                        </svg>
                                                        Đơn hàng của tôi
                                                    </Link>

                                                    <div className="border-t border-rice-gray-light my-2"></div>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        🚪 Đăng xuất
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/login"
                                            className="text-sm lg:text-base font-medium text-rice-teal hover:bg-rice-gray-light transition-all duration-300 px-4 py-2 rounded-lg"
                                        >
                                            Đăng Nhập
                                        </Link>
                                        {/* <Link
                                            href="/register"
                                            className="text-sm lg:text-base font-medium bg-rice-teal-dark hover:bg-rice-teal-darker text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
                                        >
                                            Đăng Ký
                                        </Link> */}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'} w-full mt-4`}>
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <Link href="/" className="block px-4 py-2 text-rice-teal hover:bg-rice-gray-light rounded-lg transition-colors">
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="/productlist" className="block px-4 py-2 text-rice-teal hover:bg-rice-gray-light rounded-lg transition-colors">
                                    Danh Sách Sản Phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="block px-4 py-2 text-rice-teal hover:bg-rice-gray-light rounded-lg transition-colors">
                                    Giỏ Hàng
                                </Link>
                            </li>
                            {isLogin ? (
                                <>
                                    <li>
                                        <Link href="/profile" className="block px-4 py-2 text-rice-teal hover:bg-rice-gray-light rounded-lg transition-colors">
                                            Thông tin cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            🚪 Đăng xuất
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/login" className="block px-4 py-2 bg-white text-rice-teal hover:bg-rice-gray-light rounded-lg transition-colors">
                                            Đăng Nhập
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/register" className="block px-4 py-2  hover:bg-rice-teal-darker text-white rounded-lg transition-colors">
                                            Đăng Ký
                                        </Link>
                                    </li> */}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;