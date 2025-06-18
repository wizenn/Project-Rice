"use client";
import React, { useEffect, useState } from 'react';
import { Users, FileText } from 'lucide-react';
import StatsCard from './statscard';
import BarChart from './barchart';
import LineChart from './linechart';
import CircularProgress from './circularprogress';
import API from '@/configs/endpoint';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Lấy token trong useEffect để chắc chắn đang ở client
        const token = localStorage.getItem('token');
        fetchStats(token);
    }, []);

    const fetchStats = async (token) => {
        try {
            const res = await fetch(`${API}/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    if (!stats) return <div>Loading...</div>;
    if (stats.EC !== 0) return <div>Lỗi dữ liệu: {JSON.stringify(stats)}</div>;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <main className="flex-1 mx-auto mb-6 ">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left Column - Stats and Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatsCard
                            title="Customers"
                            value={stats.customers}
                            change="11.01%"
                            changeType="positive"
                            icon={Users}
                            iconBgColor="bg-blue-50"
                            iconColor="text-blue-600"
                        />
                        <StatsCard
                            title="Orders"
                            value={stats.orders}
                            change="9.05%"
                            changeType="negative"
                            icon={FileText}
                            iconBgColor="bg-orange-50"
                            iconColor="text-orange-600"
                        />
                    </div>

                    {/* Monthly Sales Chart */}
                    <BarChart

                        title="Monthly Sales"
                        data={stats.monthlyOrders}
                        labels={months}
                    />

                    {/* Statistics */}
                    <div className='flex flex-col w-full'>
                        <LineChart
                            title="Statistics"
                            subtitle="Target you've set for each month"
                        />
                    </div>
                </div>

                {/* Right Column - Monthly Target */}
                <div className="space-y-10 ">
                    <CircularProgress
                        percentage={75.55}
                        change="+10%"
                        earning="$3287"
                    />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;