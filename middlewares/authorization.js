const { sendErrorResponse } = require("../helpers/send_response");

const authorizeRole = (...allowedRoles) => {
    return (req, res, next)=>{
        if(!allowedRoles?.includes(req.user.role)){
            return sendErrorResponse(resp=res, statusCode=403, message="Access denied", error="");
        }
        next();
    }
};

module.exports = authorizeRole;
