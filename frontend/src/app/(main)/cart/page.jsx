"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getCartKey = () => {
    if (typeof window !== "undefined") {
        // Ưu tiên lấy userId, có thể thay bằng email nếu thích
        const userId = localStorage.getItem("currentUser");
        return userId ? `cart_user_${userId}` : "cart_guest";
    }
    return "cart_guest";
};

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    // Lấy cart khi vào trang, theo user hiện tại
    useEffect(() => {
        if (typeof window !== "undefined") {
            const key = getCartKey();
            const cart = JSON.parse(localStorage.getItem(key) || "[]");
            setProducts(cart);
        }
    }, []);

    // Khi tăng/giảm số lượng, lưu lại đúng key
    const handleQuantityChange = (idx, newQty) => {
        const updated = [...products];
        updated[idx].quantity = Number(newQty);
        setProducts(updated);
        if (typeof window !== "undefined") {
            const key = getCartKey();
            localStorage.setItem(key, JSON.stringify(updated));
        }
    };

    // Khi xóa sản phẩm, lưu lại đúng key
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

    const subtotal = products.reduce((sum, p) => sum + Number(p.price) * (p.quantity || 1), 0);
    const shipping = products.length ? 50000 : 0;
    const tax = products.length ? 8320 : 0;
    const total = subtotal + shipping + tax;

    const formatCurrency = (value) =>
        value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className="mx-auto max-w-7xl p-8">
            <h1 className="text-2xl font-bold mb-5 mt-10 ">Giỏ hàng</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10 gap-10">
                    {products.length === 0 && <p>Giỏ hàng trống.</p>}
                    {products.map((product, idx) => (
                        <div key={product._id || idx} className="flex shadow border border-gray-600 items-center gap-4 pb-6">
                            <div className="w-24 h-28 relative">
                                <Image
                                    src={product.images && product.images[0] ? product.images[0] : "/assets/st25.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-semibold">{product.name}</h2>
                                <p className="mt-1 font-medium">{formatCurrency(Number(product.price))}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                            <div className='items-center'>
                                <p className="text-sm text-gray-600">
                                    {product.size ? `Số Ký: ${product.size}` : ''}
                                </p>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <select
                                    className="border rounded px-2 py-1 text-sm text-gray-600"
                                    value={product.quantity || 1}
                                    onChange={(e) => handleQuantityChange(idx, e.target.value)}
                                >
                                    {[1, 2, 3, 4].map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="text-3xl mb-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeProduct(idx)}
                                    title="Xóa sản phẩm"
                                >×</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 p-6 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Tạm tính</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>{formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thuế</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-base">
                            <span>Tổng cộng</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                    <button
                        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium"
                        onClick={handleCheckout}
                        disabled={products.length === 0}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;