import Image from 'next/image';
import { Package, DollarSign, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  formatPrice,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={
              product.images[0].startsWith('http')
                ? product.images[0]
                : product.images[0].startsWith('/uploads')
                  ? `http://localhost:8080${product.images[0]}`
                  : product.images[0]
            }
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="text-gray-400" size={48} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={14} className="text-green-600" />
            <span className="font-semibold text-green-600">{formatPrice(product.price)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package size={14} />
            <span>{product.type} - {product.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{product.origin}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>HSD: {product.expiry}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
            Sửa
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}