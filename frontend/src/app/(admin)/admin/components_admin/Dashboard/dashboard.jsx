"use client";
import React, { useEffect, useState } from 'react';
import { Users, FileText, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from './statscard';
import BarChart from './barchart';
import CircularProgress from './circularprogress';
import axios from 'axios';
import API from '@/configs/endpoint';

// Hàm lấy số ngày trong tháng
function laySoNgayTrongThang(nam, thang) {
    return new Date(nam, thang, 0).getDate();
}

// Gom đơn hàng theo từng ngày trong tháng hiện tại
function gomDonTheoNgay(donHang) {
    if (!Array.isArray(donHang)) return { doanhThuTheoNgay: [], donTheoNgay: [] };
    const hienTai = new Date();
    const namHienTai = hienTai.getFullYear();
    const thangHienTai = hienTai.getMonth() + 1;
    const soNgay = laySoNgayTrongThang(namHienTai, thangHienTai);
    const doanhThuTheoNgay = Array.from({ length: soNgay }, () => 0);
    const donTheoNgay = Array.from({ length: soNgay }, () => 0);

    donHang.forEach(don => {
        if (!don.createdAt) return;
        const d = new Date(don.createdAt);
        if (d.getFullYear() === namHienTai && d.getMonth() + 1 === thangHienTai) {
            const ngay = d.getDate();
            doanhThuTheoNgay[ngay - 1] += don.totalPrice || 0;
            donTheoNgay[ngay - 1] += 1;
        }
    });

    return { doanhThuTheoNgay, donTheoNgay };
}

// Tính phần trăm thay đổi giữa 2 số
function tinhTiLeThayDoi(hienTai, truocDo) {
    if (truocDo === 0) return hienTai > 0 ? 100 : 0;
    return ((hienTai - truocDo) / truocDo * 100).toFixed(2);
}

// Đếm số phần tử theo tháng (dùng cho cả đơn và khách hàng)
function demTheoThang(mang, luiThang = 0) {
    if (!Array.isArray(mang)) return 0;
    const hienTai = new Date();
    let nam = hienTai.getFullYear();
    let thang = hienTai.getMonth() + 1 + luiThang;
    if (thang < 1) { thang += 12; nam -= 1; }
    return mang.filter(item => {
        if (!item.createdAt) return false;
        const d = new Date(item.createdAt);
        return d.getFullYear() === nam && d.getMonth() + 1 === thang;
    }).length;
}

// Tính doanh thu trong tháng hiện tại
function tinhDoanhThuThang(donHang) {
    const hienTai = new Date();
    const nam = hienTai.getFullYear();
    const thang = hienTai.getMonth() + 1;
    return donHang.reduce((tong, don) => {
        if (!don.createdAt) return tong;
        const d = new Date(don.createdAt);
        if (d.getFullYear() === nam && d.getMonth() + 1 === thang) {
            return tong + (don.totalPrice || 0);
        }
        return tong;
    }, 0);
}

// Tính doanh thu hôm nay
function tinhDoanhThuHomNay(donHang) {
    const hienTai = new Date();
    return donHang.reduce((tong, don) => {
        if (!don.createdAt) return tong;
        const d = new Date(don.createdAt);
        if (
            d.getFullYear() === hienTai.getFullYear() &&
            d.getMonth() === hienTai.getMonth() &&
            d.getDate() === hienTai.getDate()
        ) {
            return tong + (don.totalPrice || 0);
        }
        return tong;
    }, 0);
}

const Dashboard = () => {
    const [thongKe, setThongKe] = useState(null);
    const [kieuXem, setKieuXem] = useState('thang'); // 'tuan', 'thang', 'nam'

    useEffect(() => {
        const token = localStorage.getItem('token');
        layThongKe(token);
    }, []);

    const layThongKe = async (token) => {
        try {
            const res = await axios.get(`${API}/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setThongKe(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu dashboard:', error);
        }
    };

    if (!thongKe) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
            </div>
        </div>
    );

    if (thongKe.EC !== 0) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <h3 className="text-red-800 font-semibold mb-2">Lỗi dữ liệu</h3>
                <p className="text-red-600 text-sm">{JSON.stringify(thongKe)}</p>
            </div>
        </div>
    );

    // Xử lý dữ liệu
    const mangDonHang = thongKe.ordersList || [];
    const mangKhachHang = thongKe.customersList || [];

    // Tính các chỉ số cơ bản
    const khachThangNay = demTheoThang(mangKhachHang, 0);
    const khachThangTruoc = demTheoThang(mangKhachHang, -1);
    const tiLeKhach = tinhTiLeThayDoi(khachThangNay, khachThangTruoc);

    const donThangNay = demTheoThang(mangDonHang, 0);
    const donThangTruoc = demTheoThang(mangDonHang, -1);
    const tiLeDon = tinhTiLeThayDoi(donThangNay, donThangTruoc);

    // Chỉ tiêu doanh thu tháng (BE trả về)
    const chiTieuThang = thongKe.monthlyTarget || 1000000;
    const doanhThuThang = tinhDoanhThuThang(mangDonHang);
    const doanhThuHomNay = tinhDoanhThuHomNay(mangDonHang);
    const phanTramChiTieu = Math.round((doanhThuThang / chiTieuThang) * 100);

    // Tăng trưởng doanh thu so với tháng trước
    const hienTai = new Date();
    const chiSoThangHienTai = hienTai.getMonth(); // 0-based
    const doanhThuThangTruoc = thongKe.monthlyRevenue?.[chiSoThangHienTai - 1] || 0;
    const tiLeDoanhThu = tinhTiLeThayDoi(doanhThuThang, doanhThuThangTruoc);

    // Dữ liệu filter doanh thu
    const doanhThuTuan = thongKe.weeklyRevenue || [];
    const doanhThuThangArr = thongKe.monthlyRevenue || [];
    const doanhThuNam = (thongKe.yearlyRevenue || []).map(item => item.total);

    // Nhãn
    const nhanTuan = Array.from({ length: doanhThuTuan.length }, (_, i) => `Tuần ${i + 1}`);
    const nhanThang = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    const nhanNam = (thongKe.yearlyRevenue || []).map(item => `Năm ${item.year}`);

    // Chọn dữ liệu và nhãn phù hợp filter
    let data, labels, title;
    if (kieuXem === "tuan") {
        data = doanhThuTuan;
        labels = nhanTuan;
        title = "Doanh thu từng tuần trong năm";
    } else if (kieuXem === "nam") {
        data = doanhThuNam;
        labels = nhanNam;
        title = "Doanh thu từng năm";
    } else {
        data = doanhThuThangArr;
        labels = nhanThang;
        title = "Doanh thu từng tháng trong năm";
    }

    return (
        <div className="min-h-screen  from-gray-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">


            <main className="max-w-11xl mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Left side - Stats and Charts */}
                    <div className="xl:col-span-3 space-y-6 lg:space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="transform hover:scale-105 transition-all duration-300">
                                <StatsCard
                                    title="Khách hàng"
                                    value={khachThangNay}
                                    change={`${tiLeKhach}%`}
                                    changeType={tiLeKhach >= 0 ? "positive" : "negative"}
                                    icon={Users}
                                    iconBgColor="bg-gradient-to-br from-blue-100 to-blue-200"
                                    iconColor="text-blue-600"
                                />
                            </div>
                            <div className="transform hover:scale-105 transition-all duration-300">
                                <StatsCard
                                    title="Đơn hàng"
                                    value={donThangNay}
                                    change={`${tiLeDon}%`}
                                    changeType={tiLeDon >= 0 ? "positive" : "negative"}
                                    icon={FileText}
                                    iconBgColor="bg-gradient-to-br from-orange-100 to-orange-200"
                                    iconColor="text-orange-600"
                                />
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
                            {/* Filter Buttons */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">Phân Tích Doanh Thu</h2>
                                </div>

                                <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl inline-flex">
                                    <button
                                        className={`
                                            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2
                                            ${kieuXem === 'tuan'
                                                ? "bg-white text-indigo-600 shadow-md"
                                                : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                                            }
                                        `}
                                        onClick={() => setKieuXem('tuan')}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Theo tuần
                                    </button>
                                    <button
                                        className={`
                                            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2
                                            ${kieuXem === 'thang'
                                                ? "bg-white text-indigo-600 shadow-md"
                                                : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                                            }
                                        `}
                                        onClick={() => setKieuXem('thang')}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Theo tháng
                                    </button>
                                    <button
                                        className={`
                                            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2
                                            ${kieuXem === 'nam'
                                                ? "bg-white text-indigo-600 shadow-md"
                                                : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                                            }
                                        `}
                                        onClick={() => setKieuXem('nam')}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Theo năm
                                    </button>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                                <BarChart
                                    title={title}
                                    data={data}
                                    labels={labels}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Circular Progress */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Chỉ Tiêu Tháng</h3>
                                </div>
                                <CircularProgress
                                    percentage={phanTramChiTieu}
                                    change={`${tiLeDoanhThu > 0 ? '+' : ''}${tiLeDoanhThu}%`}
                                    earning={`₫${doanhThuHomNay.toLocaleString()}`}
                                    target={`₫${chiTieuThang.toLocaleString()}`}
                                    monthRevenue={`₫${doanhThuThang.toLocaleString()}`}
                                    todayRevenue={`₫${doanhThuHomNay.toLocaleString()}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;