"use client";

import React, { useState } from "react";
import SideBarAdmin from "./sidebar";
import HeaderAdmin from "./header";


const AdminShell = ({ children }: { children: React.ReactNode }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SideBarAdmin collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <HeaderAdmin onToggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
};

export default AdminShell;
