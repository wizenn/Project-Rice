import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// Tooltip tùy chỉnh cho tiếng Việt và định dạng tiền tệ
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#fff",
                border: "1px solid #eee",
                padding: 10,
                borderRadius: 4,
                boxShadow: "0 2px 8px #aaa"
            }}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>{label}</div>
                <div>
                    <span>Doanh thu: </span>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                        ₫{(payload[0].value || 0).toLocaleString("vi-VN")}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const BarChartVN = ({ title, data, labels }) => {
    // Định dạng dữ liệu cho recharts
    const chartData = (labels || []).map((label, i) => ({
        name: label,
        value: data?.[i] || 0,
    }));

    return (
        <div>
            {title && (
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
            )}
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        tickFormatter={(v) => "₫" + v.toLocaleString("vi-VN")}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartVN;