const Contact = require("../models/contact.model");

class ContactService {
    async createContact(contactData) {
        try {
            const contact = await Contact.create(contactData);
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async getAllContacts(query = {}) {
        try {
            const { page = 1, limit = 10, status, sort = "-createdAt" } = query;
            const filter = {};
            
            if (status) {
                filter.status = status;
            }

            const contacts = await Contact.find(filter)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Contact.countDocuments(filter);

            return {
                contacts,
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

    async getContactById(id) {
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                throw new Error("Không tìm thấy liên hệ");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async updateContactStatus(id, status) {
        try {
            const contact = await Contact.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!contact) {
                throw new Error("Không tìm thấy liên hệ");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async deleteContact(id) {
        try {
            const contact = await Contact.findByIdAndDelete(id);
            if (!contact) {
                throw new Error("Không tìm thấy liên hệ");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ContactService();
