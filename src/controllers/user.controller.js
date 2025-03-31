const UserService = require("../services/users.service");

class UserController {
    async getListUsers(req, res) {
        try {
            const users = await UserService.getList();
            res.status(200).json({
                message: "Lấy danh sách người dùng thành công",
                data: users
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            res.status(200).json({
                message: "Lấy thông tin người dùng thành công",
                data: user
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.create(req.body);
            res.status(200).json({
                message: "Thêm người dùng thành công",
                data: user
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.update(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật thông tin người dùng thành công",
                data: user
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                data: user
            }); 
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleted(req.params.id);
            res.status(200).json({
                message: "Xóa tài khoản thành công"
            });
        } catch (error) {
            res.status(200).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
    
    async restoreUser(req, res) {
        try {
            await UserService.restore(req.params.id);
            res.status(200).json({
                message: "Khôi phục tài khoản thành công"
            });
        } catch (error) {
            res.status(200).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new UserController();