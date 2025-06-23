"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getCartKey = () => {
    if (typeof window !== "undefined") {
        const userId = localStorage.getItem("currentUser");
        return userId ? `cart_user_${userId}` : "cart_guest";
    }
    return "cart_guest";
};

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const key = getCartKey();
            const cart = JSON.parse(localStorage.getItem(key) || "[]");
            setProducts(cart);
        }
    }, []);

    const handleWeightChange = (idx, newWeight) => {
        if (newWeight < 5) return;
        const updated = [...products];
        updated[idx].selectedWeight = Number(newWeight);
        setProducts(updated);
        if (typeof window !== "undefined") {
            const key = getCartKey();
            localStorage.setItem(key, JSON.stringify(updated));
        }
    };

    const increaseWeight = (idx) => {
        const currentWeight = products[idx].selectedWeight || 25;
        handleWeightChange(idx, currentWeight + 5);
    };

    const decreaseWeight = (idx) => {
        const currentWeight = products[idx].selectedWeight || 25;
        if (currentWeight > 5) {
            handleWeightChange(idx, currentWeight - 5);
        }
    };

    const removeProduct = (idx) => {
        const updated = products.filter((_, i) => i !== idx);
        setProducts(updated);
        if (typeof window !== "undefined") {
            const key = getCartKey();
            localStorage.setItem(key, JSON.stringify(updated));
        }
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    // Tính tổng trọng lượng trong giỏ hàng
    const totalWeight = products.reduce((sum, p) => sum + (p.selectedWeight || 25), 0);

    // Tính số túi vận chuyển và phí ship
    const totalShippingBags = Math.ceil(totalWeight / 50);

    // Tính subtotal, VAT 10%, phí vận chuyển theo túi
    const subtotal = products.reduce((sum, p) => sum + Number(p.price) * (p.selectedWeight || 25), 0);
    const tax = products.length ? Math.round(subtotal * 0.1) : 0; // 10% VAT
    const shippingPerBag = 50000; // 50k per bag
    const shipping = products.length ? totalShippingBags * shippingPerBag : 0;
    const total = subtotal + shipping + tax;

    const formatCurrency = (value) =>
        value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className="min-h-screen bg-rice-white">
            <div className="mx-auto max-w-7xl px-3 py-4 sm:p-6 md:p-8">
                <div className="pt-10 sm:pt-14">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-rice-teal-dark mb-6 flex items-center gap-2 sm:gap-3">
                        🛒 Giỏ hàng của bạn
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
                        <div className="lg:col-span-2 space-y-4 md:space-y-6">
                            {products.length === 0 && (
                                <div className="text-center py-16 bg-rice-white border-2 border-dashed border-rice-gray-medium rounded-xl">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-xl font-semibold text-rice-teal-dark mb-2">
                                        Giỏ hàng của bạn đang trống
                                    </h3>
                                    <p className="text-rice-teal-light mb-6">
                                        Hãy khám phá các sản phẩm gạo chất lượng cao của chúng tôi
                                    </p>
                                    <button
                                        onClick={() => router.push('/productlist')}
                                        className="bg-rice-teal hover:bg-rice-teal-dark text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-rice"
                                    >
                                        🌾 Khám phá sản phẩm
                                    </button>
                                </div>
                            )}

                            {products.map((product, idx) => (
                                <div key={product._id || idx} className="bg-rice-white border border-rice-gray-light rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-rice-lg transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                                        {/* Hình ảnh sản phẩm */}
                                        <div className="w-20 h-20 sm:w-28 sm:h-28 relative flex-shrink-0 border-2 border-rice-gray-light rounded-lg sm:rounded-xl overflow-hidden">
                                            <Image
                                                src={product.images && product.images[0] ? product.images[0] : "/assets/st25.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Thông tin sản phẩm */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <h2 className="font-bold text-base sm:text-lg text-rice-teal-dark">{product.name}</h2>
                                                <span className="bg-rice-teal-dark text-black px-2 py-1 rounded-full text-xs font-medium">
                                                    Premium
                                                </span>
                                            </div>

                                            <p className="text-rice-teal font-semibold text-base sm:text-xl mb-2">
                                                {formatCurrency(Number(product.price))}/kg
                                            </p>
                                            <p className="text-xs sm:text-sm text-rice-teal-light mb-4 line-clamp-2">{product.description}</p>

                                            {/* Thông tin trọng lượng */}
                                            <div className="bg-rice-gray-bg border border-rice-gray-light rounded-lg p-3 sm:p-4 mb-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-rice-teal">⚖️</span>
                                                        <span className="font-medium text-rice-teal">Trọng lượng:</span>
                                                        <span className="text-rice-teal-dark font-bold">
                                                            {product.selectedWeight || 25} kg
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                        <span className="text-rice-teal">📦</span>
                                                        <span className="font-medium text-rice-teal">Số túi ship:</span>
                                                        <span className="text-rice-teal-dark font-bold">
                                                            {Math.ceil((product.selectedWeight || 25) / 50)} túi
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Điều chỉnh trọng lượng */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <span className="text-xs sm:text-sm font-medium text-rice-teal">Điều chỉnh:</span>
                                                    <div className="flex items-center border-2 border-rice-gray-medium rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => decreaseWeight(idx)}
                                                            disabled={(product.selectedWeight || 25) <= 5}
                                                            className={`px-3 py-2 sm:px-4 font-bold transition-all duration-300 ${(product.selectedWeight || 25) <= 5
                                                                ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed'
                                                                : 'bg-rice-teal text-black hover:bg-rice-teal-dark'
                                                                }`}
                                                        >
                                                            −
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="5"
                                                            step="5"
                                                            value={product.selectedWeight || 25}
                                                            onChange={(e) => handleWeightChange(idx, e.target.value)}
                                                            className="w-14 sm:w-20 px-2 py-2 text-center border-l border-r border-rice-gray-medium focus:outline-none focus:ring-2 focus:ring-rice-teal text-rice-teal-dark font-bold"
                                                        />
                                                        <button
                                                            onClick={() => increaseWeight(idx)}
                                                            className="px-3 py-2 sm:px-4 bg-rice-teal hover:bg-rice-teal-dark text-black font-bold transition-all duration-300"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-rice-teal-light font-medium">kg</span>
                                                </div>

                                                {/* Nút xóa */}
                                                <button
                                                    onClick={() => removeProduct(idx)}
                                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-all duration-300 hover:scale-105 mt-2 sm:mt-0"
                                                    title="Xóa sản phẩm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm font-medium">Xóa</span>
                                                </button>
                                            </div>

                                            {/* Tổng giá tiền cho sản phẩm này */}
                                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-rice-gray-light">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs sm:text-sm text-rice-teal">Thành tiền:</span>
                                                    <span className="text-base sm:text-xl font-bold text-rice-teal">
                                                        {formatCurrency(Number(product.price) * (product.selectedWeight || 25))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tóm tắt đơn hàng */}
                        <div className="bg-rice-white border-2 border-rice-teal rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg h-fit lg:sticky lg:top-24 mt-4 lg:mt-0">
                            <h2 className="text-lg md:text-xl font-bold text-rice-teal-dark mb-4 md:mb-6 flex items-center gap-2">
                                📋 Tóm tắt đơn hàng
                            </h2>

                            {/* Tổng quan */}
                            {products.length > 0 && (
                                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-rice-gray-bg border border-rice-gray-light rounded-lg">
                                    <div className="text-xs sm:text-sm text-rice-teal space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2">
                                                <span>⚖️</span>
                                                <span>Tổng trọng lượng:</span>
                                            </span>
                                            <span className="font-bold text-rice-teal-dark">
                                                {totalWeight} kg
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2">
                                                <span>📦</span>
                                                <span>Số túi vận chuyển:</span>
                                            </span>
                                            <span className="font-bold text-rice-teal-dark">
                                                {totalShippingBags} túi
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3 md:space-y-4 text-xs sm:text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-rice-teal">Tạm tính</span>
                                    <span className="font-semibold text-rice-teal-dark">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-rice-teal">Thuế VAT (10%)</span>
                                    <span className="font-semibold text-rice-teal-dark">{formatCurrency(tax)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-rice-teal">
                                        Phí vận chuyển ({totalShippingBags} túi × {formatCurrency(shippingPerBag)})
                                    </span>
                                    <span className="font-semibold text-rice-teal-dark">{formatCurrency(shipping)}</span>
                                </div>
                                <div className="border-t-2 border-rice-gray-medium pt-3 md:pt-4 flex justify-between items-center font-bold text-base md:text-lg">
                                    <span className="text-rice-teal-dark">Tổng cộng</span>
                                    <span className="text-rice-teal text-lg md:text-xl">{formatCurrency(total)}</span>
                                </div>
                            </div>

                            {/* Thông tin phí vận chuyển */}
                            {products.length > 0 && (
                                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="text-xs text-yellow-800">
                                            <p className="font-semibold mb-1">Chính sách vận chuyển:</p>
                                            <ul className="space-y-1">
                                                <li>• Phí ship: {formatCurrency(shippingPerBag)}/túi</li>
                                                <li>• 50kg = 1 túi vận chuyển</li>
                                                <li>• Giao hàng 2-3 ngày làm việc</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
                                <button
                                    className={`w-full py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-300 transform ${products.length === 0
                                        ? 'bg-rice-gray-light text-rice-teal-light cursor-not-allowed'
                                        : 'bg-rice-teal hover:bg-rice-teal-dark text-black hover:scale-105 shadow-rice hover:shadow-rice-lg'
                                        }`}
                                    onClick={handleCheckout}
                                    disabled={products.length === 0}
                                >
                                    {products.length === 0 ? '🛒 Giỏ hàng trống' : '💳 Tiến hành thanh toán'}
                                </button>

                                {products.length > 0 && (
                                    <button
                                        onClick={() => router.push('/productlist')}
                                        className="w-full bg-rice-gray-light hover:bg-rice-gray-medium text-rice-teal-dark py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                                    >
                                        🌾 Tiếp tục mua sắm
                                    </button>
                                )}
                            </div>

                            {/* Thông tin bảo mật */}
                            {products.length > 0 && (
                                <div className="mt-4 md:mt-6 p-2 md:p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-xs text-green-800 font-medium">
                                            🔒 Thanh toán an toàn & bảo mật
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;