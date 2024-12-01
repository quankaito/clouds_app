import mongoose, { Schema } from "mongoose";

// Định nghĩa Schema cho yêu cầu kết bạn
const requestSchema = Schema(
  {
    // ID của người nhận yêu cầu kết bạn (liên kết tới collection Users)
    requestTo: { type: Schema.Types.ObjectId, ref: "Users" },

    // ID của người gửi yêu cầu kết bạn (liên kết tới collection Users)
    requestFrom: { type: Schema.Types.ObjectId, ref: "Users" },

    // Trạng thái của yêu cầu kết bạn (mặc định là "Pending")
    requestStatus: { type: String, default: "Pending" },
  },
  { timestamps: true } // Tự động tạo trường createdAt và updatedAt
);

// Tạo mô hình FriendRequest từ schema requestSchema
const FriendRequest = mongoose.model("FriendRequest", requestSchema);

// Xuất mô hình FriendRequest để sử dụng trong các phần khác của ứng dụng
export default FriendRequest;
