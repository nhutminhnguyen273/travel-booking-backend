import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SuccessIcon from '../assets/images/icons/payment_success.png';
import FailedIcon from '../assets/images/icons/payment_failed.png';

export default function PaymentResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const queryString = location.search;
                const response = await axios.get(
                    `http://localhost:5000/api/payment/vnpay_return${queryString}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                );

                const { success, data } = response.data;

                if (success) {
                    setStatus('success');
                    setPaymentDetails(data);
                    
                    // Cập nhật trạng thái booking nếu thanh toán thành công
                    if (data.bookingId) {
                        await axios.patch(
                            `http://localhost:5000/api/booking/${data.bookingId}/confirm`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            }
                        );
                    }
                } else {
                    setStatus('failed');
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('failed');
                setError(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình xác thực thanh toán');
            }
        };

        verifyPayment();
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-16 mt-20">
                <div className="max-w-2xl mx-auto">
                    {status === 'success' && paymentDetails ? (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center">
                                <img 
                                    src={SuccessIcon} 
                                    alt="Success" 
                                    className="w-24 h-24 mx-auto mb-6"
                                />
                                <h1 className="text-3xl font-bold text-green-600 mb-4">
                                    Thanh toán thành công!
                                </h1>
                                <p className="text-gray-600 mb-8">
                                    Cảm ơn bạn đã đặt tour. Chúng tôi sẽ sớm liên hệ với bạn.
                                </p>

                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Chi tiết thanh toán
                                    </h2>
                                    <div className="space-y-3 text-left">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Số tiền:</span>
                                            <span className="font-medium">
                                                {Number(paymentDetails.amount).toLocaleString()} VND
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Mã giao dịch:</span>
                                            <span className="font-medium">
                                                {paymentDetails.transactionId}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thời gian:</span>
                                            <span className="font-medium">
                                                {new Date(paymentDetails.paidAt).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Phương thức:</span>
                                            <span className="font-medium">
                                                {paymentDetails.paymentMethod}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Trạng thái:</span>
                                            <span className="text-green-600 font-medium">
                                                Đã thanh toán
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => navigate('/booking-history')}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg 
                                                 hover:bg-green-700 transition-colors"
                                    >
                                        Xem lịch sử đặt tour
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg 
                                                 hover:bg-gray-200 transition-colors"
                                    >
                                        Về trang chủ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : status === 'failed' ? (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center">
                                <img 
                                    src={FailedIcon} 
                                    alt="Failed" 
                                    className="w-24 h-24 mx-auto mb-6"
                                />
                                <h1 className="text-3xl font-bold text-red-600 mb-4">
                                    Thanh toán thất bại!
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    {error || 'Đã có lỗi xảy ra trong quá trình thanh toán.'}
                                </p>
                                <p className="text-gray-600 mb-8">
                                    Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
                                </p>

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="bg-red-600 text-white px-6 py-3 rounded-lg 
                                                 hover:bg-red-700 transition-colors"
                                    >
                                        Thử lại
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg 
                                                 hover:bg-gray-200 transition-colors"
                                    >
                                        Về trang chủ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Đang xử lý thanh toán...</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
} 