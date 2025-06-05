require('dotenv').config();
const mongoose = require('mongoose');
const Connection = () => {
    // Kết nối MongoDB
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = Connection;