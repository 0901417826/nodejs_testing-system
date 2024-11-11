const express = require('express')
const morgan = require('morgan')

const userRoutes = require('../src/routes/UserRouter')
const { connectDB } = require('../src/config/database');
const app = express()

//Đọc file .env
require('dotenv').config();

//Connect DB
connectDB()

//HTTP logger
app.use(morgan('combined'))

// Middleware để xử lý body request
app.use(express.json());

app.use('/shop', userRoutes);

app.listen(process.env.HOST, () => {
  console.log(`Server đang chạy tại http://localhost:${process.env.HOST}`);
});