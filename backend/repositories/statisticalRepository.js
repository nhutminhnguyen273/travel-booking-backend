const Statistical = require('../models/statistical');

class StatisticalRepository {
    async createStatistical(statistical) {
        try {
            return await Statistical.create(statistical);
        } catch (error) {
            throw error;
        }
    }

    async findByDate(date) {
        try {
            return await Statistical.findOne({ date });
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await Statistical.find().sort({ createAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Statistical.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateStatistical(id, statistical) {
        try {
            return await Statistical.findByIdAndUpdate(id, statistical, { new: true });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new StatisticalRepository();