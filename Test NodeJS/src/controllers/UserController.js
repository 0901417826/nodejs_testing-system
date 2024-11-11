const { User } = require('../models/UserModel');

// Tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const { name, description ,age, avatar } = req.body;
        const newUser = new User({ name, description, age, avatar });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo người dùng", error: error.message });
    }
};

// Lấy danh sách người dùng
const getAllUsers = async (req, res) => {
    try {
        //filter search by name
        const { name } = req.query;
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi từ hệ thống", error: error.message });
    }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi từ hệ thống", error: error.message });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi từ hệ thống", error: error.message });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json({ message: "Người dùng đã bị xóa" });
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi từ hệ thống", error: error.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser};
