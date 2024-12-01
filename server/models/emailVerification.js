import mongoose, { Schema } from "mongoose";

// Định nghĩa Schema cho xác thực email
const emailVerificationSchema = Schema({
  // ID của người dùng cần xác thực email
  userId: String,

  // Mã token xác thực email
  token: String,

  // Thời gian tạo mã token
  createdAt: Date,

  // Thời gian mã token hết hạn
  expiresAt: Date,
});

// Tạo mô hình Verification từ schema emailVerificationSchema
const Verification = mongoose.model("Verification", emailVerificationSchema);

// Xuất mô hình Verification để sử dụng trong các phần khác của ứng dụng
export default Verification;
