const express = require('express');
const {
    registrationController,
    loginController,
    verifyToken,
    resendVerifyToken,
} = require('./auth.controllers')

const  {
    validatorRegistrationMiddleware,
    validatorLoginMiddleware,
    validatorResendVerifyMiddleware,
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
authRouter.post(
    '/sendVerify',
    validatorResendVerifyMiddleware,
    resendVerifyToken
);


module.exports = authRouter;