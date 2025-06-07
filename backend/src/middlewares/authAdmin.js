// middlewares/authUser.js
const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    // Lấy token từ header
    const authHeader = req.headers.authorization;

    // Kiểm tra có token hay không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token. Truy cập bị từ chối.' });
    }

    const token = authHeader.split(' ')[1]; // Lấy token sau "Bearer"

    try {
        // Xác minh token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.role);
        //
        if (decoded.role === "Admin" || decoded.role === "admin") {
            req.user = decoded;
            return next(); // Dừng hàm ở đây!
        }
        return res.status(401).json({ message: ' Truy cập bị từ chối.' });

        // Gán thông tin người dùng vào req

    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};

module.exports = authAdmin;
