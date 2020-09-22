const Habits = require('./habit.model');
const Users = require('../users/user.model');
const {
    getEfficientyOfHabit,
    getTotalPointsOfDoneHabits,
} = require('../services/habitCalculation.service');

const createHabit = async (req, res) => {
    try {
        const {userId, body} = req;
        const createdHabit = await Habits.create({
            ownerId: userId,
            name: body.name,
            planningTime: body.planningTime,
            iteration: body.iteration,
        });
        res.json(createdHabit)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getHabits = async (req, res) => {
    try {
        const {userId} = req;
        const user = await Users.getUserById(userId);
        const habits = await Habits.getHabitsByUserID(userId);
        const responseModel = {
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                registerData: user.registerData,
                avatar: user.avatar,
                phone: user.phone,
                id: user._id,
                quizInfo: user.quizInfo,
                cigarettes: user.cigarettes,
                subscription: user.subscription,
                payments: user.payments
            },
            habits,
        }
        res.json(responseModel)
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const deleteHabit = async (req, res) => {
    try {
        const {userId, params: {habitId}} = req;
        const habitsWithId = await Habits.getHabitsByQuery({
            ownerId: userId,
            _id: habitId,
        });
        if (!habitsWithId.length) {
            return res.status(404).send('Habit not found')
        }
        await Habits.deleteHabitById(habitId)

        const habits = await Habits.getHabitsByQuery({
            ownerId: userId,
        });

        const updatedUser = await Users.updateUserById(userId, {
            points: getTotalPointsOfDoneHabits(habits)
        })

        res.json({
            total: updatedUser.points,
        });
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const updateHabit = async (req, res) => {
    try {
        const {userId, body} = req;
        if (body.data && body.data.length > 21) {
            return res.status(400).send('Data property can not be more then 21 items')
        }
        const habitsWithId = await Habits.getHabitsByQuery({
            ownerId: userId,
            _id: body.id,
        });
        if (!habitsWithId.length) {
            return res.status(404).send('Habit not found')
        }
        if (body.data) {
            body.efficiency = getEfficientyOfHabit(body.data)
        }
        const updatedHabit = await Habits.updateHabit(body);

        const habits = await Habits.getHabitsByQuery({
            ownerId: userId,
        });

        const updatedUser = await Users.updateUserById(userId, {
            points: getTotalPointsOfDoneHabits(habits)
        })

        res.json({
            total: updatedUser.points,
            updatedHabit,
        });
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}



module.exports = {
    createHabit,
    getHabits,
    deleteHabit,
    updateHabit,
}