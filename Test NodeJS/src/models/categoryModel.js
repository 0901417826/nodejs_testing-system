const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name : { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("Category", CategorySchema);