/* eslint-disable no-unused-vars */
import axios from "axios";
import { SetPosts } from "../redux/postSlice";

const API_URL = "https://server-clouds.onrender.com";
// https://clouds-mern-app.onrender.com
// http://localhost:8800

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

/**
 * Hàm gửi yêu cầu API chung.
 * 
 * @param {Object} params - Các tham số cho yêu cầu API.
 * @param {string} params.url - Địa chỉ URL của yêu cầu.
 * @param {string} [params.token] - Mã thông báo xác thực (tuỳ chọn).
 * @param {Object} [params.data] - Dữ liệu gửi kèm yêu cầu (tuỳ chọn).
 * @param {string} [params.method='GET'] - Phương thức HTTP (mặc định là GET).
 * 
 * @returns {Object} - Dữ liệu phản hồi từ API.
 */
export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        return result?.data;
    } catch (error) {
        const err = error.response.data;
        console.log(error);
        return {status: error.success, message: error.message};
    }
}

/**
 * Tải lên tệp lên Cloudinary và trả về URL của tệp.
 * 
 * @param {File} uploadFile - Tệp cần tải lên.
 * 
 * @returns {string} - URL của tệp đã tải lên.
 */
export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "clouds-mern-app");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Lấy các bài đăng từ máy chủ và gửi chúng vào Redux store.
 * 
 * @param {string} token - Mã thông báo xác thực.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {string} [uri="/posts"] - Địa chỉ URI để lấy bài đăng (tuỳ chọn).
 * @param {Object} [data={}] - Dữ liệu gửi kèm yêu cầu (tuỳ chọn).
 * 
 * @returns {void}
 */
export const fetchPosts = async(token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });

        dispatch(SetPosts(res?.data));
        return;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Thích một bài đăng.
 * 
 * @param {Object} params - Các tham số để thích bài đăng.
 * @param {string} params.uri - URI của bài đăng cần thích.
 * @param {string} params.token - Mã thông báo xác thực.
 * 
 * @returns {Object} - Phản hồi từ máy chủ.
 */
export const likePost = async ({uri, token}) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST",
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Xóa một bài đăng theo ID.
 * 
 * @param {string} id - ID của bài đăng cần xóa.
 * @param {string} token - Mã thông báo xác thực.
 * 
 * @returns {void}
 */
export const deletePost = async (id, token) => {
    try {
        const res = await apiRequest({
            url: "/posts/" + id,
            token: token,
            method: "DELETE",
        });
        return;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Lấy thông tin người dùng theo ID hoặc người dùng hiện tại.
 * 
 * @param {string} token - Mã thông báo xác thực.
 * @param {string} [id] - ID của người dùng cần lấy thông tin (tuỳ chọn).
 * 
 * @returns {Object} - Dữ liệu người dùng.
 */
export const getUserInfo = async (token, id) => {
    try {
        const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST",
        });

        if (res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("Phiên người dùng đã hết hạn. Đăng nhập lại");
            window.location.href("/login");
        }

        return res?.user;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gửi yêu cầu kết bạn tới một người dùng.
 * 
 * @param {string} token - Mã thông báo xác thực.
 * @param {string} id - ID của người dùng cần gửi yêu cầu kết bạn.
 * 
 * @returns {void}
 */
export const sendFriendRequest = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/friend-request/",
            token: token,
            method: "POST",
            data: { requestTo: id },
        });

        return;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Xem hồ sơ người dùng.
 * 
 * @param {string} token - Mã thông báo xác thực.
 * @param {string} id - ID của người dùng cần xem hồ sơ.
 * 
 * @returns {void}
 */
export const viewUserProfile = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/profile-view/",
            token: token,
            method: "POST",
            data: { id },
        });
        
        return;
    } catch (error) {
        console.log(error);
    }
}
