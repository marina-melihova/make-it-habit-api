const express = require('express');

const habitRouter = express.Router()

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
    getHabits,
)

habitRouter.post(
    '/',
    createHabitValidationMiddleware,
    createHabit,
)

habitRouter.delete(
    '/:habitId',
    deleteHabit,
)

habitRouter.patch(
    '/',
    updateHabitValidationMiddleware,
    updateHabit,
)

module.exports = habitRouter;