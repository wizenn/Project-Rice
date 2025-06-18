const RiceProduct = require('../models/riceModels');
const mongoose = require('mongoose');

// Lấy danh sách tất cả sản phẩm gạo
exports.getAllRiceProducts = async () => {
    try {
        const products = await RiceProduct.find();
        return {
            EC: 0,
            message: "Lấy danh sách sản phẩm gạo thành công!",
            rice: products
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm gạo:", error);
        return {
            EC: -1,
            message: "Lỗi khi lấy danh sách sản phẩm gạo.",
            rice: []
        };
    }
};

// Lấy sản phẩm gạo theo ID
exports.getRiceById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                EC: -1,
                message: "ID không hợp lệ.",
                rice: null
            };
        }
        const rice = await RiceProduct.findById(id);
        if (rice) {
            return {
                EC: 0,
                message: "Lấy thông tin sản phẩm gạo thành công!",
                rice: rice
            };
        } else {
            return {
                EC: -1,
                message: "Không tìm thấy sản phẩm gạo.",
                rice: null
            };
        }
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm gạo theo ID:", error);
        return {
            EC: -1,
            message: "Lỗi server khi lấy sản phẩm gạo.",
            rice: null
        };
    }
};

// Tạo sản phẩm gạo mới
exports.createRice_Services = async (riceData) => {
    try {
        if (!riceData.userId) {
            return {
                EC: -1,
                message: "Bạn cần đăng nhập để tạo sản phẩm gạo.",
                rice: null
            };
        }

        const newRice = new RiceProduct({
            ...riceData,
            createdBy: riceData.userId
        });

        const savedRice = await newRice.save();

        return {
            EC: 0,
            message: "Tạo sản phẩm gạo thành công!",
            rice: savedRice
        };
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm gạo:", error);
        return {
            EC: -1,
            message: "Đã xảy ra lỗi trong quá trình tạo sản phẩm gạo. Vui lòng thử lại sau.",
            rice: null
        };
    }
};

// Cập nhật sản phẩm gạo
exports.updateRice_Services = async (riceData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(riceData.id)) {
            return { EC: -1, message: "ID không hợp lệ.", rice: null };
        }

        // Chỉ cập nhật các trường được truyền lên
        const updateFields = {};
        if (riceData.name !== undefined) updateFields.name = riceData.name;
        if (riceData.price !== undefined) updateFields.price = riceData.price;
        if (riceData.description !== undefined) updateFields.description = riceData.description;
        if (riceData.images !== undefined) updateFields.images = riceData.images;

        const updated = await RiceProduct.findByIdAndUpdate(
            riceData.id,
            updateFields,
            { new: true }
        );

        if (updated) {
            return { EC: 0, message: "Cập nhật thành công!", rice: updated };
        } else {
            return { EC: -1, message: "Không tìm thấy sản phẩm để cập nhật.", rice: null };
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm gạo:", error);
        return { EC: -1, message: "Lỗi khi cập nhật sản phẩm.", rice: null };
    }
};

// Xóa sản phẩm gạo
exports.deleteRice_Services = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { EC: -1, message: "ID không hợp lệ.", rice: null };
        }
        const deleted = await RiceProduct.findByIdAndDelete(id);
        if (deleted) {
            return { EC: 0, message: "Xóa sản phẩm thành công!", rice: deleted };
        } else {
            return { EC: -1, message: "Không tìm thấy sản phẩm để xóa.", rice: null };
        }
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm gạo:", error);
        return { EC: -1, message: "Lỗi khi xóa sản phẩm.", rice: null };
    }
};