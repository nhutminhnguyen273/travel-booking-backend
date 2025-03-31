const Tour = require("../models/tour.model");

class TourService {
    async create(tour) {
        try {
            const existingTitle = await Tour.findOne({ title: tour.title });
            if (existingTitle) throw new Error("Tiêu đề đã tồn tại.");
            const newTour = new Tour({
                title: tour.title,
                description: tour.description,
                price: tour.price,
                destination: tour.destination,
                type: tour.type,
                duration: tour.duration,
                schedules: tour.schedules,
                maxPeople: tour.maxPeople,
                remainingSeats: tour.remainingSeats,
                images: tour.images,
                itinerary: tour.itinerary,
            });
            return await newTour.save();
        } catch (error) {
            console.error(`Lỗi khi thêm tour: ${error.message}`);
            throw error;
        }
    }

    async update(id, input) {
        try {
            const tour = await Tour.findById(id);
            if (!tour) throw new Error("Không tìm thấy tour");
            const existingTitle = await Tour.findOne({ title: input.title });
            if (tour.title != input.title && existingTitle) throw new Error("Tiêu đề đã tồn tại.");
            return await Tour.findByIdAndUpdate(id, tour);
        } catch (error) {
            console.error(`Lỗi khi cập nhật tour: ${error.message}`);
            throw error;
        }
    }

    async delete(id) {
        try {
            const tour = await Tour.findById(id);
            if (!tour) throw new Error("Không tìm thấy tour");
            return await Tour.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            console.error(`Lỗi khi xóa tour: ${error.message}`);
            throw error;
        }
    }

    async restore(id) {
        try {
            const tour = await Tour.findById(id);
            if (!tour) throw new Error("Không tìm thấy tour");
            return await Tour.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            console.error(`Lỗi khi khôi phục tour: ${error.message}`);
            throw error;
        }
    }

    async getList() {
        try {
            return await Tour.find();
        } catch (error) {
            console.error(`Lỗi khi lấy danh sách tour: ${error.message}`);
            throw error;
        }
    }

    async getListByTypes(type) {
        try {
            return await Tour.find({ type: type });
        } catch (error) {
            console.error(`Lỗi khi lấy danh sách tour: ${error.message}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const tour = await Tour.findById(id);
            if (!tour) throw new Error("Không tìm thấy tour");
            return tour;
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin tour: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TourService();