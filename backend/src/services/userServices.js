const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký user
// exports.registerUser_Services = async (name, email, password, phone) => {
//     try {
//         const checkUser = await User.findOne({ email: email });

//         if (checkUser) {
//             return {
//                 EC: -1,
//                 message: "Email đã được sử dụng. Vui lòng chọn email khác."
//             };
//         }

//         const salt = await bcrypt.genSalt(10); // Tạo salt với độ mạnh 10
//         const newPass = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             name,
//             email,
//             password: newPass,
//             phone
//         });

//         const user = await newUser.save(); // thêm await để đợi lưu thành công

//         if (user) {
//             return {
//                 EC: 0,
//                 message: "Đăng ký thành công!",
//                 user
//             };
//         } else {
//             return {
//                 EC: -1,
//                 message: "Không thể lưu người dùng mới vào cơ sở dữ liệu."
//             };
//         }

//     } catch (error) {
//         console.log("Lỗi khi đăng ký người dùng:", error);
//         return {
//             EC: -1,
//             message: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau."
//         };
//     }
// };
//đăng ký admin
// ...existing code...
exports.registerUser_Services = async (name, email, password, phone, role = "user") => {
    try {
        const checkUser = await User.findOne({ email: email });

        if (checkUser) {
            return {
                EC: -1,
                message: "Email đã được sử dụng. Vui lòng chọn email khác."
            };
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: newPass,
            phone,
            role // thêm dòng này để lưu role
        });

        const user = await newUser.save();

        if (user) {
            return {
                EC: 0,
                message: "Đăng ký thành công!",
                user
            };
        } else {
            return {
                EC: -1,
                message: "Không thể lưu người dùng mới vào cơ sở dữ liệu."
            };
        }

    } catch (error) {
        console.log("Lỗi khi đăng ký người dùng:", error);
        return {
            EC: -1,
            message: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau."
        };
    }
};



// Đăng nhập
exports.loginUser_Services = async (email, password) => {
    try {
        const checkUser = await User.findOne({ email: email });

        if (!checkUser) {
            return {
                EC: -1,
                message: "Email không tồn tại trong hệ thống."
            };
        }

        const pass = checkUser.password;
        console.log("Mật khẩu đã mã hóa trong DB:", pass);

        const checkPass = await bcrypt.compare(password, pass);
        console.log("Kết quả so sánh mật khẩu:", checkPass);

        if (!checkPass) {
            return {
                EC: -1,
                message: "Mật khẩu không đúng. Vui lòng kiểm tra lại."
            };
        }

        const payload = {
            userID: checkUser._id,
            email: checkUser.email,
            role: checkUser.role,
            name: checkUser.name
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            EC: 0,
            message: "Đăng nhập thành công!",
            token
        };

    } catch (error) {
        console.log("Lỗi khi đăng nhập:", error);
        return {
            EC: -1,
            message: "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau."
        };
    }
};
