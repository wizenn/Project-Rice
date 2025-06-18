"use client";
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CircularProgress = ({ percentage, change, earning }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
        <div className="bg-white rounded-lg p-31 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Target</h3>
            <p className="text-sm text-gray-500 mb-6">Target you've set for each month</p>

            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#6366f1"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
                        <span className="text-green-500 text-sm font-medium">{change}</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-gray-600 mb-6">
                You earn {earning} today, it's higher than last month.<br />
                Keep up your good work!
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Target</p>
                    <p className="font-semibold text-gray-900">$20K <TrendingDown className="w-3 h-3 text-red-500 inline ml-1" /></p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Revenue</p>
                    <p className="font-semibold text-gray-900">$20K <TrendingUp className="w-3 h-3 text-green-500 inline ml-1" /></p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Today</p>
                    <p className="font-semibold text-gray-900">$20K <TrendingUp className="w-3 h-3 text-green-500 inline ml-1" /></p>
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;