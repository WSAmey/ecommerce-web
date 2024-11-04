const { sendEmail } = require("../helpers/email.service");
const { sendResult } = require("../helpers/send_response");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findUserExistService = async (email) => {
  try {
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      return sendResult(
        (status = false),
        (data = isUser),
        (message = "User already exists"),
        (error = "")
      );
    }
    return sendResult(
      (status = true),
      (data = null),
      (message = "User dosn't exists"),
      (error = "")
    );
  } catch (error) {
    console.log("error occured in finduseremail service: ", error.toString());

    return sendResult(
      (status = false),
      (data = null),
      (message = "Internal server error"),
      (error = error?.toString())
    );
  }
};
const findUsernameExistService = async (username) => {
  try {
    const isUser = await userModel.findOne({ username });
    if (isUser) {
      return sendResult(
        (status = false),
        (data = isUser),
        (message = "Username already exists please try another username"),
        (error = "")
      );
    }
    return sendResult(
      (status = true),
      (data = null),
      (message = "Username dosn't exists"),
      (error = "")
    );
  } catch (error) {
    console.log("error occured in findusername service: ", error.toString());

    return sendResult(
      (status = false),
      (data = null),
      (message = "Internal server error"),
      (error = error?.toString())
    );
  }
};
const registerUserService = async (req_body) => {
  try {
    const { username, email, password, role } = req_body;
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const emailSent = await sendEmail(
      (from = "ameysw54@gmail.com"),
      (to = email),
      (subject = "OTP Verification"),
      (text = `This is your verification OTP: ${verificationCode}`),
      (html = `<b>This is your verification OTP: ${verificationCode}</b>`)
    );
    if (!emailSent?.status) {
      return sendResult(
        (status = false),
        (data = null),
        (message = "Error while sending email"),
        (error = emailSent?.error)
      );
    }
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
      role,
      verificationCode,
    });
    // await newUser.save();
    return sendResult(
      (status = true),
      (data = { username, email, role }),
      (message = `User registered successfully. ${emailSent?.message}`),
      (error = "")
    );
  } catch (error) {
    console.log("error occured in registeruser service: ", error.toString());

    return sendResult(
      (status = false),
      (data = null),
      (message = "Internal server error"),
      (error = error?.toString())
    );
  }
};

const loginUserService = async (req_body, db_data) => {
  try {
    const { email, password } = req_body;
    const {
      _id,
      username,
      email: dbEmail,
      password: dbPassword,
      role,
    } = db_data;
    const isMatch = await bcrypt.compare(password, dbPassword);
    if (!isMatch) {
      return sendResult(
        (status = false),
        (data = null),
        (message = "Invalid email or password."),
        (error = "")
      );
    }
    const token = jwt.sign({ id: _id, role: role }, process.env.SECRET, {
      expiresIn: "1h",
    });
    userData = {
      username: username,
      email: email,
      role: role,
      auth: token,
    };
    return sendResult(
      (status = true),
      (data = userData),
      (message = "Successfull login."),
      (error = "")
    );
  } catch (error) {
    console.log("error occured in loginuser service: ", error.toString());

    return sendResult(
      (status = false),
      (data = null),
      (message = "Internal server error."),
      (error = error?.toString())
    );
  }
};



const verifyUserOtpService = async (otp) => {
  try {
    const isVerifiedUser = await userModel.findOne({ verificationCode: otp });
    if (!isVerifiedUser) {
      return sendResult(
        (status = false),
        (data = null),
        (message = "Invalid or expired Otp"),
        (error = "")
      );
    }
    isVerifiedUser.isVerified = true;
    isVerifiedUser.verificationCode = undefined;
    await isVerifiedUser.save();
    return sendResult(
      (status = true),
      (data = null),
      (message = "User Verified successfully"),
      (error = "")
    );
  } catch (error) {
    return sendResult(
      (status = false),
      (data = null),
      (message = "Internal server error."),
      (error = error?.toString())
    );
  }
};

module.exports = {
  findUserExistService,
  findUsernameExistService,
  registerUserService,
  loginUserService,
  verifyUserOtpService,
};
