import React, { useState, useRef, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import HeroImage from '../assets/images/Hero.png';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    return (
        <>
            {/* Navigation */}
            <header className="absolute w-full z-10">
                <div className="container mx-auto flex justify-between items-center py-8 px-6">
                    {/* Logo và Menu bên trái */}
                    <div className="flex items-center space-x-12">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="h-12 object-contain" />
                        </Link>
                        <nav className="hidden md:flex space-x-8">
                            <Link 
                                to="/tours?type=domestic" 
                                className="flex items-center space-x-2 text-white font-medium hover:text-gray-200 transition-colors"
                            >
                                <span className="text-xl">🏠</span>
                                <span>Tour trong nước</span>
                            </Link>
                            <Link 
                                to="/tours?type=international" 
                                className="flex items-center space-x-2 text-white font-medium hover:text-gray-200 transition-colors"
                            >
                                <span className="text-xl">✈️</span>
                                <span>Tour nước ngoài</span>
                            </Link>
                        </nav>
                    </div>

                    {/* Phần Authentication */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <div className="relative" ref={menuRef}>
                                    <button 
                                        className="flex items-center space-x-2 text-white"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        <span className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                                            {getInitials(user.username || user.fullname)}
                                        </span>
                                        <span className="font-medium">
                                            {user.username || user.fullname || 'User'}
                                        </span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M19 9l-7 7-7-7" 
                                            />
                                        </svg>
                                    </button>
                                    
                                    <div 
                                        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 transform origin-top
                                                  ${isMenuOpen 
                                                    ? 'opacity-100 scale-100' 
                                                    : 'opacity-0 scale-95 pointer-events-none'}`}
                                    >
                                        <Link 
                                            to="/profile" 
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                        <Link 
                                            to="/booking-history" 
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Lịch sử đặt tour
                                        </Link>
                                        <Link 
                                            to="/favorites" 
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Tour yêu thích
                                        </Link>
                                        <hr className="my-2" />
                                        <button 
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-white font-medium hover:text-gray-200 transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium 
                                             hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div 
                className="relative h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${HeroImage})` }}
            >
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Hero Content */}
                <div className="relative h-full flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold mb-4">Helping Others</h1>
                        <h2 className="text-6xl font-bold mb-4">LIVE & TRAVEL</h2>
                        <p className="mt-4 text-xl">Special offers to suit your plan</p>
                    </div>
                </div>

                {/* Search Form */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-6 w-[80%] max-w-5xl">
                    <div className="flex gap-4">
                        <div className="flex gap-4 flex-1">
                            <button className="text-gray-700 flex items-center gap-2">
                                <span>✈️</span> Flights
                            </button>
                            <button className="text-gray-700 flex items-center gap-2">
                                <span>🏨</span> Stays
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <input type="text" placeholder="From - To" className="p-3 border rounded"/>
                        <select className="p-3 border rounded">
                            <option>Return</option>
                        </select>
                        <input type="text" placeholder="07 Nov 22 - 13 Nov 22" className="p-3 border rounded"/>
                        <input type="text" placeholder="1 Passenger, Economy" className="p-3 border rounded"/>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                        <div className="flex items-center">
                            <span className="text-blue-600">+ Add Promo Code</span>
                        </div>
                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                            Show Flights
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}