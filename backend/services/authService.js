const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const validateUserFields = require('../util/validateUserFields');
const Jwt = require('../util/jwt');
const redisClient = require('../config/redisClient');
const EmailService = require('../services/emailService');
const crypto = require('crypto');

class AuthService {
    async register(user, res) {
        try {
            await validateUserFields(user.username, user.email, user.phone);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const newUser = await UserRepository.createUser(user);

            const [accessToken, refreshToken] = await Promise.all([
                Jwt.generateAccessToken(newUser),
                Jwt.generateRefreshToken(newUser)
            ]);

            await redisClient.set(newUser._id.toString(), refreshToken, { EX: 24 * 60 * 60 });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            const { password, ...others } = newUser.toObject();
            return { others, accessToken };
        } catch (error) {
            console.error(`❌ Error registering user: ${error.message}`);
            throw error;
        }
    }

    async login(username, password, res) {
        try {
            const user = await UserRepository.findUserByUsername(username);
            if (!user) throw new Error("Username not found");
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!validPassword) throw new Error("Invalid password");
            if (user && validPassword) {
                const accessToken = Jwt.generateAccessToken(user);
                const refreshToken = Jwt.generateRefreshToken(user);
                await redisClient.set(user._id.toString(), refreshToken, { EX: 1 * 24 * 60 * 60 });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });
                const { password, ...others } = user.toObject();
                return { others, accessToken };
            }
        } catch (error) {
            console.error(`❌ Error loging user: ${error.message}`);
            throw error;
        }
    }

    async logout(req, res) {
        try {
            const userId = req.user.id;
            const tokenExists = await redisClient.get(userId.toString());

            if (tokenExists) {
                await redisClient.del(userId.toString());
            }

            res.clearCookie('refreshToken');
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            console.error(`❌ Error logging out: ${error.message}`);
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const user = await UserRepository.findUserByEmail(email);
            if (!user) throw new Error("Email không tồn tại");

            // Tạo token đặt lại mật khẩu
            const token = crypto.randomBytes(32).toString('hex');
            await UserRepository.saveResetToken(user.id, token);

            // Gửi email đặt lại mật khẩu
            const resetLink = `http://yourfrontend.com/reset-password?token=${token}`;
            const emailContent = `
                <h3>Xin chào ${user.username}!</h3>
                <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để tiếp tục:</p>
                <a href="${resetLink}">Đặt lại mật khẩu</a>
                <p>Nếu không phải bạn, vui lòng bỏ qua email này.</p>`;

            await EmailService.sendMail(email, "Đặt lại mật khẩu", emailContent);

            return { message: "Gửi email đặt lại mật khẩu thành công" };
        } catch (error) {
            console.error(`❌ Lỗi khi gửi email đặt lại mật khẩu: ${error.message}`);
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const user = await UserRepository.findUserByToken(token);
            if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");
    
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await UserRepository.updatePassword(user.id, hashedPassword);
    
            // Xóa token sau khi reset xong
            await UserRepository.clearResetToken(user.id);
    
            return { message: "Mật khẩu đã được cập nhật" };
        } catch (error) {
            console.error(`❌ Lỗi khi đặt lại mật khẩu: ${error.message}`);
            throw error;
        }
    }    
}

module.exports = new AuthService();