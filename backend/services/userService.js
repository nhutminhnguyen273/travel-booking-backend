const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const Role = require('../enums/roleEnum');

class UserService {
    async getAllUsers() {
        return await UserRepository.getAllUsers();
    }

    async findUserById(id) {
        const user = await UserRepository.findUserById(id);
        if (user == null)
            throw new Error("Không tìm thấy người dùng");
        return user;
    }

    async findUserByUsername(username) {
        const user = await UserRepository.findUserByUsername(username);
        if (user == null)
            throw new Error("Không tìm thấy người dùng ", username);
        return user;
    }

    async createUser(userData) {
        const [existingUsername, existingEmail, existingPhone] = await Promise.all([
            UserRepository.findUserByUsername(userData.username),
            UserRepository.findUserByEmail(userData.email),
            UserRepository.findUserByPhone(userData.phone)
        ]);
        if (existingUsername) throw new Error("Username đã tồn tại");
        if (existingEmail) throw new Error("Email đã tồn tại");
        if (existingPhone) throw new Error("Số điện thoại đã tồn tại");
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        userData.role = Role.TOUR_GUIDE;
        return await UserRepository.createUser(userData);
    }

    async updateUser(id, userData) {
        const existingUser = await UserRepository.findUserById(id);
        if (!existingUser)
            throw new Error("Không tìm thấy người dùng");
        // Kiểm tra nếu username, email, phone khác và đã tồn tại
        const [existingUsername, existingEmail, existingPhone] = await Promise.all([
            userData.username && userData.username !== existingUser.username 
                ? UserRepository.findUserByUsername(userData.username) 
                : null,
            userData.email && userData.email !== existingUser.email 
                ? UserRepository.findUserByEmail(userData.email) 
                : null,
            userData.phone && userData.phone !== existingUser.phone 
                ? UserRepository.findUserByPhone(userData.phone) 
                : null
        ]);
        if (existingUsername) throw new Error("Username đã tồn tại");
        if (existingEmail) throw new Error("Email đã tồn tại");
        if (existingPhone) throw new Error("Số điện thoại đã tồn tại");
        delete userData.password;
        return await UserRepository.updateUser(id, userData);
    }

    async deleteUser(id) {
        const existingUser = await UserRepository.findUserById(id);
        if (!existingUser)
            throw new Error("Không tìm thấy người dùng");
        return await UserRepository.deleteUser(id);
    }
}

module.exports = new UserService();