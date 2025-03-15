import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { fetchPopularTours, fetchFavoriteTours } from "../services/api";
import TourCard from "../components/TourCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
    const [domesticTours, setDomesticTours] = useState([]);
    const [internationalTours, setInternationalTours] = useState([]);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            // Gọi API để lấy tour trong nước
            const domesticResponse = await axios.get('http://localhost:5000/api/tours/domestic');
            if (domesticResponse.data.data) {
                setDomesticTours(domesticResponse.data.data);
            }

            // Gọi API để lấy tour nước ngoài
            const internationalResponse = await axios.get('http://localhost:5000/api/tours/international');
            if (internationalResponse.data.data) {
                setInternationalTours(internationalResponse.data.data);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        }
    };

    return (
        <div className="bg-gray-100">
            <Header />

            {/* Domestic Tours Section */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Tour Trong Nước</h2>
                        <Link 
                            to="/tours?type=domestic" 
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {domesticTours.map((tour) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                </div>
            </section>

            {/* International Tours Section */}
            <section className="py-16 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Tour Nước Ngoài</h2>
                        <Link 
                            to="/tours?type=international" 
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {internationalTours.map((tour) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}