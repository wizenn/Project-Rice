import { Plus } from 'lucide-react';

export default function Header({ onAddProduct }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm gạo</h1>
            <p className="text-gray-600 mt-1">Thêm, chỉnh sửa và quản lý các sản phẩm gạo</p>
          </div>
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Thêm sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}