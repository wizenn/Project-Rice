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

Connection(); // Kết nối MongoDB


app.use('/api/users', userRoutes);
app.use('/api/products', riceRoutes);

// Route test
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});