const express = require('express');
const {
    checkTokenMiddleware
} = require('../middlewares/auth.middleware')
const {
    registrationController,
    loginController,
    updatePasswordController,
} = require('./auth.controllers')

const  {
    validatorRegistrationMiddleware,
    validatorLoginMiddleware,
    validatorUpdatePasswordMiddleware
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

authRouter.post(
    '/updatePassword',
    checkTokenMiddleware,
    validatorUpdatePasswordMiddleware,
    updatePasswordController
)


module.exports = authRouter;