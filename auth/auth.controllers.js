const bcrypt = require('bcrypt');
const User = require('../users/user.model');
const {
    createToken
} = require('../services/token.service');

const registrationController = async (req, res) => {
    try {
        const {body: data} = req;
        const userFromDB = await User.getUserByFields({email: data.email});
        if (userFromDB) {
            return res.status(400).send(`User with email: ${data.email} already exists`)
        }
        const hashedPassword = await bcrypt.hash(data.password, +process.env.SALT);
        await User.createUser({
            ...data,
            firstName: '',
            lastName: '',
            avatar: '',
            phone: '',
            password: hashedPassword,
        });
        res.status(201).end();
    } catch (e) {
        res.status(500).send(e);
    }
}

const loginController = async (req, res) => {
    try {
        const {body: data} = req;
        const userFromDB = await User.getUserByFields({email: data.email});
        if (!userFromDB) return res.status(400).send(`User with email: ${data.email} not found`)
        const isPsswordsEqual = await bcrypt.compare(data.password, userFromDB.password);
        if (!isPsswordsEqual) {
            return res.status(400).send('Password is not equal')
        }
        const token = await createToken(userFromDB._id);
        res.json({
            access_token: token,
        })
    } catch (e) {
        res.status(500).send('Server error');
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const {userId} = req;
        const password = await bcrypt.hash(req.body.password, +process.env.SALT);
        const updatedUser = await User.updateUserById(userId, {password});
        res.end()
    } catch (e) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    registrationController,
    loginController,
    updatePasswordController,
}