const Voucher = require("../models/voucher.model");

class VoucherService {
    async createVoucher(voucherData) {
        try {
            // Kiểm tra mã voucher đã tồn tại chưa
            const existingVoucher = await Voucher.findOne({ code: voucherData.code });
            if (existingVoucher) {
                throw new Error("Mã voucher đã tồn tại");
            }

            const voucher = await Voucher.create(voucherData);
            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async getAllVouchers(query = {}) {
        try {
            const { page = 1, limit = 10, isActive, sort = "-createdAt" } = query;
            const filter = { isDeleted: false };
            
            if (isActive !== undefined) {
                filter.isActive = isActive;
            }

            const vouchers = await Voucher.find(filter)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Voucher.countDocuments(filter);

            return {
                vouchers,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async getVoucherById(id) {
        try {
            const voucher = await Voucher.findOne({ _id: id, isDeleted: false });
            if (!voucher) {
                throw new Error("Không tìm thấy voucher");
            }
            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async getVoucherByCode(code) {
        try {
            const voucher = await Voucher.findOne({ 
                code, 
                isDeleted: false,
                isActive: true,
                startDate: { $lte: new Date() },
                endDate: { $gte: new Date() }
            });
            
            if (!voucher) {
                throw new Error("Voucher không hợp lệ hoặc đã hết hạn");
            }

            if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
                throw new Error("Voucher đã hết lượt sử dụng");
            }

            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async updateVoucher(id, updateData) {
        try {
            // Kiểm tra mã voucher mới có bị trùng không
            if (updateData.code) {
                const existingVoucher = await Voucher.findOne({ 
                    code: updateData.code,
                    _id: { $ne: id }
                });
                if (existingVoucher) {
                    throw new Error("Mã voucher đã tồn tại");
                }
            }

            const voucher = await Voucher.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if (!voucher) {
                throw new Error("Không tìm thấy voucher");
            }

            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async deleteVoucher(id) {
        try {
            const voucher = await Voucher.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true }
            );
            
            if (!voucher) {
                throw new Error("Không tìm thấy voucher");
            }

            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async incrementVoucherUsage(id) {
        try {
            const voucher = await Voucher.findByIdAndUpdate(
                id,
                { $inc: { usedCount: 1 } },
                { new: true }
            );
            
            if (!voucher) {
                throw new Error("Không tìm thấy voucher");
            }

            return voucher;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new VoucherService();
