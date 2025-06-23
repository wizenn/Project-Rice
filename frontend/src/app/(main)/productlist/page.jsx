"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/configs/endpoint";
import Link from "next/link";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredItem, setHoveredItem] = useState(null);
    const PRODUCTS_PER_PAGE = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API}/products/getAllRice`);
                const data = await res.json();
                const riceArr = data.rice || (data.data && data.data.rice) || [];
                if (Array.isArray(riceArr)) {
                    setProducts(riceArr);
                    setFilteredProducts(riceArr);
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Xử lý tìm kiếm
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.type?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
        setCurrentPage(1);
    }, [searchTerm, products]);

    const formatCurrency = (value) =>
        value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0₫';

    // Hàm xử lý ảnh
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

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Tạo array số trang
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    // Xử lý xóa tìm kiếm
    const handleClearSearch = () => {
        setSearchTerm("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-rice-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gradient-to-r from-rice-gray-light to-rice-gray-medium rounded w-64 mb-8 mx-auto"></div>
                        <div className="h-12 bg-gradient-to-r from-rice-teal-light to-rice-teal rounded mb-8"></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="bg-rice-white border border-rice-gray-light rounded-xl shadow-lg overflow-hidden">
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
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-rice-teal-dark mb-4 animate-fade-in">
                        🛍️ Danh sách sản phẩm
                    </h1>
                    <p className="mb-8 text-lg text-rice-teal animate-slide-up">
                        Khám phá và tìm kiếm các loại gạo chất lượng cao
                    </p>

                    {/* Search Bar với hiệu ứng */}
                    <div className="relative max-w-md mx-auto animate-slide-up delay-100">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-rice-teal-light animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-12 py-4 bg-rice-white border-2 border-rice-gray-light rounded-full focus:outline-none focus:ring-4 focus:ring-rice-teal/20 focus:border-rice-teal text-rice-teal-dark shadow-lg hover:shadow-xl transition-all duration-300 text-center placeholder-rice-teal-light"
                        />
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center animate-fade-in"
                            >
                                <svg className="h-5 w-5 text-rice-teal hover:text-rice-teal-dark hover:scale-110 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="mb-8 animate-fade-in">
                        <div className="max-w-2xl mx-auto p-4 bg-rice-gray-bg border-2 border-rice-gray-medium rounded-xl">
                            <p className="text-center font-medium text-rice-teal-dark">
                                {filteredProducts.length > 0
                                    ? `🔍 Tìm thấy ${filteredProducts.length} sản phẩm cho "${searchTerm}"`
                                    : `❌ Không tìm thấy sản phẩm nào cho "${searchTerm}"`
                                }
                            </p>
                        </div>
                    </div>
                )}

                {/* Products Info */}
                {filteredProducts.length > 0 && (
                    <div className="mb-8 text-center text-sm animate-fade-in delay-200">
                        <div className="inline-flex items-center space-x-2 bg-rice-white border border-rice-gray-light px-4 py-2 rounded-full shadow-md">
                            <span>📦</span>
                            <span className="text-rice-teal">
                                Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} trong tổng số {filteredProducts.length} sản phẩm
                            </span>
                            {totalPages > 1 && (
                                <>
                                    <span className="text-rice-teal-light">•</span>
                                    <span className="text-rice-teal">Trang {currentPage} / {totalPages}</span>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Products Grid với hiệu ứng */}
                {currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
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
                                                alt={item.name || "Ảnh sản phẩm"}
                                                fill
                                                className="object-cover transition-all duration-300"
                                                onError={(e) => {
                                                    e.target.src = "/assets/st25.jpg";
                                                }}
                                            />

                                            {/* Gradient overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${hoveredItem === item._id ? 'opacity-100' : 'opacity-0'}`} />

                                            {/* Magic sparkle effect */}
                                            <div className={`absolute inset-0 transition-all duration-500 ${hoveredItem === item._id ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="absolute top-4 left-4 w-2 h-2 bg-rice-gray-medium rounded-full animate-ping"></div>
                                                <div className="absolute top-8 right-6 w-1 h-1 bg-rice-teal-light rounded-full animate-pulse delay-300"></div>
                                                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-rice-teal rounded-full animate-bounce delay-500"></div>
                                            </div>

                                            {/* Quality badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-rice-teal-dark text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                                    🌾 PREMIUM
                                                </span>
                                            </div>

                                            {/* Product name overlay - chỉ hiện khi hover */}
                                            <div className={`absolute bottom-0 left-0 right-0 p-4 text-black transform transition-all duration-500 ${hoveredItem === item._id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                                                style={{ background: 'linear-gradient(to top, rgba(67, 101, 90, 0.9), transparent)' }}>
                                                <h3 className="font-semibold text-sm text-center">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
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

                                            {/* Price and Rating */}
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold text-rice-teal-dark">
                                                    {formatCurrency(item.price)}
                                                </p>
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Buy Button */}
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center animate-fade-in">
                                <div className="flex items-center space-x-2 bg-rice-white border-2 border-rice-gray-light rounded-full p-2 shadow-lg">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`p-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
                                                ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed opacity-50'
                                                : 'bg-rice-teal text-black hover:bg-rice-teal-dark hover:scale-110'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-110 ${currentPage === page
                                                    ? 'bg-rice-teal-dark text-black'
                                                    : 'bg-rice-gray-light text-rice-teal hover:bg-rice-gray-medium'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`p-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                                                ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed opacity-50'
                                                : 'bg-rice-teal text-black hover:bg-rice-teal-dark hover:scale-110'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 animate-fade-in">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-rice-gray-bg border-2 border-dashed border-rice-gray-medium rounded-full mb-6">
                                <div className="text-4xl">
                                    {searchTerm ? "🔍" : "🌾"}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-rice-teal-dark mb-4">
                            {searchTerm ? "🔍 Không tìm thấy sản phẩm" : "🌾 Chưa có sản phẩm nào"}
                        </h3>

                        <p className="text-lg text-rice-teal mb-8">
                            {searchTerm
                                ? `Không có sản phẩm nào phù hợp với từ khóa "${searchTerm}". Thử tìm kiếm với từ khóa khác!`
                                : "Các sản phẩm sẽ được cập nhật sớm nhất có thể"
                            }
                        </p>

                        {searchTerm && (
                            <div className="space-y-4">
                                <button
                                    onClick={handleClearSearch}
                                    className="bg-rice-teal hover:bg-rice-teal-dark text-black px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-rice hover:shadow-rice-lg"
                                >
                                    ✨ Xóa bộ lọc và xem tất cả sản phẩm
                                </button>

                                <div className="text-sm text-rice-teal">
                                    <p>💡 <strong>Gợi ý tìm kiếm:</strong></p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                                        {['ST25', 'Jasmine', 'Tám xoan', 'Nàng hương', 'Thơm', 'Gạo lứt', 'Gạo tẻ'].map((keyword, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSearchTerm(keyword)}
                                                className="bg-rice-gray-bg hover:bg-rice-gray-light border border-rice-gray-medium text-rice-teal-dark px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105"
                                            >
                                                🌾 {keyword}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Back to Home */}
                <div className="mt-16 text-center animate-fade-in delay-500">
                    <Link href="/" className="inline-flex items-center gap-3 text-rice-teal-dark hover:text-rice-teal font-medium group transition-all duration-300">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="group-hover:underline">🏠 Về trang chủ</span>
                    </Link>
                </div>

                {/* Floating Action Button - Scroll to Top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-rice-teal hover:bg-rice-teal-dark text-black rounded-full shadow-rice hover:shadow-rice-xl transition-all duration-300 transform hover:scale-110 z-50"
                >
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductList;