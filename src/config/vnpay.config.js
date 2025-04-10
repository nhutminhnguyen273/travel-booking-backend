const dotenv = require("dotenv").config();

const vnpayConfig = {
    vnp_TmnCode: process.env.VNP_TMNCODE || "DEFDV1G7",
    vnp_HashSecret: process.env.VNP_HASHSECRET || "SETHGACZ655DVPYTEF1HTCA4XHR0B2ZT",
    vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: process.env.VNP_RETURN_URL || "http://localhost:5173/payment/vnpay_return",
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_OrderType: "other",
    vnp_ExpireMinutes: 15
};

// Log configuration for debugging
console.log('VNPay Configuration:', {
    vnp_TmnCode: vnpayConfig.vnp_TmnCode,
    vnp_HashSecret: vnpayConfig.vnp_HashSecret ? '***' : undefined,
    vnp_Url: vnpayConfig.vnp_Url,
    vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl
});

// Validate required configurations
const requiredConfigs = ['vnp_TmnCode', 'vnp_HashSecret', 'vnp_Url', 'vnp_ReturnUrl'];
for (const config of requiredConfigs) {
    if (!vnpayConfig[config]) {
        throw new Error(`Missing required VNPay configuration: ${config}`);
    }
}

module.exports = vnpayConfig; 