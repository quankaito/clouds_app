import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";

// Khởi tạo một router Express mới
const router = express.Router();

// Định tuyến các route con vào router chính:
// - authRoute cho các yêu cầu liên quan đến đăng ký và đăng nhập
// - userRoute cho các yêu cầu liên quan đến người dùng
// - postRoute cho các yêu cầu liên quan đến bài viết

/**
 * @route /auth
 * @description Các route liên quan đến xác thực người dùng
 * @access Public
 */
router.use(`/auth`, authRoute); // Các route con trong authRoute sẽ được xử lý tại /auth (ví dụ: /auth/register, /auth/login)

/**
 * @route /users
 * @description Các route liên quan đến người dùng
 * @access Private
 */
router.use(`/users`, userRoute); // Các route con trong userRoute sẽ được xử lý tại /users (ví dụ: /users/profile)

/**
 * @route /posts
 * @description Các route liên quan đến bài viết
 * @access Private
 */
router.use(`/posts`, postRoute); // Các route con trong postRoute sẽ được xử lý tại /posts (ví dụ: /posts/create, /posts/:id)

export default router;
