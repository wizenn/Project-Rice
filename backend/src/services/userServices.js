const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Hàm kiểm tra ObjectId hợp lệ
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Lấy danh sách tất cả người dùng (chỉ dùng cho admin)
exports.getAllUsers_Services = async () => {
    try {
        const users = await User.find().select(
            'name email phone address role status createdAt lastLogin'
        );
        return {
            EC: 0,
            message: 'Lấy danh sách người dùng thành công.',
            data: users,
        };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        return {
            EC: -1,
            message: 'Lỗi server khi lấy danh sách người dùng.',
            data: null,
        };
    }
};

// Đăng ký người dùng mới (hỗ trợ cả user và admin)
exports.registerUser_Services = async (name, email, password, phone, role = 'user') => {
    try {
        // Validation đầu vào
        if (!name || !email || !password) {
            return {
                EC: -1,
                message: 'Vui lòng cung cấp đầy đủ tên, email và mật khẩu.',
                data: null,
            };
        }

        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                EC: -1,
                message: 'Email không hợp lệ.',
                data: null,
            };
        }

        // Kiểm tra email đã tồn tại
        const checkUser = await User.findOne({ email: email.toLowerCase() });
        if (checkUser) {
            return {
                EC: -1,
                message: 'Email đã được sử dụng. Vui lòng chọn email khác.',
                data: null,
            };
        }

        // Kiểm tra role hợp lệ
        if (!['user', 'Admin'].includes(role)) {
            return {
                EC: -1,
                message: 'Vai trò không hợp lệ. Chỉ chấp nhận "user" hoặc "Admin".',
                data: null,
            };
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone: phone ? phone.trim() : undefined,
            role,
        });

        const savedUser = await newUser.save();

        return {
            EC: 0,
            message: 'Đăng ký thành công!',
            data: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                role: savedUser.role,
                createdAt: savedUser.createdAt,
            },
        };
    } catch (error) {
        console.error('Lỗi khi đăng ký người dùng:', error);
        return {
            EC: -1,
            message: 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.',
            data: null,
        };
    }
};

// Đăng nhập người dùng
exports.loginUser_Services = async (email, password) => {
    try {
        // Validation đầu vào
        if (!email || !password) {
            return {
                EC: -1,
                message: 'Vui lòng cung cấp email và mật khẩu.',
                data: null,
            };
        }

        // Kiểm tra người dùng
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return {
                EC: -1,
                message: 'Email không tồn tại trong hệ thống.',
                data: null,
            };
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                EC: -1,
                message: 'Mật khẩu không đúng. Vui lòng kiểm tra lại.',
                data: null,
            };
        }

        // Tạo JWT token
        if (!process.env.JWT_SECRET) {
            return {
                EC: -1,
                message: 'JWT_SECRET không được định nghĩa trong biến môi trường.',
                data: null,
            };
        }

        const payload = {
            userID: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            EC: 0,
            message: 'Đăng nhập thành công!',
            data: {
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    phone: user.phone,
                    address: user.address,
                    createdAt: user.createdAt,
                },
            },
        };
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        return {
            EC: -1,
            message: 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.',
            data: null,
        };
    }
};

// Tìm tất cả người dùng (trả về mảng, không trả object)
exports.find = async () => {
    try {
        const users = await User.find().select('name email phone address role createdAt');
        return users;
    } catch (error) {
        console.error('Lỗi khi tìm tất cả người dùng:', error);
        return [];
    }
};

// Tìm người dùng theo ID
exports.findById = async (id) => {
    try {
        if (!isValidObjectId(id)) {
            return {
                EC: -1,
                message: 'ID không hợp lệ.',
                data: null,
            };
        }
        const user = await User.findById(id).select('name email phone address role createdAt');
        if (!user) {
            return {
                EC: -1,
                message: 'Không tìm thấy người dùng.',
                data: null,
            };
        }
        return {
            EC: 0,
            message: 'Tìm người dùng thành công.',
            data: user,
        };
    } catch (error) {
        console.error('Lỗi khi tìm người dùng theo ID:', error);
        return {
            EC: -1,
            message: 'Lỗi server khi tìm người dùng theo ID.',
            data: null,
        };
    }
};

// Xóa người dùng theo ID
exports.findByIdAndDelete = async (id) => {
    try {
        if (!isValidObjectId(id)) {
            return {
                EC: -1,
                message: 'ID không hợp lệ.',
                data: null,
            };
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return {
                EC: -1,
                message: 'Không tìm thấy người dùng để xóa.',
                data: null,
            };
        }
        return {
            EC: 0,
            message: 'Xóa người dùng thành công.',
            data: user,
        };
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        return {
            EC: -1,
            message: 'Lỗi server khi xóa người dùng.',
            data: null,
        };
    }
};