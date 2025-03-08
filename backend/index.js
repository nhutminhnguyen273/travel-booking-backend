const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tours', tourRoutes);
app.use('/booking', bookingRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.error("❌ MongoDB Connection Failed: ", err);
});