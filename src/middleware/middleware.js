const jwt = require("jsonwebtoken");

class Middleware {
    verifyToken(req, res, next) {
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (error, user) => {
                if (error) {
                    console.error(`Lỗi khi xác nhận JWT: ${error}`);
                    return res.status(403).json({ message: "Token không chính xác" });
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json({ message: "Bạn chưa xác thực" });
        }
    }

    verifyTokenAdmin(req, res, next) {
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (error, user) => {
                if (error) {
                    console.error(`Lỗi khi xác thực JWT: ${error}`);
                    return res.status(403).json({ message: "Token không chính xác" });
                }
                req.user = user;
                if (user.role !== "admin") {
                    return res.status(403).json({ message: "Bạn không có quyền thực hiện" });
                }
                next();
            });
        } else {
            return res.status(401).json({ message: "Vui lòng đăng nhập để thực hiện" });
        }
    }

    verifyTokenAdminAndUser(req, res, next) {
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (error, user) => {
                if (error) {
                    return res.status(403).json({ message: "Token không chính xác" });
                }
                req.user = user;
                if (user.role === "admin") {
                    return next();
                }
                if (req.user.id === req.params.id || req.user.id === req.body.userId) {
                    return next();
                }
                return res.status(403).json({ message: "Bạn không có quyền thực hiện" });
            });
        } else {
            return res.status(401).json({ message: "Vui lòng đăng nhập để thực hiện" });
        }
    }
}

module.exports = new Middleware();