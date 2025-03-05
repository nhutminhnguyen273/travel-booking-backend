const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const validateUserFields = require('../util/validateUserFields');
const Jwt = require('../util/jwt');
const redisClient = require('../config/redisClient');

class AuthService {
    async register(user, res) {
        try {
            await validateUserFields(user.username, user.email, user.phone);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const newUser = await UserRepository.createUser(user);

            const [accessToken, refreshToken] = await Promise.all([
                Jwt.generateAccessToken(newUser),
                Jwt.generateRefreshToken(newUser)
            ]);

            await redisClient.set(newUser._id.toString(), refreshToken, { EX: 24 * 60 * 60 });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            const { password, ...others } = newUser.toObject();
            return { others, accessToken };
        } catch (error) {
            console.error(`❌ Error registering user: ${error.message}`);
            throw error;
        }
    }

    async login(username, password, res) {
        try {
            const user = await UserRepository.findUserByUsername(username);
            if (!user) throw new Error("Username not found");
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!validPassword) throw new Error("Invalid password");
            if (user && validPassword) {
                const accessToken = Jwt.generateAccessToken(user);
                const refreshToken = Jwt.generateRefreshToken(user);
                await redisClient.set(user._id.toString(), refreshToken, { EX: 1 * 24 * 60 * 60 });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });
                const { password, ...others } = user.toObject();
                return { others, accessToken };
            }
        } catch (error) {
            console.error(`❌ Error loging user: ${error.message}`);
            throw error;
        }
    }

    async logout(req, res) {
        try {
            const userId = req.user.id;
            const tokenExists = await redisClient.get(userId.toString());

            if (tokenExists) {
                await redisClient.del(userId.toString());
            }

            res.clearCookie('refreshToken');
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            console.error(`❌ Error logging out: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new AuthService();