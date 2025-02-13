const User = require('../model/User');

const UserRepository = {
    // Lấy danh sách user
    async getAllAsync() {
        return await User.find();
    },

    // Tìm user theo id
    async findByIdAsync(id) {
        return await User.findById(id);
    },

    // Tìm user theo username
    async findByUsernameAsync(username) {
        return await User.findOne({username});
    },

    // Tạo user
    async createAsync(user) {
        const newUser = new User(user);
        return await newUser.save();
    },

    // Cập nhật user theo id
    async updateAsync(id, user) {

    }
}