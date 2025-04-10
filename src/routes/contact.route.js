const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const Middleware = require("../middleware/middleware");


router.post("/", ContactController.createContact);
router.get("/", Middleware.verifyTokenAdmin, ContactController.getAllContacts);
router.get("/:id", Middleware.verifyTokenAdmin, ContactController.getContactById);
router.patch("/:id/status", Middleware.verifyTokenAdmin, ContactController.updateContactStatus);
router.delete("/:id", Middleware.verifyTokenAdmin, ContactController.deleteContact);

module.exports = router; 