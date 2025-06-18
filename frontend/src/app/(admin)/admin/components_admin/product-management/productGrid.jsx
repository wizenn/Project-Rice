import { Package } from 'lucide-react';
import ProductCard from './productCard';


export default function ProductGrid({
    products,
    loading,
    onEdit,
    onDelete,
    formatPrice,
}) {
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Không tìm thấy sản phẩm nào</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    formatPrice={formatPrice}
                />
            ))}
        </div>
    );
}