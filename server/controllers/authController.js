import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

/**
 * Đăng ký người dùng mới.
 * 
 * Hàm này thực hiện việc đăng ký người dùng mới. Nó nhận thông tin từ `req.body`, kiểm tra tính hợp lệ của các trường,
 * mã hóa mật khẩu và tạo người dùng mới trong cơ sở dữ liệu. Sau đó, nó gửi email xác thực tới người dùng mới.
 * 
 * @param {Object} req - Đối tượng yêu cầu HTTP chứa thông tin người dùng.
 * @param {Object} res - Đối tượng phản hồi HTTP.
 * @param {Function} next - Hàm tiếp theo để xử lý lỗi (nếu có).
 */
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Kiểm tra tính hợp lệ của các trường dữ liệu
  if (!(firstName || lastName || email || password)) {
    next("Provide Required Fields!");
    return;
  }

  try {
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    // Mã hóa mật khẩu người dùng
    const hashedPassword = await hashString(password);

    // Tạo người dùng mới trong cơ sở dữ liệu
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Gửi email xác thực tới người dùng
    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/**
 * Đăng nhập người dùng.
 * 
 * Hàm này thực hiện việc đăng nhập người dùng. Nó kiểm tra thông tin đăng nhập (email và mật khẩu),
 * nếu hợp lệ sẽ so sánh mật khẩu, tạo token JWT và trả về thông tin người dùng.
 * 
 * @param {Object} req - Đối tượng yêu cầu HTTP chứa thông tin đăng nhập của người dùng.
 * @param {Object} res - Đối tượng phản hồi HTTP.
 * @param {Function} next - Hàm tiếp theo để xử lý lỗi (nếu có).
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra tính hợp lệ của thông tin đăng nhập
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // Tìm người dùng theo email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      next("Invalid email or password");
      return;
    }

    // Kiểm tra nếu email chưa được xác thực
    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    // So sánh mật khẩu người dùng
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    // Xóa mật khẩu khỏi đối tượng người dùng trước khi trả về
    user.password = undefined;

    // Tạo token JWT cho người dùng
    const token = createJWT(user?._id);

    // Trả về thông tin người dùng và token
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
