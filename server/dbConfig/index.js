import mongoose from "mongoose";

/**
 * Kết nối tới cơ sở dữ liệu MongoDB
 * 
 * Sử dụng `mongoose.connect()` để kết nối với MongoDB thông qua URL được cung cấp trong biến môi trường `MONGODB_URL`.
 * Nếu kết nối thành công, thông báo "DB Connected Successfully" sẽ được in ra console.
 * Nếu có lỗi trong quá trình kết nối, lỗi sẽ được in ra console với thông báo "DB Error".
 * 
 * @async
 * @function dbConnection
 */
const dbConnection = async () => {
  try {
    // Kết nối đến cơ sở dữ liệu MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,   // Sử dụng parser mới cho URL
      useUnifiedTopology: true, // Sử dụng topology mới cho kết nối MongoDB
    });

    // Nếu kết nối thành công, in ra thông báo
    console.log("DB Connected Successfully");
  } catch (error) {
    // Nếu có lỗi trong khi kết nối, in ra lỗi
    console.log("DB Error: " + error);
  }
};

// Xuất function dbConnection để sử dụng ở các phần khác trong ứng dụng
export default dbConnection;
