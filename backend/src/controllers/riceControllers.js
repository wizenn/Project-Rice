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
        const { id } = req.params;
        const rice = await RiceProduct.findById(id);
        if (!rice) {
            return res.status(404).json({ EC: 1, message: "Không tìm thấy sản phẩm gạo", rice: null });
        }
        return res.status(200).json({
            EC: 0,
            message: "Lấy thông tin sản phẩm gạo thành công!",
            rice, // trả về object trực tiếp
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ EC: -1, message: "Lỗi server", rice: null });
    }
};

exports.createRiceProduct = async (req, res) => {
    try {
        const { name, price, description, origin, type, size, expiry, storage, usage } = req.body;

        // Lấy các file ảnh mới từ Cloudinary
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => file.path); // link ảnh Cloudinary
        }

        if (!name || !price || !description) {
            return res.status(400).json({ EC: -1, message: "Thiếu thông tin sản phẩm" });
        }

        const userId = req.user?.userID;
        const riceData = {
            name,
            price: Number(price),
            description,
            images: newImages, // chỉ cần truyền mảng link ảnh mới
            origin,
            type,
            size,
            expiry,
            storage,
            usage,
            userId
        };

        const result = await rice_services.createRice_Services(riceData);

        return res.status(result.EC === 0 ? 201 : 400).json(result);

    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi tạo sản phẩm", error: error.message });
    }
};

exports.updateRiceProduct = async (req, res) => {
    try {
        const riceId = req.params.id;
        const {
            name, price, description, origin, type, size, expiry, storage, usage, oldImages
        } = req.body;

        // Lấy các ảnh cũ FE muốn giữ lại
        let images = [];
        if (oldImages) {
            // Nếu FE gửi 1 ảnh thì oldImages là string, nhiều ảnh là array
            images = Array.isArray(oldImages) ? oldImages : [oldImages];
        }

        // Lấy các link ảnh mới (vừa upload lên Cloudinary)
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => file.path); // đường link Cloudinary
        }

        // Gộp ảnh cũ + ảnh mới
        images = [...images, ...newImages];

        // Update sản phẩm
        const updatedRice = await RiceProduct.findByIdAndUpdate(
            riceId,
            { name, price, description, origin, type, size, expiry, storage, usage, images },
            { new: true }
        );

        return res.status(200).json({ EC: 0, message: "Cập nhật thành công!", rice: updatedRice });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ EC: -1, message: "Lỗi server khi cập nhật sản phẩm", error: error.message });
    }
};

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

