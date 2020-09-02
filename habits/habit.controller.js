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
        const habit = await Habits.getHabitByQuery({
            ownerId: userId,
            _id: habitId,
        });
        if (!habit.length) {
            return res.status(404).send('Habit not found')
        }
        await Habits.deleteHabitById(habitId)
        res.end();
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
        const habit = await Habits.getHabitByQuery({
            ownerId: userId,
            _id: body.id,
        });
        if (!habit.length) {
            return res.status(404).send('Habit not found')
        }
        const updatedHabit = await Habits.updateHabit(body);
        res.json(updatedHabit);
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