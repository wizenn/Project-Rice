const userServices = require('../services/userServices');

// Hàm kiểm tra quyền admin (không phân biệt hoa/thường)
const isAdmin = (role) => role && role.toLowerCase() === 'admin';

exports.getAllUsers = async (req, res) => {
    try {
        if (!isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: 'Bạn không có quyền truy cập danh sách người dùng.',
                data: null,
            });
        }
        const result = await userServices.getAllUsers_Services();
        return res.status(result.EC === 0 ? 200 : 500).json(result);
    } catch (error) {
        console.error('Lỗi server:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server không xác định.',
            data: null,
        });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { email, phone, password, name, role } = req.body;
        // Chỉ admin mới được tạo tài khoản admin
        if (role && role.toLowerCase() === 'admin' && !isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: 'Chỉ admin mới có thể tạo tài khoản admin.',
                data: null,
            });
        }
        const result = await userServices.registerUser_Services(name, email, password, phone, role || 'user');
        return res.status(result.EC === 0 ? 200 : 409).json(result);
    } catch (error) {
        console.error('Lỗi khi đăng ký người dùng:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server khi đăng ký người dùng.',
            data: null,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                EC: -1,
                message: 'Vui lòng cung cấp email và mật khẩu.',
                data: null,
            });
        }
        const result = await userServices.loginUser_Services(email, password);
        return res.status(result.EC === 0 ? 200 : 401).json(result);
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server khi đăng nhập.',
            data: null,
        });
    }
};

exports.testUser = async (req, res) => {
    try {
        return res.status(200).json({
            EC: 0,
            message: 'Chào mừng bạn! Đây là trang dành cho người dùng đã xác thực.',
            data: req.user,
        });
    } catch (error) {
        console.error('Lỗi khi kiểm tra quyền truy cập:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server khi kiểm tra quyền truy cập.',
            data: null,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { UserId } = req.params;
        const userId = req.user?.userID;
        // Kiểm tra quyền
        if (String(userId) !== String(UserId) && !isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: 'Bạn không có quyền xóa tài khoản này.',
                data: null,
            });
        }
        const result = await userServices.findByIdAndDelete(UserId);
        return res.status(result.EC === 0 ? 200 : 404).json(result);
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server khi xóa tài khoản.',
            data: null,
        });
    }
};

// NÊN viết thêm service updateUserService trong userServices!
exports.updateUser = async (req, res) => {
    try {
        const { UserId } = req.params;
        const { name, email, phone, address, role } = req.body;
        const userId = req.user?.userID;

        if (String(userId) !== String(UserId) && !isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: 'Bạn không có quyền cập nhật thông tin người dùng này.',
                data: null,
            });
        }
        if (role && !isAdmin(req.user?.role)) {
            return res.status(403).json({
                EC: -1,
                message: 'Chỉ admin mới có thể thay đổi vai trò.',
                data: null,
            });
        }
        // Gọi service chuẩn hóa update user
        const result = await userServices.updateUserService(UserId, { name, email, phone, address, role });
        return res.status(result.EC === 0 ? 200 : 404).json(result);
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        return res.status(500).json({
            EC: -1,
            message: 'Lỗi server khi cập nhật thông tin người dùng.',
            data: null,
        });
    }
};