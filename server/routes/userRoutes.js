import express from "express";
import path from "path";
import {
  acceptRequest,
  changePassword,
  friendRequest,
  getFriendRequest,
  getUser,
  profileViews,
  requestPasswordReset,
  resetPassword,
  suggestedFriends,
  updateUser,
  verifyEmail,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

// Khởi tạo một router Express mới
const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

// Route xác thực email người dùng
/**
 * @route GET /verify/:userId/:token
 * @description Xác thực email của người dùng khi nhận được token xác thực
 * @access Public
 */
router.get("/verify/:userId/:token", verifyEmail);

// Đặt lại mật khẩu
/**
 * @route POST /request-passwordreset
 * @description Yêu cầu reset mật khẩu qua email
 * @access Public
 */
router.post("/request-passwordreset", requestPasswordReset);

/**
 * @route GET /reset-password/:userId/:token
 * @description Reset mật khẩu của người dùng khi nhận được token
 * @access Public
 */
router.get("/reset-password/:userId/:token", resetPassword);

/**
 * @route POST /reset-password
 * @description Đổi mật khẩu cho người dùng sau khi reset
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/reset-password", changePassword);

// Các route liên quan đến người dùng

/**
 * @route POST /get-user/:id?
 * @description Lấy thông tin người dùng theo ID. Nếu không có ID, lấy thông tin của người dùng hiện tại
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/get-user/:id?", userAuth, getUser);

/**
 * @route PUT /update-user
 * @description Cập nhật thông tin người dùng
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.put("/update-user", userAuth, updateUser);

// Các route liên quan đến yêu cầu kết bạn

/**
 * @route POST /friend-request
 * @description Gửi yêu cầu kết bạn tới người dùng khác
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/friend-request", userAuth, friendRequest);

/**
 * @route POST /get-friend-request
 * @description Lấy danh sách yêu cầu kết bạn của người dùng
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/get-friend-request", userAuth, getFriendRequest);

/**
 * @route POST /accept-request
 * @description Chấp nhận yêu cầu kết bạn
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/accept-request", userAuth, acceptRequest);

// Các route liên quan đến lượt xem hồ sơ người dùng

/**
 * @route POST /profile-view
 * @description Cập nhật lượt xem hồ sơ của người dùng
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/profile-view", userAuth, profileViews);

// Các route liên quan đến bạn bè được gợi ý

/**
 * @route POST /suggested-friends
 * @description Lấy danh sách bạn bè gợi ý cho người dùng
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/suggested-friends", userAuth, suggestedFriends);

// Routes trả về các tệp HTML cho frontend

/**
 * @route GET /verified
 * @description Trả về trang HTML xác nhận khi email đã được xác thực
 * @access Public
 */
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

/**
 * @route GET /resetpassword
 * @description Trả về trang HTML để đặt lại mật khẩu
 * @access Public
 */
router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

// Xuất router để sử dụng trong các phần khác của ứng dụng
export default router;
