const User = require('../models/user');

class UserRepository {
    async getListUsers() {
        try {
            return await User.find({ isDeleted: false });
        } catch (error) {
            throw error;
        }
    }

    async getListUserDeleted() {
        try {
            return await User.find({ isDeleted: true });
        } catch (error) {
            throw error;
        }
    }

    async findUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findUserByUsername(username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    async findUserByPhone(phone) {
        try {
            return await User.findOne({ phone });
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            return await User.create(user);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            return await User.findByIdAndUpdate(id, user, { new: true });
        } catch (error) {
            throw error;
        }
    }

    // Xóa mềm 
    async deleteUser(id) {
        try {
            return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            throw error;
        }
    }

    // Khôi phục user đã xóa
    async restoreUser(id) {
        try {
            return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            throw error;
        }
    }
};

module.exports = new UserRepository();