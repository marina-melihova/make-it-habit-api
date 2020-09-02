const mongoose = require('mongoose');

const initialData = [];
for (let i = 0; i < 21; i++) {
    initialData.push(null)
}

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    data: {
        type: [Boolean],
        default: initialData,
        required: true,
    },
    efficiency: {
        type: Number,
        default: 0,
        required: true,
    },
}, {versionKey: false});

class HabitModel {
    constructor() {
        this.db = mongoose.model('Habit', HabitSchema)
    }

    create = async data => {
        const habitModel = {
            name: data.name,
            ownerId: new mongoose.Types.ObjectId(data.ownerId),
        }
        return this.db.create(habitModel);
    }

    getHabitsByUserID = async userId => {
        return this.db.find({ownerId: userId}, {ownerId: false});
    }

    getHabitsByQuery = async query => {
        return this.db.find(query)
    }

    deleteHabitById = async habitId => {
        return this.db.findByIdAndDelete(habitId);
    }

    updateHabit = async ({id, ...newData}) => {
        return this.db.findByIdAndUpdate(id, {...newData}, {new: true});
    }
}

module.exports = new HabitModel();