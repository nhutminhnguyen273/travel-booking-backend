const BlogService = require("../services/blog.service");

class BlogController {
    async createBlog(req, res) {
        try {
            const blogData = {
                ...req.body,
                author: req.user.id
            };
            const blog = await BlogService.createBlog(blogData);
            res.status(201).json({
                message: "Tạo bài viết thành công",
                data: blog
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getAllBlogs(req, res) {
        try {
            const result = await BlogService.getAllBlogs(req.query);
            res.status(200).json({
                message: "Lấy danh sách bài viết thành công",
                data: result.blogs,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getBlogById(req, res) {
        try {
            const blog = await BlogService.getBlogById(req.params.id);
            // Tăng số lượt xem
            await BlogService.incrementViewCount(req.params.id);
            
            res.status(200).json({
                message: "Lấy thông tin bài viết thành công",
                data: blog
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateBlog(req, res) {
        try {
            const blog = await BlogService.updateBlog(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật bài viết thành công",
                data: blog
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async deleteBlog(req, res) {
        try {
            const blog = await BlogService.deleteBlog(req.params.id);
            res.status(200).json({
                message: "Xóa bài viết thành công",
                data: blog
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getMyBlogs(req, res) {
        try {
            const result = await BlogService.getBlogsByAuthor(req.user.id, req.query);
            res.status(200).json({
                message: "Lấy danh sách bài viết của bạn thành công",
                data: result.blogs,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new BlogController();
