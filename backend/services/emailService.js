const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendMail(to, subject, htmlContent) {
        const mailOptions = {
            from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
            to,
            subject, 
            html: htmlContent
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`📧 Gửi email: ${info.response}`);
            return info;
        } catch (error) {
            console.error(`❌ Lỗi khi gửi email: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new EmailService();