import React, { useEffect, useState } from "react";
// import { fetchPopularTours, fetchFavoriteTours } from "../services/api";
import TourCard from "../components/TourCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroImage from "../assets/images/Hero.png";

export default function HomePage() {
    const [popularTours, setPopularTours] = useState([]);
    const [favoriteTours, setFavoriteTours] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setPopularTours(await fetchPopularTours());
    //         setFavoriteTours(await fetchFavoriteTours());
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="bg-gray-100">
            <Header />

            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${HeroImage})` }}
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Khám phá những chuyến đi tuyệt vời</h1>
                    <p className="mt-4 text-lg">Ưu đãi đặc biệt cho hành trình của bạn</p>
                </div>
            </div>

            {/* Tour Yêu Thích Nhất */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-6">✨ Tour được yêu thích nhất</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favoriteTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
            </section>

            {/* Tour Phổ Biến Nhất */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-6">🔥 Tour phổ biến nhất</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {popularTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}