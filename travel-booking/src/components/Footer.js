import React from "react";
// import FooterBg from '../assets/images/footer-bg.png';

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-lg font-bold">Công ty</h3>
                    <ul>
                        <li>Về chúng tôi</li>
                        <li>Tuyển dụng</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Điểm đến phổ biến</h3>
                    <ul>
                        <li>Đà Lạt</li>
                        <li>Phú Quốc</li>
                        <li>Nha Trang</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Nhận thông báo</h3>
                    <input type="email" placeholder="Nhập email của bạn" className="px-4 py-2 w-full mt-2 text-black rounded" />
                    <button className="mt-3 w-full bg-red-500 py-2 rounded">Đăng ký</button>
                </div>
            </div>
        </footer>
    );
}