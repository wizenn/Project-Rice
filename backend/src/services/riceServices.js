
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RiceProduct = require('../models/riceModels');



exports.getAllRiceProducts = async () => {
    try {
        const products = await RiceProduct.find();
        return {
            EC: 0,
            message: "Lấy danh sách sản phẩm gạo thành công!",
            rice: products
        };
    } catch (error) {
        return {
            EC: -1,
            message: "Lỗi khi lấy danh sách sản phẩm gạo.",
            rice: []
        };
    }
};
exports.getRiceById = async (id) => {
    try {
        const rice = await RiceProduct.findById(id);
        return rice;
    } catch (error) {
        return null;
    }
};
exports.createRice_Services = async (riceData) => {
    try {
        if (!riceData.userId) {
            return {
                EC: -1,
                message: "Bạn cần đăng nhập để tạo sản phẩm gạo."
            };
        }

        const newRice = new RiceProduct({
            ...riceData,
            createdBy: riceData.userId
        });

        const savedRice = await newRice.save();

        if (savedRice) {
            return {
                EC: 0,
                message: "Tạo sản phẩm gạo thành công!",
                rice: savedRice
            };
        } else {
            return {
                EC: -1,
                message: "Không thể lưu sản phẩm gạo vào cơ sở dữ liệu."
            };
        }
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm gạo:", error);
        return {
            EC: -1,
            message: "Đã xảy ra lỗi trong quá trình tạo sản phẩm gạo. Vui lòng thử lại sau."
        };
    }
};



exports.updateRice_Services = async (riceData) => {
    console.log('riceData:', riceData);
    try {
        const updated = await RiceProduct.findByIdAndUpdate(
            riceData.id,

            {
                name: riceData.name,
                price: riceData.price,
                description: riceData.description,
                images: riceData.images
            },
            { new: true }
        );
        if (updated) {
            return { EC: 0, message: "Cập nhật thành công!", rice: updated };
        } else {
            return { EC: -1, message: "Không tìm thấy sản phẩm để cập nhật." };
        }
    } catch (error) {
        return { EC: -1, message: "Lỗi khi cập nhật sản phẩm." };
    }
};


exports.deleteRice_Services = async (id) => {
    try {
        const deleted = await RiceProduct.findByIdAndDelete(id);
        if (deleted) {
            return { EC: 0, message: "Xóa sản phẩm thành công!" };
        } else {
            return { EC: -1, message: "Không tìm thấy sản phẩm để xóa." };
        }
    } catch (error) {
        return { EC: -1, message: "Lỗi khi xóa sản phẩm." };
    }
}