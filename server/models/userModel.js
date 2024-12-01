import mongoose, { Schema } from "mongoose";

// Định nghĩa Schema cho người dùng (User)
const userSchema = new mongoose.Schema(
  {
    // Tên của người dùng (bắt buộc)
    firstName: {
      type: String,
      required: [true, "First Name is Required!"], // Mặc định yêu cầu phải có tên
    },

    // Họ của người dùng (bắt buộc)
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"], // Mặc định yêu cầu phải có họ
    },

    // Email của người dùng (bắt buộc và phải duy nhất)
    email: {
      type: String,
      required: [true, " Email is Required!"], // Yêu cầu có email
      unique: true, // Đảm bảo email là duy nhất trong hệ thống
    },

    // Mật khẩu của người dùng (bắt buộc và có độ dài tối thiểu)
    password: {
      type: String,
      required: [true, "Password is Required!"], // Yêu cầu có mật khẩu
      minlength: [6, "Password length should be greater than 6 character"], // Mật khẩu phải có ít nhất 6 ký tự
      select: true, // Chỉ định rằng trường password sẽ được trả về khi tìm kiếm người dùng
    },

    // Vị trí của người dùng (tuỳ chọn)
    location: { type: String },

    // URL hồ sơ của người dùng (tuỳ chọn)
    profileUrl: { type: String },

    // Nghề nghiệp của người dùng (tuỳ chọn)
    profession: { type: String },

    // Danh sách bạn bè (liên kết tới collection Users)
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],

    // Danh sách lượt xem hồ sơ của người dùng
    views: [{ type: String }],

    // Trạng thái xác minh tài khoản (mặc định là false)
    verified: { type: Boolean, default: false },
  },
  { timestamps: true } // Tự động tạo trường createdAt và updatedAt
);

// Tạo mô hình Users từ schema userSchema
const Users = mongoose.model("Users", userSchema);

// Xuất mô hình Users để sử dụng trong các phần khác của ứng dụng
export default Users;
