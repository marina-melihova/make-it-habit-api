const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./auth/auth.router');

dotenv.config();
const PORT = process.env.PORT;

const createServer = async () => {
    try {
        const app = express();
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true});
        console.log('Mongoose has been connected');
        app.use('*', (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            next();
        })

        app.use(express.json())
        app.get('/', express.static('public'));
        app.use('/auth', authRouter);
        app.listen(PORT, () => console.log(`Sever listening on port: ${PORT}`))

    } catch (e) {
        console.error(e);
    }
}

createServer()

