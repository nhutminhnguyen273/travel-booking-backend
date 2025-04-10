const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blog.controller");
const Middleware = require("../middleware/middleware");

router.post("/", Middleware.verifyToken, BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);
router.get("/my-blogs", Middleware.verifyToken, BlogController.getMyBlogs);
router.put("/:id", Middleware.verifyToken, BlogController.updateBlog);
router.delete("/:id", Middleware.verifyToken, BlogController.deleteBlog);

module.exports = router; 