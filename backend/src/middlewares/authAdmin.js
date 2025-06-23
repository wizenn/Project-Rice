const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token. Truy cập bị từ chối.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role && decoded.role.toLowerCase() === 'admin') {
            req.user = decoded;
            return next();
        }
        return res.status(403).json({ message: 'Bạn không phải admin. Truy cập bị từ chối.' });
    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};
module.exports = authAdmin;