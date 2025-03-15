import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function TourCard({ tour }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleFavorite = (e) => {
        e.preventDefault();
        if (!user) {
            // Lưu URL hiện tại và chuyển hướng đến trang đăng nhập
            localStorage.setItem('redirectUrl', window.location.pathname);
            navigate('/login');
            return;
        }
        // Xử lý thêm vào danh sách yêu thích
    };

    const handleBooking = (e) => {
        e.preventDefault();
        if (!user) {
            localStorage.setItem('redirectUrl', `/booking/${tour._id}`);
            navigate('/login');
            return;
        }
        navigate(`/booking/${tour._id}`);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Link to={`/tours/${tour._id}`}>
                <img 
                    src={tour.image[0]} 
                    alt={tour.title} 
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <span>📍</span>
                    <span>{tour.destination.join(", ")}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>⏳ {tour.duration} ngày</span>
                    <span>👥 {tour.maxPeople} người</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-gray-500">Giá từ</p>
                        <p className="text-green-600 font-bold text-xl">
                            {tour.price.toLocaleString()} VND
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleFavorite}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                            ❤️
                        </button>
                    </div>
                </div>
                
                {/* Buttons Container */}
                <div className="flex gap-2">
                    <Link 
                        to={`/tours/${tour._id}`}
                        className="flex-1 bg-green-100 text-green-600 px-4 py-2 rounded-lg 
                                 hover:bg-green-200 transition-colors text-center"
                    >
                        Xem chi tiết
                    </Link>
                    <button 
                        onClick={handleBooking}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg 
                                 hover:bg-green-700 transition-colors"
                    >
                        Đặt tour
                    </button>
                </div>
            </div>
        </div>
    );
}