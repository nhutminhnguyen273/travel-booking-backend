import React from "react";

export default function TourCard({ tour }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={tour.image[0]} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                <p className="text-gray-500">{tour.destination.join(", ")}</p>
                <p className="text-green-600 font-bold mt-2">{tour.price.toLocaleString()} VND</p>
                <p className="text-sm text-gray-500">⏳ {tour.duration} ngày | 👥 {tour.maxPeople} người</p>

                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
}