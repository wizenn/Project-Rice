'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Thêm hook để lấy đường dẫn hiện tại
import {
    LayoutDashboard,
    Box,
    Star,
    User,
    ShoppingCart,
    History,
    BarChart3,
    Layers,
    Lock,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const SideBarAdmin = ({ collapsed, onToggleCollapse }) => {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    const [expandedMenus, setExpandedMenus] = useState({
        dashboard: true,
        forms: false,
        tables: false,
        pages: false,
        charts: false,
        ui: false,
        auth: false
    });

    const toggleMenu = (menu) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    // Hàm kiểm tra menu item có active không
    const isActiveMenuItem = (href) => {
        return pathname === href;
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard',
            expandable: true
        },
        {
            id: 'calendar',
            label: 'Sản Phẩm',
            icon: Box,
            href: '/admin/products',
            expandable: false
        },
        {
            id: 'review',
            label: 'Đánh giá',
            icon: Star,
            href: '/admin/reviews',
            expandable: true
        },
        {
            id: 'profile',
            label: 'Thông Tin',
            icon: User,
            href: '/admin/users',
            expandable: false
        },
        {
            id: 'order',
            label: 'Đặt Hàng',
            icon: ShoppingCart,
            href: '/admin/order',
            expandable: true
        },
        {
            id: 'history',
            label: 'History',
            icon: History,
            href: '/admin/history',
            expandable: true
        }
    ];

    const otherItems = [
        {
            id: 'charts',
            label: 'Charts',
            icon: BarChart3,
            href: '/charts',
            expandable: true
        },
        {
            id: 'ui',
            label: 'UI Elements',
            icon: Layers,
            href: '/ui-elements',
            expandable: true
        },
        {
            id: 'auth',
            label: 'Authentication',
            icon: Lock,
            href: '/auth',
            expandable: true
        }
    ];

    return (
        <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
            {/* Logo */}
            <div className="p-7">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded"></div>
                    </div>
                    {!collapsed && <span className="text-xl font-bold text-gray-800">TailAdmin</span>}
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        {!collapsed && 'MENU'}
                    </div>

                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveMenuItem(item.href); // Kiểm tra trạng thái active

                        return (
                            <div key={item.id}>
                                <Link href={item.href}>
                                    <button
                                        onClick={() => item.expandable && toggleMenu(item.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isActive
                                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                                            {!collapsed && (
                                                <span className={`${isActive ? 'font-medium text-blue-600' : ''}`}>
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                        {!collapsed && item.expandable && (
                                            expandedMenus[item.id]
                                                ? <ChevronDown className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                                                : <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                                        )}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}

                    {!collapsed && (
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-4">
                            OTHERS
                        </div>
                    )}

                    {otherItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveMenuItem(item.href); // Kiểm tra trạng thái active

                        return (
                            <div key={item.id}>
                                <Link href={item.href}>
                                    <button
                                        onClick={() => item.expandable && toggleMenu(item.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isActive
                                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                                            {!collapsed && (
                                                <span className={`${isActive ? 'font-medium text-blue-600' : ''}`}>
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                        {!collapsed && item.expandable && (
                                            expandedMenus[item.id]
                                                ? <ChevronDown className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                                                : <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                                        )}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
};

export default SideBarAdmin;