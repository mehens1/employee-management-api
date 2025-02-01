function sendResponse(res, statusCode, status, message, data = null) {
    res.status(statusCode).json({
        status,
        status_code: statusCode,
        message,
        data
    });
}

module.exports = sendResponse;