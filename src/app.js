const express = require("express");
const connectDB = require("./config/db-connection");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoutes = require("./routes/auth.route");
const UserRoutes = require("./routes/user.route");
const TourRoutes = require("./routes/tour.route");
const ReviewRoutes = require("./routes/review.route");
const BookingRoutes = require("./routes/booking.route");
const FavoritesRoutes = require("./routes/favorites.route");
const StatisticalRoutes = require("./routes/statistical.route");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/tours", TourRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/favorites", FavoritesRoutes);
app.use("/api/statistical", StatisticalRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Đang chạy server trên port ${process.env.PORT}`);
    });
}).catch(error => {
    console.error(`❌ Kết nối MongoDB thất bại: ${error}`);
});