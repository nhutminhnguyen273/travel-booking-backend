import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BookingPage() {
    const { tourId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        startDate: '',
        peopleCount: 1,
        paymentMethod: 'VNPay'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tours/${tourId}`);
                setTour(response.data.data);
            } catch (error) {
                console.error('Error fetching tour:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [tourId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/booking', {
                tour: tourId,
                ...bookingData,
                totalPrice: tour.price * bookingData.peopleCount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            navigate(`/payment/${response.data.data._id}`);
        } catch (error) {
            console.error('Booking error:', error);
        }
    };

    const handlePeopleCountChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > tour.remainingSeats) {
            setError(`Số người không được vượt quá ${tour.remainingSeats} (số chỗ còn lại)`);
            setBookingData({
                ...bookingData,
                peopleCount: tour.remainingSeats
            });
        } else if (value < 1) {
            setError('Số người phải ít nhất là 1');
            setBookingData({
                ...bookingData,
                peopleCount: 1
            });
        } else {
            setError('');
            setBookingData({
                ...bookingData,
                peopleCount: value
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Đặt Tour</h1>
                    
                    {/* Tour Summary Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex gap-6">
                            <img 
                                src={tour.image[0]} 
                                alt={tour.title}
                                className="w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
                                <div className="grid grid-cols-2 gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span>📍</span>
                                        <span>{tour.destination.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>⏳</span>
                                        <span>{tour.duration} ngày</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>👥</span>
                                        <span>Còn {tour.remainingSeats} chỗ</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>💰</span>
                                        <span>{tour.price.toLocaleString()} VND/người</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-xl font-semibold mb-6">Thông tin đặt tour</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Thông tin người đặt */}
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-700">Thông tin liên hệ</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Họ tên
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.fullname || ''}
                                                    disabled
                                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user?.email || ''}
                                                    disabled
                                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thông tin chuyến đi */}
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-700">Chi tiết chuyến đi</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Ngày khởi hành
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                                    value={bookingData.startDate}
                                                    onChange={(e) => setBookingData({
                                                        ...bookingData,
                                                        startDate: e.target.value
                                                    })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Số người
                                                </label>
                                                <div className="space-y-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={tour.remainingSeats}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 
                                                                  ${error ? 'border-red-500' : 'border-gray-300'}`}
                                                        value={bookingData.peopleCount}
                                                        onChange={handlePeopleCountChange}
                                                        required
                                                    />
                                                    {error && (
                                                        <p className="text-red-500 text-sm">
                                                            {error}
                                                        </p>
                                                    )}
                                                    <p className="text-gray-500 text-sm">
                                                        Số chỗ còn lại: {tour.remainingSeats}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phương thức thanh toán */}
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-700">Phương thức thanh toán</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="VNPay"
                                                    checked={bookingData.paymentMethod === 'VNPay'}
                                                    onChange={(e) => setBookingData({
                                                        ...bookingData,
                                                        paymentMethod: e.target.value
                                                    })}
                                                    className="mr-2"
                                                />
                                                <span>VNPay</span>
                                            </label>
                                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-green-500">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="MoMo"
                                                    checked={bookingData.paymentMethod === 'MoMo'}
                                                    onChange={(e) => setBookingData({
                                                        ...bookingData,
                                                        paymentMethod: e.target.value
                                                    })}
                                                    className="mr-2"
                                                />
                                                <span>MoMo</span>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                                <h3 className="text-xl font-semibold mb-6">Tổng quan đặt tour</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Giá tour/người</span>
                                        <span>{tour.price.toLocaleString()} VND</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Số người</span>
                                        <span>x {bookingData.peopleCount}</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Tổng tiền</span>
                                            <span className="text-green-600">
                                                {(tour.price * bookingData.peopleCount).toLocaleString()} VND
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={error !== '' || bookingData.peopleCount > tour.remainingSeats}
                                        className={`w-full py-3 rounded-lg font-medium transition-colors mt-6
                                                  ${error || bookingData.peopleCount > tour.remainingSeats
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                    >
                                        {error || bookingData.peopleCount > tour.remainingSeats
                                            ? 'Không thể đặt tour'
                                            : 'Tiến hành thanh toán'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 