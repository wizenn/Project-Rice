"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/configs/endpoint";
import Link from "next/link";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredItem, setHoveredItem] = useState(null);
    const PRODUCTS_PER_PAGE = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API}/products/getAllRice`);
                const data = await res.json();
                const riceArr = data.rice || (data.data && data.data.rice) || [];
                if (Array.isArray(riceArr)) {
                    setProducts(riceArr);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const formatCurrency = (value) =>
        value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0₫';

    const getImageUrl = (item) => {
        if (item.images && item.images[0]) {
            if (item.images[0].startsWith('http')) {
                return item.images[0];
            } else if (item.images[0].startsWith('/uploads')) {
                return `http://localhost:8080${item.images[0]}`;
            }
        }
        return "/assets/st25.jpg";
    };

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-rice-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gradient-to-r from-rice-gray-light to-rice-gray-medium rounded w-64 mb-8 mx-auto"></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-rice-white border border-rice-gray-light rounded-2xl shadow-lg overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-rice-gray-medium to-rice-teal-light"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gradient-to-r from-rice-gray-light to-rice-gray-medium rounded w-3/4"></div>
                                        <div className="h-3 bg-gradient-to-r from-rice-teal-light to-rice-teal rounded w-1/2"></div>
                                        <div className="h-6 bg-gradient-to-r from-rice-teal to-rice-teal-dark rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-rice-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header với hiệu ứng */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold text-rice-teal-dark mb-4">
                        🌾 Danh sách các sản phẩm
                    </h1>
                    <p className="text-rice-teal max-w-2xl mx-auto text-lg animate-slide-up">
                        Khám phá bộ sưu tập gạo chất lượng cao từ những vùng đất màu mỡ nhất Việt Nam
                    </p>

                    {products.length > 0 && (
                        <div className="mt-6 animate-slide-up delay-200">
                            <div className="inline-flex items-center space-x-2 bg-rice-white border-2 border-rice-gray-medium px-6 py-3 rounded-full shadow-lg">
                                <span>📦</span>
                                <span className="text-sm text-rice-teal">
                                    Hiển thị {startIndex + 1}-{Math.min(endIndex, products.length)} trong tổng số {products.length} sản phẩm
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Products Grid với hiệu ứng */}
                {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {currentProducts.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onMouseEnter={() => setHoveredItem(item._id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="bg-rice-white border border-rice-gray-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 hover:scale-105">
                                        {/* Image container */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={getImageUrl(item)}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-all duration-300"
                                                onError={(e) => {
                                                    e.target.src = "/assets/st25.jpg";
                                                }}
                                            />

                                            {/* Gradient overlay
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${hoveredItem === item._id ? 'opacity-100' : 'opacity-0'}`} /> */}

                                            {/* Magic sparkle effect
                                            <div className={`absolute inset-0 transition-all duration-500 ${hoveredItem === item._id ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="absolute top-4 left-4 w-2 h-2 bg-rice-gray-medium rounded-full animate-ping"></div>
                                                <div className="absolute top-8 right-6 w-1 h-1 bg-rice-teal-light rounded-full animate-pulse delay-300"></div>
                                                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-rice-teal rounded-full animate-bounce delay-500"></div>
                                            </div> */}

                                            {/* Product name overlay */}
                                            {/* <div className={`absolute bottom-0 left-0 right-0 p-4 text-black transform transition-all duration-500 ${hoveredItem === item._id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                                                style={{ background: 'linear-gradient(to top, rgba(67, 101, 90, 0.9), transparent)' }}>
                                                <h3 className="font-semibold text-sm text-center">
                                                    {item.name}
                                                </h3>
                                            </div> */}

                                            {/* Quality badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-rice-teal-dark text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                                    ⭐ PREMIUM
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content với hiệu ứng */}
                                        <div className="p-4 space-y-3">
                                            {/* Product Name */}
                                            <h3 className="font-semibold text-rice-teal text-sm line-clamp-2 hover:text-rice-teal-dark transition-colors duration-300">
                                                <Link href={`/product/${item._id}`}>
                                                    {item.name}
                                                </Link>
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs text-rice-teal-light line-clamp-1">
                                                {item.description || "Loại gạo chất lượng cao"}
                                            </p>

                                            {/* Price với hiệu ứng */}
                                            <p className="text-sm font-bold text-rice-teal-dark">
                                                Giá: {formatCurrency(item.price)}
                                            </p>

                                            {/* Buy Button với hiệu ứng */}
                                            <Link href={`/product/${item._id}`}>
                                                <button className="w-full bg-rice-teal hover:bg-rice-teal-dark text-black px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-rice-lg active:scale-95">
                                                    <span className="flex items-center justify-center space-x-2">
                                                        <span>🛒</span>
                                                        <span>Mua Ngay</span>
                                                    </span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination với hiệu ứng */}
                        {totalPages > 1 && (
                            <div className="flex justify-center animate-fade-in">
                                <div className="flex items-center space-x-2 bg-rice-white border-2 border-rice-gray-light rounded-full p-2 shadow-lg">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`p-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
                                            ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed opacity-50'
                                            : 'bg-rice-teal text-black hover:bg-rice-teal-dark hover:scale-110 shadow-md'
                                            }`}
                                    >
                                        ‹
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-110 ${currentPage === i + 1
                                                ? 'bg-rice-teal-dark text-black shadow-lg'
                                                : 'bg-rice-gray-light text-rice-teal hover:bg-rice-gray-medium'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`p-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                                            ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed opacity-50'
                                            : 'bg-rice-teal text-black hover:bg-rice-teal-dark hover:scale-110 shadow-md'
                                            }`}
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-rice-gray-light rounded-full mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-medium text-rice-teal-dark mb-2">Chưa có sản phẩm nào</h3>
                        <p className="text-rice-teal-light">Các sản phẩm sẽ được cập nhật sớm nhất có thể.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;