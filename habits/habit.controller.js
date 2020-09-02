const Habits = require('./habit.model');
const Users = require('../users/user.model');

const createHabit = async (req, res) => {
    try {
        const {userId, body} = req;
        const habitsCount = await Habits.getHabitsByUserID(userId);
        if (habitsCount.length >= 10) {
            res.status(403).send('Habits count can not be more than 10 items')
            return;
        }
        const createdHabit = await Habits.create({ownerId: userId, name: body.name});
        res.json(createdHabit)
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const getHabits = async (req, res) => {
    try {
        const {userId} = req;
        const user = await Users.getUserById(userId);
        const habits = await Habits.getHabitsByUserID(userId);
        const responseModel = {
            userName: user.name,
            total: user.points,
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

        let pointsCount = habits.reduce((counter, habit) => {
            return counter + habit.efficiency;
        }, 0)

        const updatedUser = await Users.updateUserById(userId, {points: pointsCount})

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
            const countOfStatusTrueHabit = body.data.reduce((counter, nextStatus) => {
                return counter + (nextStatus ? 1 : 0)
            }, 0)
            body.efficiency = Math.floor((countOfStatusTrueHabit * 100) / 21)
        }
        const updatedHabit = await Habits.updateHabit(body);

        const habits = await Habits.getHabitsByQuery({
            ownerId: userId,
        });

        let pointsCount = habits.reduce((counter, habit) => {
            return counter + habit.efficiency;
        }, 0)

        const updatedUser = await Users.updateUserById(userId, {points: pointsCount})

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