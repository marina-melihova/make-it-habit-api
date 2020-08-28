const express = require('express');
const {
    registrationController,
    loginController,
    verifyToken,
} = require('./auth.controllers')

const  {
    validatorRegistrationMiddleware,
    validatorLoginMiddleware,
} = require('./auth.validator')

const authRouter = express.Router()

authRouter.post(
    '/registration',
    validatorRegistrationMiddleware,
    registrationController
)
authRouter.post(
    '/login',
    validatorLoginMiddleware,
    loginController
)
authRouter.get(
    '/verify/:verifyToken',
    verifyToken
);


module.exports = authRouter;