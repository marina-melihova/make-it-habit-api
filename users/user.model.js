const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    isVerify: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {versionKey: false});

class UserModel {
    constructor() {
        this.db = mongoose.model('User', UserSchema)
    }

    getUserById = async userId => {
        return this.db.findById(userId);
    }

    getUserByFields = async data => {
        try {
            const users = await this.db.find(data);
            return users[0];
        } catch (e) {
            return null;
        }
    }

    createUser = async user => {
        return this.db.create(user);
    }

    updateUserById = async (userId, data) => {
        return this.db.findByIdAndUpdate(userId, data, {new: true});
    }
}

module.exports = new UserModel();