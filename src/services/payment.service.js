const History = require("../models/history.model");
const PaymentStatus = require("../enums/payment-status.enum");
const PaymentMethod = require("../enums/payment-method.enum");
const Stripe = require("stripe");
const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const crypto = require("crypto");

class PaymentService {
    async createPayment({ bookingId, amount, userId, paymentMethod, currency = 'vnd' }) {
        try {
            console.log("Creating payment with data:", { bookingId, amount, userId, paymentMethod, currency });
            
            // Validate required fields
            if (!bookingId || !userId) {
                throw new Error("Thiếu thông tin booking hoặc user");
            }

            // Ensure paymentMethod is set to 'stripe' if not provided
            const method = paymentMethod || 'stripe';
            
            if (!Object.values(PaymentMethod).includes(method)) {
                throw new Error("Vui lòng chọn phương thức thanh toán hợp lệ");
            }
            
            // Chuyển đổi từ VND sang USD (1 USD = 24500 VND)
            const VND_TO_USD_RATE = 24500;
            const amountInUSD = amount / VND_TO_USD_RATE;
            
            // Kiểm tra giới hạn số tiền của Stripe
            const MAX_STRIPE_AMOUNT = 999999.99;
            if (amountInUSD > MAX_STRIPE_AMOUNT) {
                const error = new Error(`Số tiền thanh toán vượt quá giới hạn của Stripe (${MAX_STRIPE_AMOUNT}$). Vui lòng liên hệ admin để được hỗ trợ.`);
                error.status = 400;
                error.code = 'PAYMENT_AMOUNT_EXCEEDED';
                throw error;
            }
            
            // Initialize Stripe
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16'
            });
            
            // Create a payment intent with amount in USD
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amountInUSD * 100), // Convert to cents
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
                metadata: {
                    bookingId: bookingId.toString(),
                    userId: userId.toString(),
                    originalAmount: amount.toString(),
                    amountInUSD: amountInUSD.toString(),
                    currency: currency
                }
            });

            console.log("Payment intent created:", paymentIntent.id);

            // Create payment record
            const payment = new Payment({
                user: userId,
                booking: bookingId,
                amount: amount,
                method: method, // Use the validated method
                status: PaymentStatus.Pending,
                transactionId: paymentIntent.id,
                metadata: {
                    clientSecret: paymentIntent.client_secret,
                    amountInUSD: amountInUSD,
                    exchangeRate: VND_TO_USD_RATE
                }
            });

            // Save the payment record
            await payment.save();
            console.log("Payment record created:", payment._id);

            return {
                clientSecret: paymentIntent.client_secret,
                payment
            };
        } catch (error) {
            console.error("Error creating payment:", error);
            if (error.type && error.type.startsWith('Stripe')) {
                error.message = `Lỗi thanh toán: ${error.message}`;
                error.status = 400;
            }
            throw error;
        }
    }

    async handleWebhook(signature, payload) {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16'
            });
            
            const event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            switch (event.type) {
                case 'payment_intent.succeeded':
                    await this.handlePaymentSuccess(event.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    await this.handlePaymentFailure(event.data.object);
                    break;
            }

            return { received: true };
        } catch (error) {
            console.error("Error handling webhook:", error);
            throw error;
        }
    }

    async handlePaymentSuccess(paymentIntent) {
        const payment = await Payment.findOne({ transactionId: paymentIntent.id });
        if (payment) {
            payment.status = PaymentStatus.Paid;
            payment.paymentDate = new Date();
            await payment.save();

            // Update booking status if needed
            const booking = await Booking.findById(payment.booking);
            if (booking) {
                booking.status = 'confirmed';
                await booking.save();
            }
        }
    }

    async handlePaymentFailure(paymentIntent) {
        const payment = await Payment.findOne({ transactionId: paymentIntent.id });
        if (payment) {
            payment.status = PaymentStatus.Cancelled;
            await payment.save();
        }
    }

    async getPaymentHistory(userId) {
        try {
            const history = await History.find({ user: userId })
                .populate({
                    path: 'booking',
                    model: 'booking'
                })
                .sort({ createdAt: -1 });
            return history;
        } catch (error) {
            console.error('Error getting payment history:', error);
            throw error;
        }
    }

    async createPaymentRecord(paymentData) {
        try {
            // Tạo mã giao dịch ngẫu nhiên nếu không có
            if (!paymentData.transactionId) {
                paymentData.transactionId = crypto.randomBytes(16).toString("hex");
            }

            const payment = await Payment.create({
                ...paymentData,
                paymentDetails: new Map()
            });

            return payment;
        } catch (error) {
            console.error(`❌ Lỗi khi tạo thanh toán: ${error.message}`);
            throw error;
        }
    }

    async updatePaymentStatus(paymentId, status, paymentDetails = {}) {
        try {
            const payment = await Payment.findByIdAndUpdate(
                paymentId,
                { 
                    status,
                    paymentDetails: new Map(paymentDetails)
                },
                { new: true }
            );
            
            if (!payment) {
                throw new Error("Không tìm thấy thông tin thanh toán");
            }

            return payment;
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật trạng thái thanh toán: ${error.message}`);
            throw error;
        }
    }

    async refundPayment(paymentId, refundDetails) {
        try {
            const payment = await Payment.findById(paymentId);
            if (!payment) {
                throw new Error("Không tìm thấy thông tin thanh toán");
            }

            if (!payment.canRefund()) {
                throw new Error("Không thể hoàn tiền cho thanh toán này");
            }

            // Thực hiện hoàn tiền qua cổng thanh toán
            // TODO: Implement refund logic with payment gateway

            // Cập nhật thông tin hoàn tiền
            payment.status = "refunded";
            payment.refundDetails = {
                refundId: crypto.randomBytes(16).toString("hex"),
                refundAmount: payment.amount,
                refundReason: refundDetails.reason || "Khách hàng yêu cầu hoàn tiền",
                refundedAt: new Date()
            };
            await payment.save();

            return payment;
        } catch (error) {
            console.error(`❌ Lỗi khi hoàn tiền: ${error.message}`);
            throw error;
        }
    }

    async getPaymentById(paymentId) {
        try {
            const payment = await Payment.findById(paymentId)
                .populate("user", "name email")
                .populate("booking", "tour totalAmount");
                
            if (!payment) {
                throw new Error("Không tìm thấy thông tin thanh toán");
            }

            return payment;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy thông tin thanh toán: ${error.message}`);
            throw error;
        }
    }

    async getPaymentsByBooking(bookingId) {
        try {
            const payments = await Payment.find({ booking: bookingId })
                .sort("-createdAt");
            return payments;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách thanh toán: ${error.message}`);
            throw error;
        }
    }

    async getPaymentsByUser(userId, query = {}) {
        try {
            const { page = 1, limit = 10, status, sort = "-createdAt" } = query;
            const filter = { user: userId };
            
            if (status) {
                filter.status = status;
            }

            const payments = await Payment.find(filter)
                .populate("booking", "tour totalAmount")
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Payment.countDocuments(filter);

            return {
                payments,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách thanh toán: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new PaymentService();