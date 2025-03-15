import React from "react";
import Logo from '../assets/images/Logo.png';

export default function Header() {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <img src={Logo} alt="Logo" className="h-12" />
            <div>
                <a className="mr-4 text-gray-700" type="button" href="/login">Đăng nhập</a>
                <a className="bg-green-600 text-white px-4 py-2 rounded" type="button" href="/register">Đăng ký</a>
            </div>
        </header>
    );
}