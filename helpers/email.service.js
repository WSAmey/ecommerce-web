const nodemailer = require("nodemailer");
const { sendResult } = require("./send_response");

console.log("::", process.env.APP_PASS, process.env.EMAIL);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (from, to, subject, text, html) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from,
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
    return sendResult(
      (status = true),
      (data = info),
      (message = "OTP has been sent to your email"),
      (error = "")
    );
  } catch (error) {  
    console.log("error in email service:: ", error);
    return sendResult(
      (status = true),
      (data = info),
      (message = "Error while sending email"),
      (error = error?.toString())
    );
  }
};

module.exports = { sendEmail };
