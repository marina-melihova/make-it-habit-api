const express = require('express');
const {
    updateUserController
} = require('./user.controllers')

const  {
    validatorUpdateUserMiddleware,
} = require('./user.validator')

const  {
    checkTokenMiddleware,
} = require('../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.patch(
    '/',
    checkTokenMiddleware,
    validatorUpdateUserMiddleware,
    updateUserController
)


module.exports = userRouter;