const express = require('express');
const {
    registrationController,
    loginController,
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


module.exports = authRouter;