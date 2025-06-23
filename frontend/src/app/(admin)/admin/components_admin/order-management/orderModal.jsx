import { useState } from 'react';
import { XCircle, Trash2 } from 'lucide-react';
import axios from 'axios';
import API from '@/configs/endpoint';
import OrderHistory from '../history-management/adminHistory';

const OrderModal = ({ showModal, setShowModal, modalType, selectedOrder, fetchOrders, token, orders }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        products: [{ name: '', quantity: 1, price: 0 }],
        shippingAddress: '',
        paymentMethod: 'COD',
        notes: '',
    });

    const orderStatuses = {
        pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
        processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
        delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800' },
        cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
        shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...formData.products];
        newProducts[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
        setFormData((prev) => ({ ...prev, products: newProducts }));
    };

    const addProduct = () => {
        setFormData((prev) => ({
            ...prev,
            products: [...prev.products, { name: '', quantity: 1, price: 0 }],
        }));
    };

    const removeProduct = (index) => {
        setFormData((prev) => ({
            ...prev,
            products: prev.products.filter((_, i) => i !== index),
        }));
    };

    const resetForm = () => {
        setFormData({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            products: [{ name: '', quantity: 1, price: 0 }],
            shippingAddress: '',
            paymentMethod: 'COD',
            notes: '',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const handleCreateOrder = async () => {
        try {
            const res = await axios.post(
                `${API}/orders/createOrder`,
                {
                    cartItems: formData.products.map((p) => ({
                        productId: p.productId || '684954cd2fc65705d054d2df', // Thay bằng ID sản phẩm thực tế
                        quantity: p.quantity,
                        price: p.price,
                    })),
                    shippingInfo: {
                        street: formData.shippingAddress,
                        city: 'Hồ Chí Minh',
                        postalCode: '70000',
                        country: 'Việt Nam',
                    },
                    paymentMethod: formData.paymentMethod,
                    notes: formData.notes,
                    // Thêm các trường nếu API yêu cầu
                    customerName: formData.customerName,
                    customerEmail: formData.customerEmail,
                    customerPhone: formData.customerPhone,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Phản hồi từ API:', res.data);
            if (res.data.EC === 0) {
                await fetchOrders();
                setShowModal(false);
                resetForm();
            } else {
                alert(res.data.message || 'Tạo đơn hàng thất bại');
            }
        } catch (error) {
            console.error('Lỗi tạo đơn hàng:', error);
            alert('Đã có lỗi xảy ra khi tạo đơn hàng');
        }
    };

    const handleUpdateOrder = async () => {
        try {
            const res = await axios.put(
                `${API}/orders/updateOrder/${selectedOrder.id}`,
                {
                    customerName: formData.customerName,
                    customerEmail: formData.customerEmail,
                    customerPhone: formData.customerPhone,
                    products: formData.products,
                    shippingAddress: formData.shippingAddress,
                    paymentMethod: formData.paymentMethod,
                    notes: formData.notes,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.EC === 0) {
                await fetchOrders();
                setShowModal(false);
                resetForm();
            } else {
                alert(res.data.message || 'Cập nhật đơn hàng thất bại');
            }
        } catch (error) {
            console.error('Lỗi cập nhật đơn hàng:', error);
        }
    };


    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {modalType === 'create' && 'Tạo Đơn Hàng Mới'}
                            {modalType === 'edit' && 'Chỉnh Sửa Đơn Hàng'}
                            {modalType === 'view' && 'Chi Tiết Đơn Hàng'}
                            {modalType === 'history' && 'Lịch Sử Giao Dịch'}
                        </h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <XCircle size={24} />
                        </button>
                    </div>

                    {(modalType === 'create' || modalType === 'edit') && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                modalType === 'create' ? handleCreateOrder() : handleUpdateOrder();
                            }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên Khách Hàng *</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="customerEmail"
                                        value={formData.customerEmail}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số Điện Thoại *</label>
                                    <input
                                        type="tel"
                                        name="customerPhone"
                                        value={formData.customerPhone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phương Thức Thanh Toán</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="COD">COD</option>
                                        <option value="Banking">Chuyển khoản</option>
                                        <option value="Credit Card">Thẻ tín dụng</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Địa Chỉ Giao Hàng *</label>
                                <textarea
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Sản Phẩm *</label>
                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        + Thêm sản phẩm
                                    </button>
                                </div>
                                {formData.products.map((product, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="md:col-span-2">
                                            <input
                                                type="text"
                                                placeholder="Tên sản phẩm"
                                                value={product.name}
                                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Số lượng"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Giá"
                                                min="0"
                                                value={product.price}
                                                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                                                required
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            {formData.products.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="text-red-600 hover:text-red-800 px-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi Chú</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    {modalType === 'create' ? 'Tạo Đơn Hàng' : 'Cập Nhật'}
                                </button>
                            </div>
                        </form>
                    )}

                    {modalType === 'view' && selectedOrder && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thông Tin Khách Hàng</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Tên:</span> {selectedOrder.customerName}</p>
                                        <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                                        <p><span className="font-medium">Điện thoại:</span> {selectedOrder.customerPhone}</p>
                                        <p><span className="font-medium">Địa chỉ:</span> {selectedOrder.shippingAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thông Tin Đơn Hàng</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Mã đơn:</span> {selectedOrder.id}</p>
                                        <p><span className="font-medium">Ngày đặt:</span> {new Date(selectedOrder.orderDate).toLocaleDateString('vi-VN')}</p>
                                        <p><span className="font-medium">Thanh toán:</span> {selectedOrder.paymentMethod}</p>
                                        <p>
                                            <span className="font-medium">Trạng thái:</span>
                                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${orderStatuses[selectedOrder.status].color}`}>
                                                {orderStatuses[selectedOrder.status].label}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Sản Phẩm</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {selectedOrder.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-4 text-sm text-gray-900">{product.name}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-900">{product.quantity}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(product.price)}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(product.quantity * product.price)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        Tổng cộng: {formatCurrency(selectedOrder.totalAmount)}
                                    </p>
                                </div>
                            </div>

                            {selectedOrder.notes && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ghi Chú</h3>
                                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedOrder.notes}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {modalType === 'history' && <OrderHistory orders={orders} />}
                </div>
            </div>
        </div>
    );
};

export default OrderModal;