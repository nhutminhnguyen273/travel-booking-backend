const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log("🔗 MongoDB connection established");
});

mongoose.connection.on('error', (err) => {
    console.error("🚨 MongoDB connection error: ", err);
});

mongoose.connection.on('disconnected', () => {
    console.warn("⚠️ MongoDB disconnected");
});

module.exports = connectDB;