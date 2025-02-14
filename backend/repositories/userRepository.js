const UserModel = require('../models/userModel');

class UserRepository {
    async getAllUsers() {
        return await UserModel.find();
    }

    async findUserById(id) {
        return await UserModel.findById(id);
    }

    async findUserByUsername(username) {
        return await UserModel.findOne({ username });
    }

    async findUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findUserByPhone(phone) {
        return await UserModel.findOne({ phone });
    }

    async createUser(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }

    async updateUser(id, userData) {
        return await UserModel.findByIdAndUpdate(id, userData, { new: true })
    }

    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}
module.exports = new UserRepository();