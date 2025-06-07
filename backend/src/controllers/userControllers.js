const user_services = require('../services/userServices');

// Lấy danh sách tất cả người dùng (test)
exports.getAllUsers = async (req, res) => {
    console.log("Xin chào, đây là route getAllUsers");
    return res.status(200).json({
        message: "Xin chào từ máy chủ!"
    });
};

// Đăng ký người dùng mới
// exports.registerUser = async (req, res) => {
//     console.log("Dữ liệu nhận được từ client:", req.body);

//     const { email, phone, password, name } = req.body;

//     // Gọi service để xử lý đăng ký
//     const result = await user_services.registerUser_Services(name, email, password, phone);

//     console.log("Kết quả trả về từ service:", result);

//     if (result && result.EC === 0) {
//         return res.status(200).json({
//             EC: 0,
//             message: "Đăng ký tài khoản thành công!",
//             result: result.user
//         });
//     } else {
//         return res.status(409).json({
//             EC: -1,
//             message: result?.message || "Email đã tồn tại trong hệ thống.",
//             result: null
//         });
//     }
// };
// đăng ký admin
exports.registerUser = async (req, res) => {
    console.log("Dữ liệu nhận được từ client:", req.body);

    const { email, phone, password, name, role } = req.body;

    // Gọi service để xử lý đăng ký
    const result = await user_services.registerUser_Services(name, email, password, phone, role);

    console.log("Kết quả trả về từ service:", result);

    if (result && result.EC === 0) {
        return res.status(200).json({
            EC: 0,
            message: "Đăng ký tài khoản thành công!",
            result: result.user
        });
    } else {
        return res.status(409).json({
            EC: -1,
            message: result?.message || "Email đã tồn tại trong hệ thống.",
            result: null
        });
    }
};



// Đăng nhập
exports.loginUser = async (req, res) => {
    console.log("Dữ liệu đăng nhập:", req.body);

    const { email, password } = req.body;

    const result = await user_services.loginUser_Services(email, password);

    if (result.EC === 0) {
        return res.status(200).json({
            EC: 0,
            message: result.message,
            token: result.token
        });
    } else {
        return res.status(401).json({
            EC: -1,
            message: result.message
        });
    }
};

// Route test quyền truy cập (ví dụ: admin)
exports.testUser = async (req, res) => {
    console.log("Thông tin người dùng sau khi xác thực:", req.user);

    return res.status(200).json({
        message: "Chào mừng bạn! Đây là trang dành cho admin hoặc người dùng đã xác thực."
    });
};
