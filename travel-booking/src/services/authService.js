import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
    // Đăng nhập
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });
            
            // Kiểm tra cấu trúc response
            console.log('Login response:', response.data);
            
            // Lưu token vào localStorage
            if (response.data.tokens) {
                localStorage.setItem('accessToken', response.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
            }
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Đăng xuất
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            await axios.post(`${API_URL}/auth/logout`, { refreshToken });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post(`${API_URL}/auth/refresh-token`, {
                refreshToken
            });
            
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                return response.data.accessToken;
            }
            throw new Error('No access token received');
        } catch (error) {
            console.error('Refresh token error:', error);
            throw error;
        }
    }
};

export default authService; 