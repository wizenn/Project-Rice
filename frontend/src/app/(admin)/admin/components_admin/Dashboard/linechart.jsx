"use client";
import React from 'react';

const LineChart = ({ title, subtitle }) => {
    const tabItems = ['Monthly', 'Quarterly', 'Annually'];
    const [activeTab, setActiveTab] = React.useState('Monthly');

    return (
        <div className="bg-white rounded-lg p-6 w-full  shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="flex space-x-2">
                    {tabItems.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === tab
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                    <path
                        d="M 50 120 Q 100 80 150 100 T 250 90 T 350 70"
                        stroke="#6366f1"
                        strokeWidth="3"
                        fill="none"
                    />
                    <path
                        d="M 50 140 Q 100 110 150 120 T 250 110 T 350 100"
                        stroke="#a5b4fc"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>
        </div>
    );
};

export default LineChart;