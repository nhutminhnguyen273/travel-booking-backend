import { useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Logo from '../assets/images/Logo.png';
import Slider1 from '../assets/images/Login/Slider_1.png';
import Slider2 from '../assets/images/Login/Slider_2.png';
import Facebook from '../assets/images/icons/facebook.svg';
import Google from '../assets/images/icons/google.svg';
import Apple from '../assets/images/icons/apple.svg';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(username, password);
            // Kiểm tra xem có URL redirect không
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                navigate(redirectUrl);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(
                err.response?.data?.error || 
                err.response?.data?.message || 
                err.message || 
                "Đăng nhập thất bại. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-green-800">
            <div className="w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img src={Logo} alt="Logo" className="h-16" />
                    </div>

                    {/* Login Header */}
                    <h1 className="text-2xl font-semibold text-white mb-2">Đăng nhập</h1>
                    <p className="text-gray-300 mb-6">Đăng nhập bằng tài khoản đăng ký</p>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded bg-white"
                                placeholder="Nhập username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded bg-white"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="ml-2 text-white text-sm">Remember me</span>
                            </label>
                            <a href="/forgot-password" className="text-red-400 text-sm hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Đang đăng nhập" : "Đăng nhập"}
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="text-center text-white mt-6">
                        Chưa có tài khoản? <a href="/register" className="text-green-400 hover:underline">Đăng ký</a>
                    </p>

                    {/* Social Login */}
                    <div className="mt-8">
                        <p className="text-center text-white text-sm mb-4">hoặc đăng nhập với</p>
                        <div className="flex justify-center space-x-4">
                            <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-50">
                                <img src={Facebook} alt="Facebook" className="h-6 w-6" />
                            </button>
                            <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-50">
                                <img src={Google} alt="Google" className="h-6 w-6" />
                            </button>
                            <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-50">
                                <img src={Apple} alt="Apple" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-1/2 h-full">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-full w-full"
                >
                    <SwiperSlide>
                        <img
                            src={Slider1}
                            alt="Resort"
                            className="h-full w-full object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={Slider2}
                            alt="Fly"
                            className="h-full w-full object-cover"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}