import mongoose, { Schema } from "mongoose";

// Định nghĩa Schema cho Comment
const commentSchema = new mongoose.Schema(
  {
    // ID của người dùng (ref tới collection Users)
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    
    // ID của bài viết (ref tới collection Posts)
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },

    // Nội dung bình luận
    comment: { type: String, required: true },

    // Người gửi bình luận
    from: { type: String, required: true },

    // Danh sách các phản hồi (replies) đối với bình luận này
    replies: [
      {
        // ID của phản hồi
        rid: { type: mongoose.Schema.Types.ObjectId },
        
        // ID của người dùng phản hồi (ref tới collection Users)
        userId: { type: Schema.Types.ObjectId, ref: "Users" },

        // Người gửi phản hồi
        from: { type: String },

        // Thời gian phản hồi
        replyAt: { type: String },

        // Nội dung phản hồi
        comment: { type: String },

        // Thời gian tạo phản hồi
        created_At: { type: Date, default: Date.now() },

        // Thời gian cập nhật phản hồi
        updated_At: { type: Date, default: Date.now() },

        // Danh sách các lượt thích cho phản hồi
        likes: [{ type: String }],
      },
    ],

    // Danh sách các lượt thích cho bình luận
    likes: [{ type: String }],
  },
  { timestamps: true } // Tự động tạo trường createdAt và updatedAt
);

// Tạo mô hình Comments dựa trên commentSchema
const Comments = mongoose.model("Comments", commentSchema);

// Xuất mô hình Comments để sử dụng trong các phần khác của ứng dụng
export default Comments;
