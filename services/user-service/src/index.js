const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch(error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
}
connectDB();

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log("Server is running");
});