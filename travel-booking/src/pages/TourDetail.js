import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TourDetail() {
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTourDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
                if (response.data.data) {
                    setTour(response.data.data);
                } else {
                    throw new Error('Invalid tour data structure');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Không thể tải thông tin tour');
            } finally {
                setLoading(false);
            }
        };

        fetchTourDetail();
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            localStorage.setItem('redirectUrl', `/booking/${id}`);
            navigate('/login');
            return;
        }
        navigate(`/booking/${id}`);
    };

    const handleAddToFavorite = async () => {
        if (!user) {
            localStorage.setItem('redirectUrl', `/tours/${id}`);
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/favorites', 
                { tourId: id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            alert('Đã thêm vào danh sách yêu thích!');
        } catch (err) {
            alert('Không thể thêm vào danh sách yêu thích');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* Tour Image Gallery */}
            <div className="pt-20">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="h-[600px]"
                >
                    {tour.image.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img 
                                src={img} 
                                alt={`${tour.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="col-span-2">
                        {/* Tour Title & Basic Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
                            <div className="flex flex-wrap gap-6 text-gray-600">
                                <div className="flex items-center">
                                    <span className="mr-2">📍</span>
                                    <span>{tour.destination.join(" → ")}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">⏳</span>
                                    <span>{tour.duration} ngày</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">👥</span>
                                    <span>Còn {tour.remainingSeats} chỗ</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">🏷️</span>
                                    <span>{tour.type === 'domestic' ? 'Tour trong nước' : 'Tour quốc tế'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                            <div className="flex border-b">
                                <button
                                    className={`px-6 py-3 text-sm font-medium ${
                                        activeTab === 'overview' 
                                            ? 'text-green-600 border-b-2 border-green-600' 
                                            : 'text-gray-600'
                                    }`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Tổng quan
                                </button>
                                <button
                                    className={`px-6 py-3 text-sm font-medium ${
                                        activeTab === 'itinerary' 
                                            ? 'text-green-600 border-b-2 border-green-600' 
                                            : 'text-gray-600'
                                    }`}
                                    onClick={() => setActiveTab('itinerary')}
                                >
                                    Lịch trình
                                </button>
                                <button
                                    className={`px-6 py-3 text-sm font-medium ${
                                        activeTab === 'reviews' 
                                            ? 'text-green-600 border-b-2 border-green-600' 
                                            : 'text-gray-600'
                                    }`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    Đánh giá
                                </button>
                            </div>

                            <div className="p-6">
                                {activeTab === 'overview' && (
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 leading-relaxed">
                                            {tour.description}
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'itinerary' && (
                                    <div className="space-y-6">
                                        {tour.itinerary.map((day, index) => (
                                            <div key={index} className="border-l-4 border-green-500 pl-4">
                                                <h3 className="text-xl font-semibold mb-2">
                                                    Ngày {day.day}: {day.title}
                                                </h3>
                                                <p className="text-gray-600">{day.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-6">
                                        {tour.reviews && tour.reviews.length > 0 ? (
                                            tour.reviews.map((review, index) => (
                                                <div key={index} className="border-b pb-4">
                                                    <div className="flex items-center mb-2">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={`text-xl ${
                                                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                                }`}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">Chưa có đánh giá nào.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="col-span-1">
                        <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
                            <div className="text-center mb-6">
                                <p className="text-gray-600">Giá từ</p>
                                <p className="text-4xl font-bold text-green-600">
                                    {tour.price.toLocaleString()} VND
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium 
                                             hover:bg-green-700 transition-colors"
                                >
                                    Đặt tour ngay
                                </button>
                                <button
                                    onClick={handleAddToFavorite}
                                    className="w-full border border-green-600 text-green-600 py-3 rounded-lg 
                                             font-medium hover:bg-green-50 transition-colors"
                                >
                                    Thêm vào yêu thích
                                </button>
                            </div>

                            <div className="mt-6 space-y-3">
                                <h3 className="font-semibold text-gray-700">Ngày khởi hành</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tour.startDays.map((day, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            Thứ {day}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <span className="mr-2">✓</span>
                                    <span>Hướng dẫn viên chuyên nghiệp</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">✓</span>
                                    <span>Bảo hiểm du lịch</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">✓</span>
                                    <span>Xe đưa đón tận nơi</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">✓</span>
                                    <span>Khách sạn tiêu chuẩn</span>
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