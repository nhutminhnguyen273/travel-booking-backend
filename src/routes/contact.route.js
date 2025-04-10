const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");


router.post("/", ContactController.createContact);
router.get("/", verifyToken, isAdmin, ContactController.getAllContacts);
router.get("/:id", verifyToken, isAdmin, ContactController.getContactById);
router.patch("/:id/status", verifyToken, isAdmin, ContactController.updateContactStatus);
router.delete("/:id", verifyToken, isAdmin, ContactController.deleteContact);

module.exports = router; 