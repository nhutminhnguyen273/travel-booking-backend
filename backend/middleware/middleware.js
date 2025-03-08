const jwt = require('jsonwebtoken');

class Middleware {
    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debug log

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const accessToken = authHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    console.error("JWT Verification Error:", err); // Debug log
                    return res.status(403).json({ message: "Token is not valid" });
                }
                console.log("Decoded User:", user); // Debug log
                req.user = user; // Gán user vào req để dùng sau
                next();
            });
        } else {
            return res.status(401).json({ message: "You're not authenticated" });
        }
    }

    verifyTokenAdmin(req, res, next) {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debug log

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const accessToken = authHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    console.error("JWT Verification Error:", err);
                    return res.status(403).json({ message: "Token is not valid" });
                }

                console.log("Decoded User:", user);
                req.user = user;

                // Kiểm tra quyền Admin
                if (user.role !== "admin") {
                    return res.status(403).json({ message: "You do not have permission" });
                }
                next();
            });
        } else {
            return res.status(401).json({ message: "You're not authenticated" });
        }
    }

    verifyTokenAdminAndUser(req, res, next) {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debug log
    
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const accessToken = authHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    console.error("JWT Verification Error:", err);
                    return res.status(403).json({ message: "Token is not valid" });
                }
    
                console.log("Decoded User:", user);
                req.user = user;
    
                // ✅ Nếu là admin, cho phép tiếp tục
                if (user.role === "admin") {
                    return next();
                }
    
                // ✅ Nếu chính user đó đang truy cập tài nguyên của mình
                if (req.user.id === req.params.id || req.user.id === req.body.userId) {
                    return next();
                }
    
                // ❌ Nếu không phải admin hoặc chính user, chặn
                return res.status(403).json({ message: "You do not have permission" });
            });
        } else {
            return res.status(401).json({ message: "You're not authenticated" });
        }
    }    
}

module.exports = new Middleware();