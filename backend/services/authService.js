const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JwtUtil = require('../utils/jwtUtil');
const redisClient = require('../config/redisClient');

class AuthService {
    async register(userData) {
        const [existingUsername, existingEmail, existingPhone] = await Promise.all([
            UserRepository.findUserByUsername(userData.username),
            UserRepository.findUserByEmail(userData.email),
            UserRepository.findUserByPhone(userData.phone)
        ]);
        if (existingUsername) throw new Error("Username đã tồn tại");
        if (existingEmail) throw new Error("Email đã tồn tại");
        if (existingPhone) throw new Error("Số điện thoại đã tồn tại");
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        return await UserRepository.createUser(userData);
    }

    async login(username, password, res) {
        const user = await UserRepository.findUserByUsername(username);
        if (!user) throw new Error("Username không chính xác");
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) throw new Error("Mật khẩu không chính xác");
        if (user && validPassword) {
            const accessToken = JwtUtil.generateAccessToken(user);
            const refreshToken = JwtUtil.generateRefreshToken(user);
            await redisClient.set(user._id.toString(), refreshToken, { EX: 7 * 24 * 60 * 60 }); // Lưu trong 7 ngày
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            const { password, ...others } = user._doc;
            return { others, accessToken };
        }
    }

    async requestRefreshToken(req) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error("Bạn chưa đăng nhập");

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err) throw new Error("Token không hợp lệ");

            // Lấy refreshToken từ Redis để kiểm tra
            const storedToken = await redisClient.get(user._id.toString());
            if (storedToken !== refreshToken) throw new Error("Refresh Token không hợp lệ");

            const newAccessToken = JwtUtil.generateAccessToken(user);
            const newRefreshToken = JwtUtil.generateRefreshToken(user);

            // Cập nhật refreshToken trong Redis
            await redisClient.set(user._id.toString(), newRefreshToken, { EX: 7 * 24 * 60 * 60 });

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            return newAccessToken;
        });
    }

    async logout(req, res) {
        const userId = req.user.id;
        await redisClient.del(userId.toString()); // Xóa refreshToken trong Redis
        res.clearCookie("refreshToken");
        return {message: "Đăng xuất thành công"}
    }
}
module.exports = new AuthService();