const UserService = require('../services/userService');

class UserController {
    async getListUsers(req, res) {
        try {
            const listUsers = await UserService.getListUsers();
            res.status(200).json({
                message: "Danh sách người dùng",
                data: listUsers
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async getListUserDeleted(req, res) {
        try {
            const listUsers = await UserService.getListUsersDeleted();
            res.status(200).json({
                message: "Danh sách người dùng đã xóa",
                data: listUsers
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async findUserById(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            res.status(200).json({
                message: "Tìm người dùng",
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(200).json({
                message: "Tạo tài khoản người dùng",
                data: newUser
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật thông tin người dùng",
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.status(200).json({
                message: "Xóa tài khoản thành công"
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async restoreUser(req, res) {
        try {
            await UserService.restoreUser(req.params.id);
            res.status(200).json({
                message: "Khôi phục tài khoản thành công"
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async findUserByEmail(req, res) {
        try {
            const user = await UserService.findUserByEmail(req.body.email);
            res.status(200).json({
                message: "Thành công",
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Lỗi",
                error: err.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const user = await UserService.findUserByEmail(req.body.email);
        } catch (err) {
            res.status(404).json({
                message: "Error",
                error: err.message
            });
        }
    }
}
module.exports = new UserController();