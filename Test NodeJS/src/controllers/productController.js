const ProductModal = require('../models/productsModel')
const CategoryModal = require('../models/categoryModel')
//Tạo sản phẩm mới
const createProducts = async(req, res) => {
    try {
        const { name, description, image, quantity, category } = req.body;
        // Kiểm tra id category tồn tại
        const categoryId = await CategoryModal.findById(category);
        if (!categoryId) {
            return res.status(400).json({ message: "categoryId does not exist" });
        }
        const response = new ProductModal({ name, description, image, quantity, category });
        await response.save();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
}

//Lấy danh sách sản phẩm
const getListProducts = async (req, res) => {
    try {
        // filter search by name
        const { name, category_id } = req.query;
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category_id) {
            query = { "category": category_id };
        }
        const response = await ProductModal.find(query).populate("category", "name").exec();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

//Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
    try {
        const response = await ProductModal.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
    try {
        const response = await ProductModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const response = await ProductModal.findByIdAndDelete(req.params.id);
        if(!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

module.exports = { createProducts, getListProducts, getProductById, updateProduct, deleteProduct };