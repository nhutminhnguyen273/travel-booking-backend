const UserRepository = require('../repositories/userRepository');
const validateUserFields = require('../util/validateUserFields');

class UserService {
    async getListUsers() {
        try {
            return await UserRepository.getListUsers();
        } catch (error) {
            console.error(`❌ Error fetching users: ${error.message}`);
            throw error;
        }
    }

    async getListUsersDeleted() {
        try {
            return await UserRepository.getListUsers({ isDeleted: true });
        } catch (error) {
            console.error(`❌ Error fetching deleted users: ${error.message}`);
        }
    }

    async findUserById(id) {
        try {
            return await UserRepository.findUserById(id);
        } catch (error) {
            console.error(`❌ Error finding user by ID: ${error.message}`);
            throw error;
        }
    }

    async createUser(user) {
        try {
            await validateUserFields(user.username, user.email, user.phone);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const newUser = await UserRepository.createUser(user);
            return await UserRepository.createUser(newUser);
        } catch (error) {
            console.error(`❌ Error creating user: ${error.message}`);
            throw error;
        }
    }

    async updateUser(id, input) {
        try {
            const user = await UserRepository.findUserById(id);
            if (!user) throw new Error("User not found");
            await validateUserFields(input.username, input.email, input.phone, id);
            return await UserRepository.updateUser(id, input);
        } catch (error) {
            console.error(`❌ Error updating user: ${error.message}`);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await UserRepository.findUserById(id);
            if (!user) throw new Error("User not found");
            return await UserRepository.deleteUser(id);
        } catch (error) {
            console.error(`❌ Error deleting user: ${error.message}`);
            throw error;
        }
    }

    async restoreUser(id) {
        try {
            const user = await UserRepository.findUserById(id);
            if (!user) throw new Error("User not found");
            return await UserRepository.restoreUser(id);
        } catch (error) {
            console.error(`❌ Error restoring user: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserService();