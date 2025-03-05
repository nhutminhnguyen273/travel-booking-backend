const User = require('../models/user');

class UserRepository {
    async getListUsers() {
        try {
            return await User.find({ isDeleted: false });
        } catch (error) {
            console.error(`Error fetching users ${error.message}`);
            throw error;
        }
    }

    async getListUserDeleted() {
        try {
            return await User.find({ isDeleted: true });
        } catch (error) {
            console.error(`Error fetching user deleted ${error.message}`);
            throw error;
        }
    }

    async findUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error(`Error finding user by id ${error.message}`);
            throw error;
        }
    }

    async findUserByUsername(username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
            console.error(`Error finding user by username ${error.message}`);
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            console.error(`Error finding user by email ${error.message}`);
            throw error;
        }
    }

    async findUserByPhone(phone) {
        try {
            return await User.findOne({ phone });
        } catch (error) {
            console.error(`Error finding user by phone ${error.message}`);
        }
    }

    async createUser(user) {
        try {
            return await User.create(user);
        } catch (error) {
            console.log(`Error creating user ${error.message}`);
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            return await User.findByIdAndUpdate(id, user, { new: true });
        } catch (error) {
            console.log(`Error updating user ${error.message}`);
        }
    }

    // Xóa mềm 
    async deleteUser(id) {
        try {
            return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            console.log(`Error deleting user by id ${error.message}`);
        }
    }

    // Khôi phục user đã xóa
    async restoreUser(id) {
        try {
            return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            console.log(`Error restoring user by id ${error.message}`);
        }
    }
};

module.exports = new UserRepository();