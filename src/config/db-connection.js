const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Đã kết nối MongoDB");
    } catch (error) {
        console.error(`❌ Lỗi khi kết nối tới MongoDB: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on("connected", () => {
    console.log("🔗 Kết nối MongoDB đã được thiết lập");
});

mongoose.connection.on("error", (error) => {
    console.error(`🚨 Lỗi kết nối với MongoDB ${error}`);
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Hủy kết nối MongoDB");
});

module.exports = connectDB;