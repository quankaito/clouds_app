import mongoose, { Schema } from "mongoose";

// Định nghĩa Schema cho bài viết (Post)
const postSchema = new mongoose.Schema(
  {
    // ID của người dùng tạo bài viết (liên kết tới collection Users)
    userId: { type: Schema.Types.ObjectId, ref: "Users" },

    // Mô tả nội dung bài viết
    description: { type: String, required: true },

    // Đường dẫn đến hình ảnh của bài viết (tuỳ chọn)
    image: { type: String },

    // Danh sách các lượt thích bài viết
    likes: [{ type: String }],

    // Danh sách các bình luận liên kết với bài viết (liên kết tới collection Comments)
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true } // Tự động tạo trường createdAt và updatedAt
);

// Tạo mô hình Posts từ schema postSchema
const Posts = mongoose.model("Posts", postSchema);

// Xuất mô hình Posts để sử dụng trong các phần khác của ứng dụng
export default Posts;
