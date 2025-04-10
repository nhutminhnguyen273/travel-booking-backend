const ContactService = require("../services/contact.service");

class ContactController {
    async createContact(req, res) {
        try {
            const contact = await ContactService.createContact(req.body);
            res.status(201).json({
                message: "Gửi liên hệ thành công",
                data: contact
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getAllContacts(req, res) {
        try {
            const result = await ContactService.getAllContacts(req.query);
            res.status(200).json({
                message: "Lấy danh sách liên hệ thành công",
                data: result.contacts,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getContactById(req, res) {
        try {
            const contact = await ContactService.getContactById(req.params.id);
            res.status(200).json({
                message: "Lấy thông tin liên hệ thành công",
                data: contact
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateContactStatus(req, res) {
        try {
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({
                    message: "Lỗi",
                    error: "Thiếu trạng thái"
                });
            }

            const contact = await ContactService.updateContactStatus(req.params.id, status);
            res.status(200).json({
                message: "Cập nhật trạng thái liên hệ thành công",
                data: contact
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async deleteContact(req, res) {
        try {
            const contact = await ContactService.deleteContact(req.params.id);
            res.status(200).json({
                message: "Xóa liên hệ thành công",
                data: contact
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new ContactController();
