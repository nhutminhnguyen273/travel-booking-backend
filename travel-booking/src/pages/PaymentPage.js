import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/booking/${bookingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                );

                if (response.data.data) {
                    setBooking(response.data.data);
                } else {
                    throw new Error('Không có dữ liệu đặt tour');
                }
            } catch (err) {
                console.error('Error fetching booking:', err);
                setError(
                    err.response?.data?.message || 
                    'Không thể tải thông tin đặt tour. Vui lòng thử lại sau.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handlePayment = async (paymentMethod) => {
        try {
            setProcessingPayment(true);
            setError(null);

            const response = await axios.post(
                'http://localhost:5000/api/payment/vnpay',
                {
                    bookingId: booking._id,
                    amount: booking.totalPrice,
                    paymentMethod
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error('Không nhận được URL thanh toán');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(
                err.response?.data?.message || 
                'Không thể xử lý thanh toán. Vui lòng thử lại sau.'
            );
        } finally {
            setProcessingPayment(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
                    <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
                    <button
                        onClick={() => navigate('/booking')}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Quay lại trang đặt tour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h1>

                    {/* Thông tin đặt tour */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-600">
                            <div>
                                <p className="font-medium">Tour:</p>
                                <p>{booking?.tour?.title}</p>
                            </div>
                            <div>
                                <p className="font-medium">Ngày khởi hành:</p>
                                <p>{new Date(booking?.startDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <div>
                                <p className="font-medium">Số người:</p>
                                <p>{booking?.peopleCount} người</p>
                            </div>
                            <div>
                                <p className="font-medium">Tổng tiền:</p>
                                <p className="text-green-600 font-bold">
                                    {booking?.totalPrice?.toLocaleString()} VND
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Chọn phương thức thanh toán</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {/* VNPay */}
                            <button
                                onClick={() => handlePayment('VNPay')}
                                disabled={processingPayment}
                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg
                                         hover:border-green-500 transition-colors cursor-pointer"
                            >
                                <img 
                                    src="/images/vnpay-logo.png" 
                                    alt="VNPay" 
                                    className="h-12 mb-4"
                                />
                                <span className="font-medium">Thanh toán qua VNPay</span>
                            </button>

                            {/* MoMo */}
                            <button
                                onClick={() => handlePayment('MoMo')}
                                disabled={processingPayment}
                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg
                                         hover:border-green-500 transition-colors cursor-pointer"
                            >
                                <img 
                                    src="/images/momo-logo.png" 
                                    alt="MoMo" 
                                    className="h-12 mb-4"
                                />
                                <span className="font-medium">Thanh toán qua MoMo</span>
                            </button>
                        </div>

                        {processingPayment && (
                            <div className="text-center mt-6">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mr-2"></div>
                                <span>Đang xử lý thanh toán...</span>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-center mt-4">
                                {error}
                            </div>
                        )}

                        <div className="mt-8 text-sm text-gray-600">
                            <p className="mb-2">Lưu ý:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Vui lòng không tắt trình duyệt khi đang xử lý thanh toán</li>
                                <li>Kiểm tra kỹ thông tin trước khi thanh toán</li>
                                <li>Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 