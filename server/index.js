import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
// Các gói bảo mật
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

// Lấy đường dẫn tuyệt đối của thư mục hiện tại
const __dirname = path.resolve(path.dirname(""));

// Tải các biến môi trường từ file .env
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Định nghĩa thư mục chứa các file tĩnh
app.use(express.static(path.join(__dirname, "views/build")));

// Lấy giá trị cổng từ biến môi trường hoặc cổng mặc định là 8800
const PORT = process.env.PORT || 8800;

// Kết nối cơ sở dữ liệu
dbConnection();

// Sử dụng helmet để bảo mật HTTP header
app.use(helmet());

// Cho phép ứng dụng nhận các yêu cầu từ các nguồn khác (Cross-Origin Resource Sharing)
app.use(cors());

// Phân tích body của yêu cầu với định dạng JSON
app.use(bodyParser.json());

// Phân tích body của yêu cầu với định dạng x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Giới hạn kích thước file JSON tối đa là 10MB
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Sử dụng morgan để ghi lại các log của các yêu cầu HTTP
app.use(morgan("dev"));

// Định tuyến các yêu cầu tới router
app.use(router);

// Sử dụng middleware xử lý lỗi
app.use(errorMiddleware);

// Khởi động server và lắng nghe yêu cầu trên cổng đã được chỉ định
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
