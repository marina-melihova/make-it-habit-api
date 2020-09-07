const getEfficientyOfHabit = data => {
    /// Filter habits which have status;
    const arrStatusAsBooleanHabit = data
        .filter(habit => typeof habit === 'boolean');
    ///Calc totalCount of habits with done statuses
    const countOfStatusAsBooleanHabit =  arrStatusAsBooleanHabit.reduce((counter, nextStatus) => {
        return counter + (nextStatus ? 1 : 0)
    }, 0)
    /// Calc efficienty as percent
    return arrStatusAsBooleanHabit.length ?
        Math.floor((countOfStatusAsBooleanHabit * 100) / arrStatusAsBooleanHabit.length) :
        0;
}

const getTotalPointsOfDoneHabits = habits => {
    /// Get total points for habit
    const getHabitDoneCount = habit => habit.data.reduce((counter, nextItem, index) => {
        return counter + (nextItem === null ? 0 : nextItem === false ? -(index+1) : index + 1);
    }, 0)

    /// Get total points of all habit
    return habits.reduce((counter, nextHabit) => {
        return counter + getHabitDoneCount(nextHabit)
    }, 0)
}

module.exports = {
    getEfficientyOfHabit,
    getTotalPointsOfDoneHabits,
}