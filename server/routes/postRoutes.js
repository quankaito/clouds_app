import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  commentPost,
  createPost,
  deletePost,
  getComments,
  getPost,
  getPosts,
  getUserPost,
  likePost,
  likePostComment,
  replyPostComment,
} from "../controllers/postController.js";

// Khởi tạo một router Express mới
const router = express.Router();

/**
 * @route POST /create-post
 * @description Tạo bài viết mới
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/create-post", userAuth, createPost);

/**
 * @route POST /posts
 * @description Lấy danh sách tất cả các bài viết
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/", userAuth, getPosts);

/**
 * @route POST /posts/:id
 * @description Lấy thông tin chi tiết của một bài viết cụ thể theo ID
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/:id", userAuth, getPost);

/**
 * @route POST /posts/get-user-post/:id
 * @description Lấy các bài viết của người dùng theo ID
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/get-user-post/:id", userAuth, getUserPost);

/**
 * @route GET /posts/comments/:postId
 * @description Lấy danh sách các bình luận của bài viết
 * @access Public
 */
router.get("/comments/:postId", getComments);

/**
 * @route POST /posts/like/:id
 * @description Thích bài viết
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/like/:id", userAuth, likePost);

/**
 * @route POST /posts/like-comment/:id/:rid?
 * @description Thích bình luận trên bài viết
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);

/**
 * @route POST /posts/comment/:id
 * @description Bình luận trên bài viết
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/comment/:id", userAuth, commentPost);

/**
 * @route POST /posts/reply-comment/:id
 * @description Trả lời bình luận trên bài viết
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.post("/reply-comment/:id", userAuth, replyPostComment);

/**
 * @route DELETE /posts/:id
 * @description Xóa bài viết theo ID
 * @access Private (yêu cầu người dùng đã xác thực)
 */
router.delete("/:id", userAuth, deletePost);

// Xuất router để sử dụng trong các phần khác của ứng dụng
export default router;
