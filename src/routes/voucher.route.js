const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/voucher.controller");
const Middleware = require("../middleware/middleware");

router.post("/", Middleware.verifyTokenAdmin, VoucherController.createVoucher);
router.get("/", Middleware.verifyTokenAdmin, VoucherController.getAllVouchers);
router.get("/:id", Middleware.verifyTokenAdmin, VoucherController.getVoucherById);
router.get("/code/:code", VoucherController.getVoucherByCode);
router.put("/:id", Middleware.verifyTokenAdmin, VoucherController.updateVoucher);
router.delete("/:id", Middleware.verifyTokenAdmin, VoucherController.deleteVoucher);

module.exports = router; 