const CategoryModal = require('../models/categoryModel')

// create category
const createCategory = async(req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new CategoryModal({ name });
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
}

// get list category
const getListCategorys = async (req, res) => {
    try {
        //filter search by name
        const { name } = req.query;
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        const category = await CategoryModal.find(query);
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// get category by id
const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModal.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Loại sản phẩm không tồn tại" });
        }
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const category = await CategoryModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Loại sản phẩm không tồn tại" });
        }
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModal.findByIdAndDelete(req.params.id);
        if(!category) {
            return res.status(404).json({ message: "Loại sản phẩm không tồn tại" });
        }
        res.status(200).json({ message: "Xóa thành công!" });
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

module.exports = { createCategory, getListCategorys, getCategoryById, updateCategory, deleteCategory };