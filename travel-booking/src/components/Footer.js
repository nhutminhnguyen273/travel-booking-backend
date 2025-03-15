import React from "react";
import Logo from '../assets/images/Logo.png';

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <img src={Logo} alt="Logo" className="h-12" />
                        <p className="text-gray-300 text-sm">
                            Khám phá những điểm đến tuyệt vời cùng chúng tôi. 
                            Chúng tôi mang đến những trải nghiệm du lịch độc đáo và đáng nhớ.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-green-400 transition-colors">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="hover:text-green-400 transition-colors">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="hover:text-green-400 transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Liên Kết Nhanh</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Trang chủ</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Tour trong nước</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Tour nước ngoài</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Khuyến mãi</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">Tin tức du lịch</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Thông Tin Liên Hệ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <span>📍</span>
                                <span className="text-gray-300">123 Đường ABC, Quận XYZ, TP.HCM</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span>📞</span>
                                <span className="text-gray-300">0123 456 789</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span>✉️</span>
                                <span className="text-gray-300">contact@travelbooking.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Đăng Ký Nhận Tin</h3>
                        <p className="text-gray-300 mb-4">
                            Nhận thông tin về các ưu đãi và điểm đến mới nhất
                        </p>
                        <form className="space-y-3">
                            <input 
                                type="email" 
                                placeholder="Email của bạn" 
                                className="w-full px-4 py-2 rounded bg-green-800 border border-green-700 
                                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                         focus:ring-green-500"
                            />
                            <button 
                                className="w-full bg-green-600 hover:bg-green-700 transition-colors 
                                         text-white font-medium py-2 rounded"
                            >
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-green-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © 2024 Travel Booking. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-300 hover:text-white text-sm">
                                Điều khoản sử dụng
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}