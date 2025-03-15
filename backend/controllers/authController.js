const AuthService = require('../services/authService');

class AuthController {
    async register(req, res) {
        try {
            const user = await AuthService.register(req.body, res);
            res.status(200).json({
                message: "Register successfully",
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async login(req, res) {
        try {
            const user = await AuthService.login(req.body.username, req.body.password, res);
            res.status(200).json({
                message: "Login successfully",
                tokens: {
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                },
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async logout(req, res) {
        try {
            res.status(200).json(await AuthService.logout(req, res));
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async forgotPassword(req, res) {
        try {
            const {email} = req.body;
            const response = await AuthService.forgotPassword(email);
            res.status(200).json({
                message: response
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            const response = await AuthService.resetPassword(token, newPassword);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: "Lỗi", error: error.message });
        }
    }
    
}
module.exports = new AuthController();