import express from "express";
import { login, register } from "../controllers/authController.js";

// Khởi tạo một router Express mới
const router = express.Router();

// Định tuyến cho yêu cầu POST đến '/register' để đăng ký người dùng
// Truyền đến controller 'register' để xử lý
/**
 * @route POST /register
 * @description Đăng ký tài khoản mới
 * @access Public
 */
router.post("/register", register);

// Định tuyến cho yêu cầu POST đến '/login' để đăng nhập
// Truyền đến controller 'login' để xử lý
/**
 * @route POST /login
 * @description Đăng nhập người dùng
 * @access Public
 */
router.post("/login", login);

// Xuất router để sử dụng trong các phần khác của ứng dụng
export default router;
