const jwt = require('jsonwebtoken');

class JwtUtil {
    generateAccessToken(user) {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "2h" }
        );
    }

    generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: "5h" }
        );
    }
}

module.exports = new JwtUtil();