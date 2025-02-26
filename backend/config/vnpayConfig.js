require('dotenv').config();

module.exports = {
    vnp_TmnCode: process.env.VNP_TMNCODE || 'G6YVKOP3',
    vnp_HashSecret: process.env.VNP_HASHSECRET || 'ENNPFXFQAN568NWRNJVXTYBMQGB2GLS7',
    vnp_Url: process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnp_ReturnUrl: process.env.VNP_RETURNURL || 'http://localhost:5001/api/payments/vnpay_return'
};