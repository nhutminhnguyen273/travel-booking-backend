const jwt = require('jsonwebtoken');

class Middleware {
    verifyToken = (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    };

    verifyAdminAndUser = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.role === "Quản trị viên") {
                next();
            } else {
                return res.status(403).json("You're not allowed");
            }
        });
    };

    verifyAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.role === "Quản trị viên") {
                next();
            } else {
                return res.status(403).json("You're not allowed");
            }
        });
    };
}

module.exports = new Middleware();