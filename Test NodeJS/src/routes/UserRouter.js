// routes/userRoutes.js
const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

// Định nghĩa các route cho API
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:id', getUserById);
router.get('/users', getAllUsers);

module.exports = router;
