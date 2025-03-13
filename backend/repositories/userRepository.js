const User = require('../models/user');
const bcrypt = require('bcrypt');

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

    async saveResetToken(userId, hashedToken) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                {
                    reset_token: hashedToken,
                    reset_token_expires: Date.now() + 3600000 // 1 giờ hết hạn
                },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async findUserByToken(token) {
        try {
            const user = await User.findOne({ reset_token: token });
            if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");

            if (user.reset_token_expires < Date.now()) {
                throw new Error("Token đã hết hạn");
            }

            return user;
        } catch (error) {
            throw new Error(`Lỗi khi tìm người dùng bằng token: ${error.message}`);
        }
    }

    async updatePassword(userId, hashedPassword) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                {
                    password: hashedPassword,
                    reset_token: null,
                    reset_token_expires: null
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Lỗi khi cập nhật mật khẩu: ${error.message}`);
        }
    }

    async clearResetToken(userId) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                {
                    reset_token: null,
                    reset_token_expires: null
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Lỗi khi xóa reset token: ${error.message}`);
        }
    }
};

module.exports = new UserRepository();