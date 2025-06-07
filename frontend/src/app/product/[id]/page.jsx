"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import API from "@/configs/endpoint";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedQty, setSelectedQty] = useState(1);

    const addToCart = () => {
        if (!product) return;
        let cart = [];
        if (typeof window !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const idx = cart.findIndex((p) => p._id === product._id);
            if (idx > -1) {
                cart[idx].quantity = (cart[idx].quantity || 1) + selectedQty;
            } else {
                cart.push({ ...product, quantity: selectedQty });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API}/products/getRiceById/${id}`);
                const data = await res.json();
                // Nếu trả về data.rice là mảng, lấy phần tử đầu tiên
                let rice = data.rice || (data.data && data.data.rice);
                if (Array.isArray(rice)) rice = rice[0];
                if (rice) {
                    setProduct(rice);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex flex-col items-center gap-4 lg:w-1/2">
                        <Image
                            src={product.images && product.images[0] ? product.images[0] : "/assets/st25.jpg"}
                            alt={product.name}
                            width={320}
                            height={320}
                            className="rounded-lg object-cover w-full h-80"
                        />
                        <div className="flex gap-2">
                            {(product.images && product.images.length > 1
                                ? product.images
                                : [product.images && product.images[0] ? product.images[0] : "/assets/st25.jpg"]
                            ).map((img, i) => (
                                <Image
                                    key={i}
                                    src={img || "/assets/st25.jpg"}
                                    alt={`Thumbnail ${i + 1}`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <p className="text-lg font-medium text-red-500">
                            Giá: {Number(product.price).toLocaleString()}đ
                        </p>
                        <div>
                            <h3 className="text-base font-medium">Số Lượng</h3>
                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5, 10, 20].map((qty) => (
                                    <button
                                        key={qty}
                                        className={`px-4 py-2 rounded-md border ${selectedQty === qty ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                        onClick={() => setSelectedQty(qty)}
                                    >
                                        {qty}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600"
                            onClick={addToCart}
                        >
                            Thêm vào giỏ hàng
                        </button>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Mô tả</h3>
                            <p className="text-gray-700 mt-2">{product.description}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Thông tin chi tiết</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Xuất xứ: {product.origin || "Việt Nam"}</li>
                                <li>Loại gạo: {product.type || product.name}</li>
                                <li>Trọng lượng: {product.size || "1kg, 5kg, 10kg"}</li>
                                <li>Hạn sử dụng: {product.expiry || "12 tháng"}</li>
                                <li>Bảo quản: {product.storage || "Nơi khô ráo, tránh ánh nắng"}</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Hướng dẫn sử dụng</h3>
                            <p className="text-gray-700 mt-2">
                                {product.usage || "Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;