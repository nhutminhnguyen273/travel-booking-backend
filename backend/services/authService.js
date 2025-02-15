const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class AuthService {
    async register(userData) {
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
        return await UserRepository.createUser(userData);
    }

    async login(username, password) {
        const user = await UserRepository.findUserByUsername(username);
        if (!user) throw new Error("Username không chính xác");
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) throw new Error("Mật khẩu không chính xác");
        if (user && validPassword)
            return user;
    }
}
module.exports = new AuthService();