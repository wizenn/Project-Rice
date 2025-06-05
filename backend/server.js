const express = require('express');

const cors = require('cors');
const Connection = require('./src/config/db');

require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

Connection(); // Kết nối MongoDB



// Route test
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});