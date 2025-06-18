"use client";
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, iconBgColor, iconColor }) => {
    const isPositive = changeType === 'positive';

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${iconBgColor} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
            <div>
                <p className="text-gray-600 text-sm mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <div className="flex items-center mt-2">
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;