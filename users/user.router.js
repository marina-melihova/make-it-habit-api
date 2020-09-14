const express = require('express');
const {
    updateUserController,
    updateUserQuizInfoController,
    updateUserCigarettesController
} = require('./user.controllers')

const  {
    validatorUpdateUserMiddleware,
    validatorUpdateQuizInfoMiddleware,
    validatorUpdateCigarettesMiddleware,
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

userRouter.post(
    '/updateQuizInfo',
    checkTokenMiddleware,
    validatorUpdateQuizInfoMiddleware,
    updateUserQuizInfoController
)

userRouter.post(
    '/updateCigarettes',
    checkTokenMiddleware,
    validatorUpdateCigarettesMiddleware,
    updateUserCigarettesController,
)



module.exports = userRouter;