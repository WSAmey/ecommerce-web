const jwt = require("jsonwebtoken");
const { sendResponse } = require("../helpers/send_response");
const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return sendResponse(
        (resp = res),
        (statusCode = 403),
        (success = false),
        (message = "Invalid bearer token"),
        (data = null)
      );
    }
    else{
        const token = authHeader.split(" ")[1];
        
    }
  } catch (error) {}
};
