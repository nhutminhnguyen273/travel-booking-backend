const TourRepository = require('../repositories/tourRepository');

class TourService {
    async getAllTours() {
        return await TourRepository.getAllTours();
    }

    async findTourById(id) {
        const user = await TourRepository.findTourById(id);
        if (!user) 
            throw new Error("Không tìm thấy Tour");
        return user;
    }

    async findTourByTitle(title) {
        const user = await TourRepository.findTourByTitle(title);
        if (!user)
            throw new Error("Không tìm thấy tour ", title);
        return user;
    }

    async createTour(tour) {
        const existingTitle = await TourRepository.findTourByTitle(tour.title);
        if (existingTitle)
            throw new Error("Tiêu đề đã tồn tại");
        return await TourRepository.createTour(tour);
    }

    async updateTour(id, tour) {
        const existingTour = await TourRepository.findTourById(id);
        if (!existingTour)
            throw new Error("Không tìm thấy Tour");
        const existingTitle = userData.username && userData.username !== existingUser.username 
                        ? UserRepository.findUserByUsername(userData.username) 
                        : null;
        if (existingTitle)
            throw new Error("Tiêu đề đã tồn tại");
        return await TourRepository.updateTour(id, tour);
    }

    async deleteTour(id) {
        const existingTour = await TourRepository.findTourById(id);
        if (!existingTour)
            throw new Error("Không tìm thấy Tour");
        return await TourRepository.deleteTour(id);
    }
}
module.exports = new TourService;