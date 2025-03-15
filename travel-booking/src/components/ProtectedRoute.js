import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // Lưu URL hiện tại vào localStorage để sau khi đăng nhập có thể quay lại
        localStorage.setItem('redirectUrl', window.location.pathname);
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute; 