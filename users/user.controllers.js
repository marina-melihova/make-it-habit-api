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


module.exports = {
    updateUserController,
}