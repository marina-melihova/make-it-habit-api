const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const {sendVerifyEmail} = require('../services/email.services')
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
        const createdUser = await User.createUser({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        const verifyToken = await jwt.sign(
            {id: createdUser._id},
            process.env.VERIFY_EMAIL_JWT_KEY,
            {expiresIn: '1m'}
        )
        await sendVerifyEmail(data.email, verifyToken);
        res.status(201).end();
    } catch (e) {
        res.send(e);
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
        if (!userFromDB.isVerify) {
            return res.status(401).send('Confirm your account')
        }
        const token = await createToken(userFromDB._id);
        res.json({
            access_token: token,
        })
    } catch (e) {
        res.status(500).send('Server error');
    }
}

const verifyToken = async (req, res) => {
    try {
        const {verifyToken} = req.params;
        const {id} = jwt.verify(verifyToken, process.env.VERIFY_EMAIL_JWT_KEY);
        await User.updateUserById(id, {isVerify: true})
        res.redirect(process.env.FRONT_URL+'/login')
    } catch (e) {
        res.status(500).send('Invalid token')
    }
}

const resendVerifyToken = async (req, res) => {
    const {email} = req.body;
    const userFromDB = await User.getUserByFields({email});
    if (!userFromDB) {
        return res.status(400).send(`User with email: ${email} not found`)
    }
    const verifyToken = await jwt.sign(
        {id: userFromDB._id},
        process.env.VERIFY_EMAIL_JWT_KEY,
        {expiresIn: '1m'}
    )
    await sendVerifyEmail(email, verifyToken);
    res.status(200).end();
}

module.exports = {
    registrationController,
    loginController,
    verifyToken,
    resendVerifyToken,
}