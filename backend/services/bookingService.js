const BookingRepository = require('../repositories/bookingRepository');

class BookingService {
    async getListBooking() {
        try {
            return await BookingRepository.getListBooking();
        } catch (error) {
            console.log(`❌ Error fetching booking: ${error.message}`);
            throw error;
        }
    }

    async getListBookingUsers(userId) {
        try {
            return await BookingRepository.getListBookingByUser(userId);
        } catch (error) {
            console.log(`❌ Error fetching booking: ${error.message}`);
            throw error;
        }
    }

    async getBookingsByStatus(status) {
        try {
            return await BookingRepository.getBookingsByStatus(status);
        } catch (error) {
            console.log(`❌ Error fetching booking: ${error.message}`);
            throw error;
        }
    }

    async findBookingById(id) {
        try {
            return await BookingRepository.findBookingById(id);
        } catch (error) {
            console.log(`❌ Error finding booking by ID: ${error.message}`);
            throw error;
        }
    }
    
    async createBooking(booking) {
        try {
            return await BookingRepository.createBooking(booking);
        } catch (error) {
            console.log(`❌ Error creating booking: ${error.message}`);
            throw error;
        }
    }

    async updateBooking(id, booking) {
        try {
            const checkBooking = await BookingRepository.findBookingById(id);
            if (!checkBooking) throw new Error("Booking not found");
            return await BookingRepository.updateBooking(id, booking);
        } catch (error) {
            console.log(`❌ Error updating booking: ${error.message}`);
            throw error;
        }
    }

    async confirmBooking(id) {
        try {
            const checkBooking = await BookingRepository.findBookingById(id);
            if (!checkBooking) throw new Error("Booking not found");
            return await BookingRepository.confirmBooking(id);
        } catch (error) {
            console.log(`❌ Error confirming booking: ${error.message}`);
            throw error;
        }
    }

    async cancelBooking(id) {
        try {
            const checkBooking = await BookingRepository.findBookingById(id);
            if (!checkBooking) throw new Error("Booking not found");
            return await BookingRepository.cancelBooking(id);
        } catch (error) {
            console.log(`❌ Error canceling booking: ${error.message}`);
            throw error;
        }
    }
}
module.exports = new BookingService();