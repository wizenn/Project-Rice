import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({
    searchTerm, setSearchTerm,
    filterStatus, setFilterStatus,
    filterRole, setFilterRole
}) => (
    <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc địa chỉ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex gap-2">
            <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
            >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="suspended">Tạm khóa</option>
            </select>
            <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
            >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên</option>
                <option value="moderator">Điều hành viên</option>
                <option value="user">Người dùng</option>
            </select>
        </div>
    </div>
);

export default Search;