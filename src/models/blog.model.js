const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Vui lòng nhập tiêu đề bài viết"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Vui lòng nhập nội dung bài viết"],
        },
        summary: {
            type: String,
            required: [true, "Vui lòng nhập tóm tắt bài viết"],
            trim: true,
        },
        thumbnail: {
            type: String,
            required: [true, "Vui lòng nhập ảnh đại diện"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        category: {
            type: String,
            required: [true, "Vui lòng chọn danh mục"],
            enum: ["news", "travel", "tips", "reviews", "other"],
        },
        tags: [{
            type: String,
            trim: true,
        }],
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Tăng số lượt xem
blogSchema.methods.incrementViewCount = async function() {
    this.viewCount += 1;
    return this.save();
};

module.exports = mongoose.model("blogs", blogSchema);
