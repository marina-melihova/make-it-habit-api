const Joi = require('joi');

const HabitCreateSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
    iteration: Joi
        .string()
        .required(),
    planningTime: Joi
        .string()
        .required(),
})

const HabitUpdateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    data: Joi.array().items(Joi.alternatives().try(Joi.boolean(), Joi.allow(null)))
})


const validation = async (Schema, data) =>  {
    const {error} = await Schema.validate(data);
    if (error) {
        const message = error.details.reduce((msg, item) => {
            if (msg) return `${msg}, ${item.message}`
            return item.message
        }, '')
        throw new Error(message);
    }
}

const createHabitValidationMiddleware = async (req, res, next) => {
    try {
        await validation(HabitCreateSchema, req.body)
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const updateHabitValidationMiddleware = async (req, res, next) => {
    try {
        await validation(HabitUpdateSchema, req.body)
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }
}


module.exports = {
    createHabitValidationMiddleware,
    updateHabitValidationMiddleware,
}