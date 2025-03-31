const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendResetEmail = async (email, token) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
        from: `"Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Đặt lại mật khẩu",
        html: `
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;