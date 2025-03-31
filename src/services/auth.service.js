const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("../utils/jwt.util");
const crypto = require("crypto");
const sendResetEmail = require("./email.service");

class AuthService {
    async register(user) {
        try {
            const [existingUsername, existingEmail, existingPhone] = await Promise.all([
                user.username ? User.findOne({ username: user.username }) : null,
                user.email ? User.findOne({ email: user.email }) : null,
                user.phone ? User.findOne({ phone: user.phone }) : null
            ]);
            if (existingUsername) {
                throw new Error(`Username ${user.username} đã tồn tại.`);
            }
            if (existingEmail) {
                throw new Error(`Email ${user.email} đã tồn tại.`)
            }
            if (existingPhone) {
                throw new Error(`Số điện thoại ${user.phone} đã tồn tại.`);
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newUser = new User({
                username: user.username,
                fullName: user.fullName,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                email: user.email,
                phone: user.phone,
                permission: user.permission || [],
                password: hashedPassword
            });
            await newUser.save();
            const { password, ...others } = newUser.toObject();
            return others;
        } catch (error) {
            console.error(`❌ Lỗi khi đăng ký tài khoản: ${error.message}`);
            throw error;
        }
    }

    async login(username, password) {
        try {
            const user = await User.findOne({ username });
            if (!user) throw new Error(`Username ${username} không tồn tại.`);
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!validPassword) throw new Error("Mật khẩu không chính xác.");
            const accessToken = JWT.generateAccessToken(user);
            const refreshToken = JWT.generateRefreshToken(user);
            if (!accessToken || !refreshToken) throw new Error("Không thể tạo token");
            user.refreshToken = refreshToken;
            await user.save();
            return { accessToken, refreshToken, user };
        } catch (error) {
            console.error(`❌ Lỗi khi đăng nhập: ${error.message}`);
            throw error;
        }
    }

    async logout(userId, refreshToken) {
        try {
            return await User.deleteOne({ userId, refreshToken: refreshToken });
        } catch (error) {
            console.error(`❌ Lỗi khi đăng xuất: ${error.message}`);
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Email không tồn tại");
            const resetToken = crypto.randomBytes(32).toString("hex");
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save();
            return await sendResetEmail(email, resetToken);
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật mật khẩu: ${error.message}`);
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });
            if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");
            user.password = newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            return await user.save();
        } catch (error) {
            console.error(`❌ Lỗi khi đặt lại mật khẩu: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new AuthService();