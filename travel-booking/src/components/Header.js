import React from "react";
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/images/Logo.png';
import HeroImage from '../assets/images/Hero.png';

export default function Header() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <>
            {/* Navigation */}
            <header className="absolute w-full z-10">
                <div className="container mx-auto flex justify-between items-center py-8 px-6">
                    <div className="flex items-center space-x-12">
                        <img src={Logo} alt="Logo" className="h-12 object-contain" />
                        <nav className="flex space-x-8">
                            <button className="flex items-center space-x-2 text-white font-medium text-base hover:text-gray-200 transition-colors">
                                <span className="text-xl">✈️</span>
                                <span>Find Flight</span>
                            </button>
                            <button className="flex items-center space-x-2 text-white font-medium text-base hover:text-gray-200 transition-colors">
                                <span className="text-xl">🏨</span>
                                <span>Find Stays</span>
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <span className="text-white">Xin chào, {user.username}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium 
                                             hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <a 
                                    href="/login" 
                                    className="text-white font-medium hover:text-gray-200 transition-colors"
                                >
                                    Đăng nhập
                                </a>
                                <a 
                                    href="/register" 
                                    className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium 
                                             hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Đăng ký
                                </a>
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
                    
                    <div className="grid grid-cols-4 gap-4 mt-4">
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
                        <button className="bg-green-600 text-white px-6 py-2 rounded">
                            Show Flights
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}