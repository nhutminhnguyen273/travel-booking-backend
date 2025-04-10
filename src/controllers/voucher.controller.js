const VoucherService = require("../services/voucher.service");

class VoucherController {
    async createVoucher(req, res) {
        try {
            const voucher = await VoucherService.createVoucher(req.body);
            res.status(201).json({
                message: "Tạo voucher thành công",
                data: voucher
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getAllVouchers(req, res) {
        try {
            const result = await VoucherService.getAllVouchers(req.query);
            res.status(200).json({
                message: "Lấy danh sách voucher thành công",
                data: result.vouchers,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getVoucherById(req, res) {
        try {
            const voucher = await VoucherService.getVoucherById(req.params.id);
            res.status(200).json({
                message: "Lấy thông tin voucher thành công",
                data: voucher
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getVoucherByCode(req, res) {
        try {
            const { code } = req.params;
            const voucher = await VoucherService.getVoucherByCode(code);
            res.status(200).json({
                message: "Lấy thông tin voucher thành công",
                data: voucher
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateVoucher(req, res) {
        try {
            const voucher = await VoucherService.updateVoucher(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật voucher thành công",
                data: voucher
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async deleteVoucher(req, res) {
        try {
            const voucher = await VoucherService.deleteVoucher(req.params.id);
            res.status(200).json({
                message: "Xóa voucher thành công",
                data: voucher
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new VoucherController();
