const Blog = require("../models/blog.model");

class BlogService {
    async createBlog(blogData) {
        try {
            const blog = await Blog.create(blogData);
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async getAllBlogs(query = {}) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                status, 
                category,
                tag,
                search,
                sort = "-createdAt" 
            } = query;
            
            const filter = { isDeleted: false };
            
            if (status) {
                filter.status = status;
            }
            
            if (category) {
                filter.category = category;
            }
            
            if (tag) {
                filter.tags = tag;
            }
            
            if (search) {
                filter.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { summary: { $regex: search, $options: "i" } }
                ];
            }

            const blogs = await Blog.find(filter)
                .populate("author", "name email")
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Blog.countDocuments(filter);

            return {
                blogs,
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

    async getBlogById(id) {
        try {
            const blog = await Blog.findOne({ _id: id, isDeleted: false })
                .populate("author", "name email");
                
            if (!blog) {
                throw new Error("Không tìm thấy bài viết");
            }
            
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async updateBlog(id, updateData) {
        try {
            const blog = await Blog.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            ).populate("author", "name email");

            if (!blog) {
                throw new Error("Không tìm thấy bài viết");
            }

            return blog;
        } catch (error) {
            throw error;
        }
    }

    async deleteBlog(id) {
        try {
            const blog = await Blog.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true }
            );
            
            if (!blog) {
                throw new Error("Không tìm thấy bài viết");
            }

            return blog;
        } catch (error) {
            throw error;
        }
    }

    async incrementViewCount(id) {
        try {
            const blog = await Blog.findById(id);
            if (!blog) {
                throw new Error("Không tìm thấy bài viết");
            }
            
            await blog.incrementViewCount();
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async getBlogsByAuthor(authorId, query = {}) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                status,
                sort = "-createdAt" 
            } = query;
            
            const filter = { 
                author: authorId,
                isDeleted: false 
            };
            
            if (status) {
                filter.status = status;
            }

            const blogs = await Blog.find(filter)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Blog.countDocuments(filter);

            return {
                blogs,
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
}

module.exports = new BlogService();
