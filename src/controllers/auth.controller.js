const AuthService = require("../services/auth.service");
const cors = require('cors');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { accessToken, refreshToken, user } = await AuthService.login(username, password);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 1 * 60 * 60 * 1000
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 2 * 60 * 60 * 1000
            });
            res.status(200).json({
                message: "Đăng nhập thành công!",
                user: user,
                accessToken: accessToken
            });
        } catch (error) {
            res.status(401).json({
                message: "Lỗi đăng nhập",
                error: error.message
            });
        }
    }

    async register(req, res) {
        try {
            const user = await AuthService.register(req.body);
            res.status(200).json({
                message: "Đăng ký thành công",
                data: user
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi đăng ký",
                error: error.message
            });
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) res.status(400).json({ message: "Không tìm thấy token để đăng xuất." });
            await AuthService.logout(req.user.id, refreshToken);
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "Strict"
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "Strict"
            });
            res.status(200).json({
                message: "Đăng xuất thành công!"
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi đăng xuất",
                error: error.message
            });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await AuthService.forgotPassword(email);
            res.status(200).json({
                message: "Email đặt lại mật khẩu đã được gửi"
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi hệ thống",
                error: error.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            
            console.log('Reset password request:', { token, newPassword });
            
            if (!token || !newPassword) {
                return res.status(400).json({
                    message: "Token và mật khẩu mới là bắt buộc"
                });
            }

            const result = await AuthService.resetPassword(token, newPassword);
            
            res.status(200).json({
                message: "Mật khẩu đã được đặt lại thành công",
                data: result
            });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({
                message: "Lỗi hệ thống",
                error: error.message
            });
        }
    }
}

module.exports = new AuthController();