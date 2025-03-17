import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState('VNPay');

    useEffect(() => {
        fetchBookingDetails();
    }, [bookingId]);

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
                throw new Error('Không tìm thấy thông tin đặt tour');
            }
        } catch (err) {
            console.error('Error fetching booking:', err);
            setError(err.response?.data?.message || 'Không thể tải thông tin đặt tour. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:5000/api/payment/create_payment_url',
                {
                    bookingId: booking._id,
                    amount: booking.totalPrice,
                    paymentMethod: selectedPayment
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
                throw new Error('Không thể tạo URL thanh toán');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi xử lý thanh toán');
        } finally {
            setLoading(false);
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
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-16 mt-20">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center">
                            <div className="text-red-600 text-5xl mb-4">⚠️</div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Không thể tải thông tin
                            </h1>
                            <p className="text-gray-600 mb-8">{error}</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => fetchBookingDetails()}
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg 
                                             hover:bg-green-700 transition-colors"
                                >
                                    Thử lại
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg 
                                             hover:bg-gray-200 transition-colors"
                                >
                                    Quay lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-16 mt-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h1>

                    {booking && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Thông tin đặt tour */}
                            <div className="md:col-span-2">
                                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                    <h2 className="text-xl font-semibold mb-4">Thông tin đặt tour</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tour:</span>
                                            <span className="font-medium">{booking.tour.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Ngày khởi hành:</span>
                                            <span className="font-medium">
                                                {new Date(booking.startDate).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Số người:</span>
                                            <span className="font-medium">{booking.peopleCount}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Phương thức thanh toán */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                                    <div className="space-y-4">
                                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="VNPay"
                                                checked={selectedPayment === 'VNPay'}
                                                onChange={(e) => setSelectedPayment(e.target.value)}
                                                className="mr-2"
                                            />
                                            <div>
                                                <p className="font-medium">VNPay</p>
                                                <p className="text-sm text-gray-500">
                                                    Thanh toán qua VNPay bằng QR Code hoặc thẻ ngân hàng nội địa
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Tổng quan thanh toán */}
                            <div className="md:col-span-1">
                                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                                    <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Giá tour/người:</span>
                                            <span>{booking.tour.price.toLocaleString()} VND</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Số người:</span>
                                            <span>× {booking.peopleCount}</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Tổng tiền:</span>
                                                <span className="text-green-600">
                                                    {booking.totalPrice.toLocaleString()} VND
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handlePayment}
                                            disabled={loading}
                                            className={`w-full py-3 rounded-lg font-medium text-white
                                                      ${loading 
                                                        ? 'bg-gray-400 cursor-not-allowed' 
                                                        : 'bg-green-600 hover:bg-green-700'} 
                                                      transition-colors`}
                                        >
                                            {loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
} 