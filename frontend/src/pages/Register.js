import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        dob: "",
        gender: "OTHER",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    fullname: formData.fullname,
                    dob: formData.dob,
                    gender: formData.gender,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Đăng ký thất bại!");
            }

            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-center'>Đăng ký</h2>
                {error && <p className='text-red-500 text-center'>{error}</p>}
                <form onSubmit={handleRegister} className='mt-4'>
                    <input
                        type='text'
                        name='username'
                        placeholder='Tên đăng nhập'
                        className='w-full p-2 border rounded md-3'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='fullname'
                        placeholder='Họ và tên'
                        className='w-full p-2 border rounded md-3'
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='date'
                        name='dob'
                        className='w-full p-2 border rounded mb-3'
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <select
                        name="gender"
                        className="w-full p-2 border rounded mb-3"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-3"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        className="w-full p-2 border rounded mb-3"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        className="w-full p-2 border rounded mb-3"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        className="w-full p-2 border rounded mb-3"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button className='w-full bg-green-500 text-white p-2 rounded'>Đăng ký</button>
                </form>
                <p className="text-center mt-4">
                    Đã có tài khoản? <a href="/login" className="text-blue-500">Đăng nhập</a>
                </p>
            </div>
        </div>
    );
}

export default Register;