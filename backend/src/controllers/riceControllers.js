const rice_services = require('../services/riceServices')



exports.getAllRiceProducts = async (req, res) => {
    try {
        const result = await rice_services.getAllRiceProducts();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm gạo:", error);
        return res.status(500).json({
            EC: -1,
            message: "Lỗi server khi lấy danh sách sản phẩm gạo."
        });
    }
};

exports.getRiceById = async (req, res) => {
    try {
        const rice = await rice_services.getRiceById(req.params.id);
        if (!rice) {
            return res.status(404).json({ EC: -1, message: "Không tìm thấy sản phẩm" });
        }
        return res.status(200).json({ EC: 0, rice });
    } catch (error) {
        return res.status(500).json({ EC: -1, message: "Lỗi server" });
    }
};

exports.createRiceProduct = async (req, res) => {
    try {
        const { name, price, description, images } = req.body;
        // Lấy userId từ token (authAdmin đã xác thực)
        const userId = req.user?.userID;

        if (!name || !price || !description || !images) {
            return res.status(400).json({
                EC: -1,
                message: "Thiếu thông tin cần thiết để tạo sản phẩm gạo."
            });
        }

        const riceData = { name, price, description, images, userId };
        const result = await rice_services.createRice_Services(riceData);

        if (result.EC === 0) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm gạo:", error);
        return res.status(500).json({
            EC: -1,
            message: "Lỗi server khi tạo sản phẩm gạo."
        });
    }
};


exports.updateRiceProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, images } = req.body;

        if (!id || !name || !price || !description || !images) {
            return res.status(400).json({
                EC: -1,
                message: "Thiếu thông tin cần thiết để cập nhật sản phẩm gạo."
            });
        }

        const riceData = { id, name, price, description, images };
        const result = await rice_services.updateRice_Services(riceData);

        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm gạo:", error);
        return res.status(500).json({
            EC: -1,
            message: "Lỗi server khi cập nhật sản phẩm gạo."
        });
    }
}

exports.deleteRiceProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                EC: -1,
                message: "Thiếu ID sản phẩm gạo để xóa."
            });
        }
        const result = await rice_services.deleteRice_Services(id);
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            message: "Lỗi server khi xóa sản phẩm gạo."
        });
    }
}