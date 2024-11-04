const jwt = require("jsonwebtoken");
const { sendResponse, sendErrorResponse } = require("../helpers/send_response");
const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return sendResponse(
        (resp = res),
        (statusCode = 403),
        (success = false),
        (message = "Invalid bearer token"),
        (data = null)
      );
    } else {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return sendErrorResponse(
          (resp = res),
          (statusCode = 401),
          (message = "Invalid token, authorization denied"),
          (error = "")
        );
      }
      const decode = jwt.verify(token, process?.env?.SECRET);
      req.user = decode;
      console.log("decoded user::", req.user);
      next();
    }
  } catch (error) {
    return sendErrorResponse(
      (resp = res),
      (statusCode = 401),
      (message = "Invalid token, authorization denied"),
      (error = error?.toString())
    );
  }
};

module.exports = authentication;
