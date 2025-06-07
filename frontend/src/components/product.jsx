"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/configs/endpoint";
import Link from "next/link";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API}/products/getAllRice`);
                const data = await res.json();
                // Sửa đoạn này:
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

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh sách các sản phẩm</h2>
                {loading ? (
                    <p className="text-gray-500">Đang tải sản phẩm...</p>
                ) : (
                    Array.isArray(products) && products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((item) => (
                                <div key={item._id} className="group relative">
                                    <Image
                                        src={item.images && item.images[0] ? item.images[0] : "/assets/st25.jpg"}
                                        alt={item.name}
                                        width={300}
                                        height={300}
                                        className="aspect-square w-full rounded-md object-cover group-hover:opacity-80 transition"
                                    />
                                    <div className="mt-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-sm text-gray-800 font-medium">
                                                <a href={`/product/${item._id}`}>{item.name}</a>
                                            </h3>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>


                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-sm font-semibold text-gray-900">
                                            Giá: {item.price?.toLocaleString()}đ
                                        </p>
                                        <Link href={`/product/${item._id}`} className="text-indigo-600 hover:text-indigo-900">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                                Mua Ngay
                                            </button>
                                        </Link>
                                    </div>

                                </div>

                            ))}

                        </div>
                    ) : (
                        <p className="text-gray-500">Không có sản phẩm nào.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Product;