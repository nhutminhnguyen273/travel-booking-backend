const UserRepository = require('../repositories/userRepository');

const validateUserFields = async (username, email, phone, id = null) => {
    try {
        const [existingUsername, existingEmail, existingPhone] = await Promise.all([
            username ? UserRepository.findUserByUsername(username) : null,
            email ? UserRepository.findUserByEmail(email) : null,
            phone ? UserRepository.findUserByPhone(phone) : null
        ]);
        if (existingUsername && (!id || existingUsername._id.toString() != id))
            throw new Error(`Username ${username} already exists`);
        if (existingEmail && (!id || existingEmail._id.toString() != id))
            throw new Error(`Email ${email} already exists`);
        if (existingPhone && (!id || existingPhone._id.toString() != id))
            throw new Error(`Phone number ${phone} already exists`);
    } catch (error) {
        throw new Error(`❌ Validation error: ${error.message}`);
    }
};
module.exports = validateUserFields;