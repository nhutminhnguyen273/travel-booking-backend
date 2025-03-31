const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
    async create(user) {
        try {
            const [existingUsername, existingEmail, existingPhone] = await Promise.all([
                user.username ? User.findOne({ username: user.username }) : null,
                user.email ? User.findOne({ email: user.email }) : null,
                user.phone ? User.findOne({ phone: user.phone }) : null
            ]);
            if (existingUsername) {
                throw new Error(`Username ${user.username} đã tồn tại.`);
            }
            if (existingEmail) {
                throw new Error(`Email ${user.email} đã tồn tại.`)
            }
            if (existingPhone) {
                throw new Error(`Số điện thoại ${user.phone} đã tồn tại.`);
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newUser = new User({
                username: user.username,
                fullName: user.fullName,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                email: user.email,
                phone: user.phone,
                role: user.role,
                permission: user.permission || [],
                password: hashedPassword
            });
            return await newUser.save();
        } catch (error) {
            console.error(`Lỗi khi thêm người dùng: ${error.message}`);
            throw error;
        }
    }

    async update(id, input) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("Không tìm thấy người dùng");
            const [existingUsername, existingEmail, existingPhone] = await Promise.all([
                input.username ? User.findOne({ username: user.username }) : null,
                input.email ? User.findOne({ email: user.email }) : null,
                input.phone ? User.findOne({ phone: user.phone }) : null
            ]);
            if (existingUsername && (!id || existingUsername._id.toString() != id)) {
                throw new Error(`Username ${user.username} đã tồn tại.`);
            }
            if (existingEmail && (!id || (existingEmail._id.toString() != id))) {
                throw new Error(`Email ${user.email} đã tồn tại.`)
            }
            if (existingPhone && (!id || (existingPhone._id.toString() != id))) {
                throw new Error(`Số điện thoại ${user.phone} đã tồn tại.`);
            }
            return await User.findByIdAndUpdate(id, input, { new: true });
        } catch (error) {
            console.error(`Lỗi khi cập nhật thông tin người dùng: ${error.message}`);
            throw error;
        }
    }

    async deleted(id) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("Không tìm thấy người dùng");
            return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            console.error(`Lỗi khi xóa tài khoản người dùng: ${error.message}`);
            throw error;
        }
    }

    async restore(id) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("Không tìm thấy người dùng");
            return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            console.error(`Lỗi khi khôi phục tài khoản người dùng: ${error.message}`);
            throw error;
        }
    }

    async getList() {
        try {
            return await User.find();
        } catch (error) {
            console.error(`Lỗi khi lấy danh sách người dùng: ${error.message}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("Không tìm thấy người dùng");
            return user;
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin người dùng: ${error.message}`);
            throw error;
        }
    }

    async findByUsername(username) {
        try {
            const user = await User.findOne({ username });
            if (!user) throw new Error(`Không tìm thấy người dùng với username là ${username}`);
            return user;
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin người dùng ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserService();