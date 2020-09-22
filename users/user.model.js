const mongoose = require('mongoose');

const initialData = [];
for (let i = 0; i < 21; i++) {
    initialData.push(null)
}

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
    cards: [{
        type: Object,
    }],
    subscription: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    quizInfo: {
        type: Object,
        required: true,
        default: {
            smokeYears: 0,
            cigarettePerDay: 0,
            cigarettePerTime: 0,
            cigarettePackPrice: 0,
        }
    },
    cigarettes: {
        type: Object,
        required: true,
        default: {
            data: initialData,
            startedAt: new Date(),
        }
    },
    payments: [{
        type: Object,
    }]
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

    updateQuizInfo = async (userId, data) => {
        return this.db.findByIdAndUpdate(userId, {
            quizInfo: {
                smokeYears: data.smokeYears || 0,
                cigarettePerDay: data.cigarettePerDay || 0,
                cigarettePerTime: data.cigarettePerTime || 0,
                cigarettePackPrice: data.cigarettePackPrice || 0,
            }
        }, {new: true});
    }

    updateCigarettesInfo = async (userId, data) => {
        return this.db.findByIdAndUpdate(userId, {
            cigarettes: {
                data: data.data,
                startedAt: data.startedAt,
            }
        }, {new: true});
    }

    updateSubscription = async (userId, plan) => {
        return this.db.findByIdAndUpdate(userId, {
            subscription: plan 
        }, {new: true});
    }

    addPayment = async (userId, payment) => {
        return this.db.findByIdAndUpdate(userId, {
            $push: {payments: payment}
        }, {new: true});
    }

}

module.exports = new UserModel();