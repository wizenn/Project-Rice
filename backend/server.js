const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Connection = require('./src/config/db');





const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./src/routes/userRoutes');
const riceRoutes = require('./src/routes/riceRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const orderRouter = require('./src/routes/orderRouters');

Connection(); // Kết nối MongoDB
const dashboardRoutes = require('./src/routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/products', riceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRouter);
// Route test
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});