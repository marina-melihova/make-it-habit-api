const express = require('express');
const {
    updateUserController,
    updateUserQuizInfoController,
    updateUserCigarettesController,
    updateUserSubscriptionController,
    addPaymentController
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

userRouter.post(
    '/updateSubscription',
    checkTokenMiddleware,
    updateUserSubscriptionController,
)

userRouter.post(
    '/addPayment',
    checkTokenMiddleware,
    addPaymentController,
)

module.exports = userRouter;