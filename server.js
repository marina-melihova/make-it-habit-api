const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./auth/auth.router');
const habitRouter = require('./habits/habit.router');

dotenv.config();
const PORT = process.env.PORT;

const createServer = async () => {
    try {
        const app = express();
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true});
        console.log('Mongoose has been connected');
        app.all('*', (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            next();
        })

        app.use(express.json())
        app.get('/', express.static('public'));
        app.use('/auth', authRouter);
        app.use('/habits', habitRouter);
        app.listen(PORT, () => console.log(`Sever listening on port: ${PORT}`))

    } catch (e) {
        console.error(e);
    }
}

createServer()

