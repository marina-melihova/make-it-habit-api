const express = require('express');

const habitRouter = express.Router()
const {
    checkTokenMiddleware
} = require('../middlewares/auth.middleware')

const {
    createHabit,
    getHabits,
    deleteHabit,
    updateHabit,
} = require('./habit.controller');

const {
    createHabitValidationMiddleware,
    updateHabitValidationMiddleware,
} = require('./habit.validator');

habitRouter.get(
    '/',
    checkTokenMiddleware,
    getHabits,
)

habitRouter.post(
    '/',
    createHabitValidationMiddleware,
    checkTokenMiddleware,
    createHabit,
)

habitRouter.delete(
    '/:habitId',
    checkTokenMiddleware,
    deleteHabit,
)

habitRouter.patch(
    '/',
    checkTokenMiddleware,
    updateHabitValidationMiddleware,
    updateHabit,
)

module.exports = habitRouter;