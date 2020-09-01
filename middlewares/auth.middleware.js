const {
    verifyToken,
} = require('../services/token.service');

const checkTokenMiddleware = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            return res.status(401).send('No token provided');
        }
        const {id} = await verifyToken(authorization);
        req.userId = id;
        next()
    } catch (e) {
        res.status(401).send('Invalid token');
    }
}

module.exports = {
    checkTokenMiddleware,
}