const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }catch(err) {
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
}
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});