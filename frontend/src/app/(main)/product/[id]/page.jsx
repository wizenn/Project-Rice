"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import API from "@/configs/endpoint";
import ReviewSection from "@/components/review";
const getCartKey = () => {
    if (typeof window !== "undefined") {
        const userId = localStorage.getItem("currentUser");
        return userId ? `cart_user_${userId}` : "cart_guest";
    }
    return "cart_guest";
};

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedWeight, setSelectedWeight] = useState(25);

    const addToCart = () => {
        if (!product) return;
        let cart = [];
        if (typeof window !== "undefined") {
            const key = getCartKey();
            cart = JSON.parse(localStorage.getItem(key) || "[]");
            const idx = cart.findIndex((p) => p._id === product._id);
            if (idx > -1) {
                cart[idx].selectedWeight = (cart[idx].selectedWeight || 25) + selectedWeight;
            } else {
                cart.push({ ...product, selectedWeight: selectedWeight });
            }
            localStorage.setItem(key, JSON.stringify(cart));
            alert("✅ Đã thêm vào giỏ hàng!");
        }
    };

    const increaseWeight = () => setSelectedWeight(prev => prev + 5);
    const decreaseWeight = () => {
        if (selectedWeight > 5) setSelectedWeight(prev => prev - 5);
    };

    const handleWeightChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setSelectedWeight(value);
        } else if (e.target.value === "") {
            setSelectedWeight(5);
        }
    };

    const handleWeightBlur = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 5) {
            setSelectedWeight(5);
        }
    };

    const calculateShippingInfo = () => {
        if (!product) return { totalWeight: 0, shippingBags: 0, shippingCost: 0 };
        const totalWeight = selectedWeight;
        const shippingBags = Math.ceil(totalWeight / 50);
        const shippingCost = shippingBags * 50000;
        return { totalWeight, shippingBags, shippingCost };
    };

    const formatCurrency = (value) =>
        value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API}/products/getRiceById/${id}`);
                const data = await res.json();
                if (data && data.rice) {
                    setProduct(data.rice);
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

    if (loading) return (
        <div className="min-h-screen bg-rice-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin w-16 h-16 border-4 border-rice-gray-light border-t-rice-teal rounded-full mx-auto mb-4"></div>
                <p className="text-lg text-rice-teal-dark">Đang tải chi tiết sản phẩm...</p>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-rice-white flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-xl text-rice-teal-dark">Không tìm thấy sản phẩm.</p>
            </div>
        </div>
    );

    const shippingInfo = calculateShippingInfo();
    const pricePerKg = Number(product.price);
    const totalProductCost = pricePerKg * selectedWeight;

    return (
        <div className="bg-rice-white min-h-screen pt-16">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Product Images */}
                    <div className="flex flex-col items-center gap-4 lg:w-1/2">
                        <div className="relative w-full max-w-md aspect-square border-3 border-rice-teal rounded-2xl overflow-hidden shadow-rice-xl">
                            <Image
                                src={product.images && product.images[0] ? product.images[0] : "/assets/no-image.png"}
                                alt={product.name || "Ảnh sản phẩm"}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="flex gap-2">
                            {(product.images && product.images.length > 1
                                ? product.images
                                : [product.images && product.images[0] ? product.images[0] : "/assets/st25.jpg"]
                            ).map((img, i) => (
                                <div key={i} className="relative w-16 h-16 border-2 border-rice-gray-light rounded-lg overflow-hidden">
                                    <Image
                                        src={img || "/assets/st25.jpg"}
                                        alt={`Thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-rice-teal-dark mb-4">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold text-rice-teal">
                                💰 {formatCurrency(pricePerKg)}/kg
                            </p>
                        </div>

                        {/* Order Info Card */}
                        <div className="bg-rice-gray-bg border-2 border-rice-teal rounded-xl p-6 shadow-lg">
                            <h4 className="font-bold text-rice-teal-dark mb-4 flex items-center gap-2">
                                📋 Thông tin đặt hàng
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-rice-teal">Trọng lượng chọn:</span>
                                    <span className="font-bold text-rice-teal-dark">{selectedWeight} kg</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-rice-teal">Số túi vận chuyển:</span>
                                    <span className="font-bold text-rice-teal-dark">{shippingInfo.shippingBags} túi</span>
                                </div>
                                <div className="col-span-2 flex justify-between pt-2 border-t border-rice-gray-light">
                                    <span className="text-rice-teal">Phí vận chuyển:</span>
                                    <span className="font-bold text-rice-teal">
                                        {formatCurrency(shippingInfo.shippingCost)}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-rice-teal-light">
                                ℹ️ Phí vận chuyển: 50,000₫/túi (50kg = 1 túi vận chuyển)
                            </div>
                        </div>

                        {/* Weight Selector */}
                        <div>
                            <h3 className="text-lg font-bold text-rice-teal-dark mb-4">
                                ⚖️ Chọn số kg gạo
                            </h3>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center border-2 border-rice-gray-light rounded-lg overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={decreaseWeight}
                                        disabled={selectedWeight <= 5}
                                        className={`px-4 py-3 font-bold transition-all duration-300 ${selectedWeight <= 5
                                            ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed opacity-50'
                                            : 'bg-rice-teal text-black hover:bg-rice-teal-dark'
                                            }`}
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="5"
                                        step="5"
                                        value={selectedWeight}
                                        onChange={handleWeightChange}
                                        onBlur={handleWeightBlur}
                                        className="w-20 px-4 py-3 text-center border-l border-r border-rice-gray-light focus:outline-none font-bold text-rice-teal-dark"
                                    />
                                    <button
                                        type="button"
                                        onClick={increaseWeight}
                                        className="bg-rice-teal hover:bg-rice-teal-dark text-black px-4 py-3 font-bold transition-all duration-300"
                                    >
                                        +
                                    </button>
                                </div>

                                <span className="text-sm font-medium text-rice-teal-light">kg</span>

                                <div className="flex gap-2 flex-wrap">
                                    <span className="text-sm text-rice-teal-light self-center">Chọn nhanh:</span>
                                    {[25, 50, 75, 100].map((weight) => (
                                        <button
                                            key={weight}
                                            type="button"
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedWeight === weight
                                                ? 'bg-rice-teal-dark text-black border-2 border-rice-teal-dark'
                                                : 'bg-rice-gray-light text-rice-teal border-2 border-rice-gray-light hover:bg-rice-gray-medium'
                                                }`}
                                            onClick={() => setSelectedWeight(weight)}
                                        >
                                            {weight}kg
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-rice-gray-bg border-2 border-rice-teal-dark rounded-xl p-6 shadow-lg">
                            <h4 className="font-bold text-rice-teal-dark mb-4 flex items-center gap-2">
                                🧾 Tóm tắt đơn hàng
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-rice-teal">
                                        Giá sản phẩm ({selectedWeight}kg × {formatCurrency(pricePerKg)})
                                    </span>
                                    <span className="font-bold text-rice-teal-dark">
                                        {formatCurrency(totalProductCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-rice-teal">
                                        Phí vận chuyển ({shippingInfo.shippingBags} túi × 50,000₫)
                                    </span>
                                    <span className="font-bold text-rice-teal-dark">
                                        {formatCurrency(shippingInfo.shippingCost)}
                                    </span>
                                </div>
                                <div className="border-t border-rice-gray-light pt-3 flex justify-between font-bold text-lg">
                                    <span className="text-rice-teal">Tổng tạm tính</span>
                                    <span className="text-rice-teal">
                                        {formatCurrency(totalProductCost + shippingInfo.shippingCost)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="w-full bg-rice-teal hover:bg-rice-teal-dark text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-rice-xl"
                            onClick={addToCart}
                        >
                            🛒 Thêm {selectedWeight}kg vào giỏ hàng
                        </button>

                        {/* Product Description */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-rice-teal-dark mb-3">
                                    📝 Mô tả sản phẩm
                                </h3>
                                <p className="text-rice-teal leading-relaxed">
                                    {product.description || "Sản phẩm gạo chất lượng cao, đảm bảo an toàn vệ sinh thực phẩm."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-rice-teal-dark mb-3">
                                    ℹ️ Thông tin chi tiết
                                </h3>
                                <div className="bg-rice-gray-bg border border-rice-gray-light rounded-lg p-4">
                                    <ul className="space-y-2 text-rice-teal">
                                        <li className="flex items-center gap-2">
                                            <span className="text-rice-teal">🌾</span>
                                            <strong>Xuất xứ:</strong> {product.origin || "Việt Nam"}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-rice-teal">🍚</span>
                                            <strong>Loại gạo:</strong> {product.type || product.name}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-rice-teal">⚖️</span>
                                            <strong>Đơn vị bán:</strong> Per kg
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-rice-teal">📅</span>
                                            <strong>Hạn sử dụng:</strong> {product.expiry || "12 tháng"}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-rice-teal">🏠</span>
                                            <strong>Bảo quản:</strong> {product.storage || "Nơi khô ráo, tránh ánh nắng"}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Shipping Policy */}
                            <div>
                                <h3 className="text-xl font-bold text-rice-teal-dark mb-3">
                                    🚚 Chính sách vận chuyển
                                </h3>
                                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl">📦</div>
                                        <div className="text-sm text-yellow-800">
                                            <p className="font-bold text-rice-teal-dark mb-2">Thông tin vận chuyển:</p>
                                            <ul className="space-y-1">
                                                <li>• Phí vận chuyển: 50,000₫ cho mỗi túi vận chuyển</li>
                                                <li>• Quy đổi: 50kg gạo = 1 túi vận chuyển</li>
                                                <li>• Ví dụ: 25kg = 50k, 75kg = 100k, 125kg = 150k</li>
                                                <li>• Giao hàng trong vòng 2-3 ngày làm việc</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Usage Guide */}
                            <div>
                                <h3 className="text-xl font-bold text-rice-teal-dark mb-3">
                                    👩‍🍳 Hướng dẫn sử dụng
                                </h3>
                                <p className="text-rice-teal leading-relaxed">
                                    {product.usage || "Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác. Vo sạch gạo trước khi nấu để đảm bảo chất lượng tốt nhất."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <ReviewSection productId={product._id} />
            </div>

        </div>
    );
};

export default ProductDetail;