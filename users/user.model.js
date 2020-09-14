const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    registerData: {
        type: Date,
        required: true,
        default: new Date(),
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