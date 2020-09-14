const User = require('../users/user.model');

const updateUserController = async (req, res) => {
    try {
        const {body: data} = req;
        const updatedUser = await User.updateUserById(req.userId, data);
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateUserQuizInfoController = async (req, res) => {
    try {
        const {body} = req;
        const updatedUser = await User.updateQuizInfo(req.userId, body);
        res.status(200).json({
            smokeYears: updatedUser.quizInfo.smokeYears,
            cigarettePerDay: updatedUser.quizInfo.cigarettePerDay,
            cigarettePerTime: updatedUser.quizInfo.cigarettePerTime,
            cigarettePackPrice: updatedUser.quizInfo.cigarettePackPrice,
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateUserCigarettesController = async (req, res) => {
    try {
        const {body} = req;
        const updatedUser = await User.updateCigarettesInfo(req.userId, body);
        res.status(200).json(updatedUser.cigarettes);
    } catch (e) {
        res.status(500).send(e);
    }
}


module.exports = {
    updateUserController,
    updateUserQuizInfoController,
    updateUserCigarettesController,
}