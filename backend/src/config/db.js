const mongoose = require('mongoose');
require('dotenv').config();

const Connection = async () => {
    // Kết nối MongoDB
    // console.log(process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Dừng server nếu không kết nối được DB
    }

}

module.exports = Connection;