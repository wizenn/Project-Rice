const mongoose = require('mongoose');

const riceProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],

    // Các trường bổ sung từ component ProductDetail:
    origin: { type: String, default: "Việt Nam" },        // Xuất xứ
    type: { type: String },                                // Loại gạo
    size: { type: String },                                // Trọng lượng (vd: "1kg, 5kg, 10kg")
    expiry: { type: String, default: "12 tháng" },         // Hạn sử dụng
    storage: { type: String, default: "Nơi khô ráo, tránh ánh nắng" }, // Bảo quản
    usage: { type: String, default: "Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác..." }, // HDSD
});

const RiceProduct = mongoose.model('RiceProduct', riceProductSchema);
module.exports = RiceProduct;
