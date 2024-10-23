const sendResponse=(resp,statusCode, success, message="", data=null )=>{
    return resp.status(statusCode).json({statusCode, success, message, data});
}
const sendErrorResponse=(resp,statusCode, message="", error="" )=>{
    return resp.status(statusCode).json({statusCode, success:false, message, error, data:null});
}
const sendResult=(status, data, message="", error="" )=>{
    return {status, data, message, error};
}

module.exports ={sendResponse, sendErrorResponse, sendResult}
