import { X } from 'lucide-react';
import API from '@/configs/endpoint';

export default function ProductModal({
    showModal,
    setShowModal,
    editingProduct,
    formData,
    handleSubmit,
    handleInputChange,
    handleImageUpload,
    removeImage,
    riceTypes,
    riceSizes,
}) {
    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
            onClick={() => setShowModal(false)}
        >
            <div className="absolute inset-0 bg-gray-500 opacity-75 transition-opacity"></div>
            <div
                className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-xl transform transition-all overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập mô tả sản phẩm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Giá (VNĐ) *</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Xuất xứ</label>
                                <input
                                    type="text"
                                    value={formData.origin}
                                    onChange={(e) => handleInputChange('origin', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Việt Nam"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Loại gạo</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Chọn loại gạo</option>
                                    {riceTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trọng lượng</label>
                                <select
                                    value={formData.size}
                                    onChange={(e) => handleInputChange('size', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Chọn trọng lượng</option>
                                    {riceSizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hạn sử dụng</label>
                                <input
                                    type="text"
                                    value={formData.expiry}
                                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="12 tháng"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cách bảo quản</label>
                                <input
                                    type="text"
                                    value={formData.storage}
                                    onChange={(e) => handleInputChange('storage', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nơi khô ráo, tránh ánh nắng"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hướng dẫn sử dụng</label>
                                <textarea
                                    rows={2}
                                    value={formData.usage}
                                    onChange={(e) => handleInputChange('usage', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh sản phẩm</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formData.images.length > 0 && (
                                    <div className="mt-3 grid grid-cols-4 gap-2">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={
                                                        typeof image === 'string'
                                                            ? image.startsWith('http')
                                                                ? image
                                                                : `${API}${image}`
                                                            : URL.createObjectURL(image)
                                                    }
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}