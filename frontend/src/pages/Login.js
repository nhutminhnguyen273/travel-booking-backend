import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại!");
      }

      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      navigate("/dashboard"); // Chuyển hướng đến trang dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            className="w-full p-2 border rounded mb-3"
            value={formData.username}
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
          <button className="w-full bg-blue-500 text-white p-2 rounded">Đăng nhập</button>
        </form>
        <p className="text-center mt-4">
          Chưa có tài khoản? <a href="/register" className="text-blue-500">Đăng ký</a>
        </p>
      </div>
    </div>
  );
};

export default Login;