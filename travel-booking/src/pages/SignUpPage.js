import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Logo from '../assets/images/Logo.png';
import Slider1 from '../assets/images/Login/Slider_1.png';
import Slider2 from '../assets/images/Login/Slider_2.png';
// import Facebook from '../assets/images/icons/facebook.svg';
// import Google from '../assets/images/icons/google.svg';
// import Apple from '../assets/images/icons/apple.svg';

export default function SignUpPage() {
    const schema = yup.object().shape({
        username: yup.string().required("Username không được trống"),
        fullname: yup.string().required("Họ và tên không được trống"),
        dob: yup.date().required("Ngày sinh không được trống"),
        gender: yup.string().oneOf(["male", "female", "other"], "Giới tính không hợp lệ"),
        email: yup.string().email("Email không hợp lệ").required("Email không được trống"),
        phone: yup.string().matches(/^\d{10}$/, "Số điện thoại phải đủ 10 số").required("Số điện thoại không được trống"),
        password: yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Mật khẩu không được trống"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
            .required("Xác nhận mật khẩu không được trống"),
        terms: yup.bool().oneOf([true], "Bạn phải đồng ý với điều khoản"),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/register", data);
            window.location.href = "/";
        } catch (error) {
            alert(error.response?.data?.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-green-900">
            {/* Swiper hình ảnh */}
            <div className="w-1/2 h-full">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-full w-full"
                >
                    <SwiperSlide>
                        <img src={Slider1} alt="Resort" className="h-full w-full object-cover rounded-r-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Slider2} alt="Fly" className="h-full w-full object-cover rounded-r-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Form đăng ký */}
            <div className="w-1/2 flex flex-col justify-center items-center p-10">
                {/* Logo */}
                <img src={Logo} alt="Logo" className="h-16 mb-4" />

                {/* Tiêu đề */}
                <h1 className="text-4xl font-bold text-white mb-2">Đăng ký</h1>
                <p className="text-gray-300 mb-6 text-center">Tạo tài khoản để trải nghiệm dịch vụ tốt nhất</p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                    {/* Username & Fullname */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white">Username</label>
                            <input {...register("username")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.username?.message}</p>
                        </div>
                        <div>
                            <label className="block text-white">Họ và tên</label>
                            <input {...register("fullname")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.fullname?.message}</p>
                        </div>
                    </div>

                    {/* Ngày sinh & Giới tính */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-white">Ngày sinh</label>
                            <input type="date" {...register("dob")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.dob?.message}</p>
                        </div>
                        <div>
                            <label className="block text-white">Giới tính</label>
                            <select {...register("gender")} className="w-full px-4 py-2 border rounded bg-gray-100">
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            <p className="text-red-500 text-sm">{errors.gender?.message}</p>
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-white">Email</label>
                            <input {...register("email")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>
                        <div>
                            <label className="block text-white">Số điện thoại</label>
                            <input {...register("phone")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                        </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-white">Mật khẩu</label>
                            <input type="password" {...register("password")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.password?.message}</p>
                        </div>
                        <div>
                            <label className="block text-white">Xác nhận mật khẩu</label>
                            <input type="password" {...register("confirmPassword")} className="w-full px-4 py-2 border rounded bg-gray-100" />
                            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
                        </div>
                    </div>

                    {/* Đồng ý điều khoản */}
                    <div className="flex items-center mt-4">
                        <input type="checkbox" {...register("terms")} className="mr-2" />
                        <p className="text-white text-sm">
                            Tôi đồng ý với <span className="text-green-300">Điều khoản</span> và <span className="text-green-300">Chính sách bảo mật</span>
                        </p>
                    </div>

                    {/* Nút đăng ký */}
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4" disabled={loading}>
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>

                    {/* Dòng "Đã có tài khoản?" */}
                    <p className="text-center text-white mt-4">
                        Đã có tài khoản? <a href="/login" className="text-green-300 hover:underline">Đăng nhập</a>
                    </p>
                </form>
            </div>
        </div>
    );
}