const userRepository = require('../repositories/userRepository');
const UserService = require('../services/userService');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                message: "Lấy danh sách người dùng thành công",
                data: users
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi lấy dữ liệu người dùng",
                data: users
            });
        }
    }

    async findUserById(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            res.status(200).json({
                message: "Tìm thấy người dùng",
                data: user
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi tìm người dùng",
                error: err.message
            });
        }
    }

    async findUserByUsername(req, res) {
        try {
            const user = await UserService.findUserByUsername(req.params.username);
            res.status(200).json({
                message: "Tìm thấy người dùng",
                data: user
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi tìm người dùng",
                error: err.message
            });
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(200).json({
                message: "Thêm hướng dẫn viên thành công",
                data: user
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi thêm hướng dẫn viên",
                error: err.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật thành công",
                data: user
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi cập nhật người dùng",
                error: err.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            await userRepository.deleteUser(req.params.id);
            res.status(200).json({
                message: "Xóa thành công"
            });
        }catch(err) {
            res.status(200).json({
                message: "Lỗi khi xóa người dùng",
                error: err.message
            });
        }
    }
}
module.exports = new UserController();