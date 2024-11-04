const { sendResponse, sendErrorResponse } = require("../helpers/send_response");
const {
  findUserExistService,
  registerUserService,
  findUsernameExistService,
  loginUserService,
  verifyUserOtpService,
} = require("../services/user.service");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = "All fields are required"),
        (data = null)
      );
    }
    const isUserExists = await findUserExistService(email);
    if (!isUserExists?.status) {
      return sendErrorResponse(
        (resp = res),
        (statusCode = 400),
        (message = isUserExists?.message),
        (error = isUserExists?.error)
      );
    }
    const isUsernameExists = await findUsernameExistService(username);
    if (!isUsernameExists?.status) {
      return sendErrorResponse(
        (resp = res),
        (statusCode = 400),
        (message = isUsernameExists?.message),
        (error = isUsernameExists?.error)
      );
    }
    req.body["role"] = "user";
    const registerUser = await registerUserService(req.body);
    if (!registerUser?.status) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = registerUser?.message),
        (data = null)
      );
    }
    return sendResponse(
      (resp = res),
      (statusCode = 201),
      (success = true),
      (message = registerUser?.message),
      (data = registerUser?.data)
    );
  } catch (error) {
    return sendErrorResponse(
      (reqp = res),
      (statusCode = 500),
      (message = "Something wenwrong."),
      (error = error?.toString())
    );
  }
};

const verifyEmailOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = "All fields are required to verify otp"),
        (data = null)
      );
    }
    const isEmailExists = await findUserExistService(email);
    if (isEmailExists?.status) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = isEmailExists?.message),
        (data = null)
      );
    }

    const userVerified = await verifyUserOtpService(code);
    if (!userVerified?.status) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = userVerified?.message),
        (data = null)
      );
    }
    return sendResponse(
      (resp = res),
      (statusCode = 200),
      (success = true),
      (message = userVerified?.message),
      (data = null)
    );
  } catch (error) {
    return sendErrorResponse(
      (reqp = res),
      (statusCode = 500),
      (message = "Something went wrong."),
      (error = erro?.toString())
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(
        (reqp = res),
        (statusCode = 400),
        (success = false),
        (message = "All fields are required"),
        (data = null)
      );
    }
    const isUserExists = await findUserExistService(email);
    if (isUserExists?.status) {
      return sendErrorResponse(
        (resp = res),
        (statusCode = 400),
        (message = isUserExists?.message),
        (error = isUserExists?.error || "")
      );
    }
    if (!isUserExists?.data?.isVerified) {
      return sendErrorResponse(
        (resp = res),
        (statusCode = 400),
        (message = "User is not verified"),
        (error = "")
      );
    }

    const loginUser = await loginUserService(req.body, isUserExists?.data);
    if (!loginUser?.status) {
      return sendResponse(
        (resp = res),
        (statusCode = 400),
        (success = false),
        (message = loginUser?.message),
        (data = null)
      );
    }
    return sendResponse(
      (resp = res),
      (statusCode = 200),
      (success = true),
      (message = loginUser?.message),
      (data = loginUser?.data)
    );
  } catch (error) {
    return sendErrorResponse(
      (reqp = res),
      (statusCode = 500),
      (message = "Something wenwrong."),
      (error = erro?.toString())
    );
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmailOtp,
};
