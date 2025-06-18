'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Camera } from 'lucide-react';

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Musharof Chowdhury',
        email: 'randomuser@pimjo.com',
        phone: '+09 363 398 46',
        role: 'Team Manager',
        address: {
            street: '123 Main Street',
            city: 'Arizona',
            postalCode: '85001',
            country: 'United States'
        },
        bio: 'Experienced team manager with a passion for leading high-performing teams and driving results.',
        createdAt: '2023-01-15'
    });

    const [editedData, setEditedData] = useState(userData);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(userData);
    };

    const handleSave = () => {
        setUserData(editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData(userData);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setEditedData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setEditedData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    <Save size={16} />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-start gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                {userData.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <Camera size={16} />
                                </button>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="text-2xl font-semibold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                <User size={16} />
                                {isEditing ? (
                                    <select
                                        value={editedData.role}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                        className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="user">User</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Team Manager">Team Manager</option>
                                    </select>
                                ) : (
                                    <span>{userData.role}</span>
                                )}
                                <span className="text-gray-400">•</span>
                                <MapPin size={16} />
                                <span>{userData.address.city}, {userData.address.country}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={16} />
                                <span>Member since {formatDate(userData.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.name.split(' ')[0]}
                                    onChange={(e) => {
                                        const lastName = editedData.name.split(' ').slice(1).join(' ');
                                        handleInputChange('name', `${e.target.value} ${lastName}`);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{userData.name.split(' ')[0]}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.name.split(' ').slice(1).join(' ')}
                                    onChange={(e) => {
                                        const firstName = editedData.name.split(' ')[0];
                                        handleInputChange('name', `${firstName} ${e.target.value}`);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{userData.name.split(' ').slice(1).join(' ')}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{userData.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={editedData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{userData.phone}</p>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            {isEditing ? (
                                <textarea
                                    value={editedData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{userData.bio}</p>
                            )}
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mt-8">
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Street */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.address.street}
                                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-900">{userData.address.street}</p>
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.address.city}
                                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-900">{userData.address.city}</p>
                                )}
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.address.postalCode}
                                        onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-900">{userData.address.postalCode}</p>
                                )}
                            </div>

                            {/* Country */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.address.country}
                                        onChange={(e) => handleInputChange('address.country', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-900">{userData.address.country}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
