import axios from "axios";

const API_URL = "http://localhost:5000/api/tours"; // Đổi URL backend nếu cần

// export const fetchPopularTours = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/popular`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi lấy danh sách tour phổ biến:", error);
//         return [];
//     }
// };

// export const fetchFavoriteTours = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/favorite`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi lấy danh sách tour yêu thích:", error);
//         return [];
//     }
// };