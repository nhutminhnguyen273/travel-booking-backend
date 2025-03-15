import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-8">Tour Yêu Thích</h1>
                
                {favorites.length === 0 ? (
                    <p className="text-gray-600">Bạn chưa có tour yêu thích nào.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((favorite) => (
                            <TourCard key={favorite._id} tour={favorite.tour} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
} 