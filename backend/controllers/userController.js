const UserService = require('../services/userService');

class UserController {
    async getListUsers(req, res) {
        try {
            const listUsers = await UserService.getListUsers();
            res.status(200).json({
                message: "List users",
                data: listUsers
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async getListUserDeleted(req, res) {
        try {
            const listUsers = await UserService.getListUsersDeleted();
            res.status(200).json({
                message: "List deleted users",
                data: listUsers
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async findUserById(req, res) {
        try {
            const tour = await UserService.findUserById(req.params.id);
            res.status(200).json({
                message: "Finded user",
                data: tour
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(200).json({
                message: "Created user",
                data: newUser
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: "Updated user",
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.status(200).json({
                message: "Deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async restoreUser(req, res) {
        try {
            await UserService.restoreUser(req.params.id);
            res.status(200).json({
                message: "Restored successfully"
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }
}
module.exports = new UserController();