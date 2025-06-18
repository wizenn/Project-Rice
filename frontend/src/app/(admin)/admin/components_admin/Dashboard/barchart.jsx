"use client";
import React from 'react';

const BarChart = ({ title, data, labels }) => {
    const maxValue = Math.max(...data);

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>
            <div className="h-80 flex items-end justify-between space-x-2">
                {data.map((value, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div
                            className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
                            style={{ height: `${(value / maxValue) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{labels[index]}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>0</span>
                <span>100</span>
                <span>200</span>
                <span>300</span>
                <span>400</span>
            </div>
        </div>
    );
};

export default BarChart;