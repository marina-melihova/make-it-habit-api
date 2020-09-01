const jwt = require('jsonwebtoken');

const createToken = async id => {
    return await jwt.sign({id}, process.env.ACCESS_JWT_KEY, {expiresIn: '7 days'});
}

const verifyToken = async token => {
    return await jwt.verify(token, process.env.ACCESS_JWT_KEY);
}

module.exports = {
    createToken,
    verifyToken,
}