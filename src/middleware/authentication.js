const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/responseUtil');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return sendResponse(res, 401, false, 'Access Denied, User Unauthenticated!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!req.user) {
            return sendResponse(res, 400, false, 'Unauthorized, Login please!');
        }

        next();
    } catch (error) {
        sendResponse(res, 400, false, 'Unauthorized, Login please vvvvv!');
    }
};

module.exports = { authenticate };
