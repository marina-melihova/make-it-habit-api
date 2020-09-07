const cron = require('node-cron')
const Habits = require('../habits/habit.model');
const Users = require('../users/user.model');
const {
    getEfficientyOfHabit,
    getTotalPointsOfDoneHabits,
} = require('./habitCalculation.service');

const getNumberOfDaysPassed = fromDate => {
    // Get start date with 0h:0m:0s:0ms
    let startDate = new Date(fromDate).setHours(0)
    startDate = new Date(startDate).setMinutes(0)
    startDate = new Date(startDate).setSeconds(0)
    startDate = new Date(startDate).setMilliseconds(0)

    // Get end date with 0h:0m:0s:0ms
    let todayDate = new Date().setHours(0)
    todayDate = new Date(todayDate).setMinutes(0)
    todayDate = new Date(todayDate).setSeconds(0)
    todayDate = new Date(todayDate).setMilliseconds(0)

    return ((new Date(todayDate) - new Date(startDate)) / (60 * 60 * 24 * 1000)) + 1
}

const getNewData = (data, startDay) => {
    const daysPassed = getNumberOfDaysPassed(startDay);
    return data.map((item, index) => index < daysPassed && item === null ? false : item);
}

const updateCounterJob = async () => {
    const users = await Users.db.find();
    for (let user of users) {
        const habits = await Habits.getHabitsByUserID(user._id)
        for (let habit of habits) {
            habit.data = getNewData(habit.data, habit.createAt);
            habit.efficienty = getEfficientyOfHabit(habit.data);
            await Habits.updateHabit({
                id: habit._id,
                data: habit.data,
                efficienty: habit.efficienty,
            })
        }
        const totalCount = getTotalPointsOfDoneHabits(habits);
        await Users.updateUserById(user._id, {points: totalCount});
        console.log(`User: ${user.name} has points: ${totalCount}`)
    }
    console.log('Job done')
};


//

module.exports = {
    updateCounterJob,
}